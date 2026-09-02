export interface GlitchTransitionOptions {
  duration?: number;
  sliceCount?: number;
  resolveAt?: number;
  onResolve?: () => void;
}

const CORRUPTION_GLYPHS = '#@%_*+?<>/\\[]{}01';

function createLayer(className: string, text: string): HTMLSpanElement {
  const layer = document.createElement('span');
  layer.className = className;
  layer.textContent = text;
  layer.setAttribute('aria-hidden', 'true');
  return layer;
}

function transitionText(
  originalText: string,
  finalText: string,
  replacementProgress: number,
  corruptionIntensity: number,
  revealOrder: number[],
  seed: number,
): string {
  const original = [...originalText];
  const final = [...finalText];
  const length = Math.max(original.length, final.length);
  let result = '';

  for (let index = 0; index < length; index += 1) {
    const useFinal = replacementProgress >= revealOrder[index];
    const character = (useFinal ? final[index] : original[index]) ?? ' ';
    const canCorrupt = character.trim().length > 0;
    const noise = Math.abs(Math.sin((index + 1) * 12.9898 + seed * 78.233));

    if (canCorrupt && noise < corruptionIntensity * 0.58) {
      const glyphIndex = Math.floor(noise * 1000 + seed + index) % CORRUPTION_GLYPHS.length;
      result += CORRUPTION_GLYPHS[glyphIndex];
    } else {
      result += character;
    }
  }

  return result;
}

/**
 * Corrupts the element's current text into a new value once, then removes every
 * temporary layer and class so the resulting element is ordinary static text.
 */
export function glitchTransition(
  element: HTMLElement,
  newText: string,
  options: GlitchTransitionOptions = {},
): Promise<void> {
  const duration = Math.min(800, Math.max(500, options.duration ?? 720));
  const sliceCount = Math.min(16, Math.max(6, options.sliceCount ?? 11));
  const resolveAt = Math.min(0.82, Math.max(0.45, options.resolveAt ?? 0.58));
  const originalText = element.textContent ?? '';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    options.onResolve?.();
    element.textContent = newText;
    return Promise.resolve();
  }

  const originalAriaLabel = element.getAttribute('aria-label');
  const originalInlineWidth = element.style.width;
  const originalInlineHeight = element.style.height;
  const originalDuration = element.style.getPropertyValue('--glitch-duration');
  const bounds = element.getBoundingClientRect();
  const characterCount = Math.max([...originalText].length, [...newText].length);
  const revealOrder = Array.from({ length: characterCount }, (_, index) => {
    const scatteredOrder = ((index * 47) % Math.max(characterCount, 1)) / Math.max(characterCount - 1, 1);
    return 0.08 + scatteredOrder * 0.84;
  });

  element.style.width = `${Math.ceil(bounds.width)}px`;
  element.style.height = `${Math.ceil(bounds.height)}px`;
  element.style.setProperty('--glitch-duration', `${duration}ms`);
  element.classList.add('glitch-transition');
  element.setAttribute('aria-label', newText);
  element.replaceChildren();

  const base = createLayer('glitch-transition__base', originalText);
  const cyan = createLayer('glitch-transition__rgb glitch-transition__rgb--cyan', originalText);
  const magenta = createLayer('glitch-transition__rgb glitch-transition__rgb--magenta', originalText);
  const slices = Array.from({ length: sliceCount }, (_, index) => {
    const slice = createLayer(
      `glitch-transition__slice glitch-transition__slice--channel-${index % 3}`,
      originalText,
    );
    const top = (index / sliceCount) * 100;
    const bottom = 100 - ((index + 1) / sliceCount) * 100;
    const direction = index % 2 === 0 ? 1 : -1;
    const distance = 3 + ((index * 5) % 9);

    slice.style.clipPath = `inset(${top}% 0 ${bottom}% 0)`;
    slice.style.setProperty('--tear-a', `${direction * distance}px`);
    slice.style.setProperty('--tear-b', `${direction * distance * -0.65}px`);
    return slice;
  });

  element.append(base, cyan, magenta, ...slices);

  return new Promise((resolve) => {
    const startedAt = performance.now();
    let lastTextUpdate = -Infinity;
    let resolveStarted = false;
    let textFrame = 0;

    const beginResolve = () => {
      if (resolveStarted) return;
      resolveStarted = true;
      options.onResolve?.();
    };

    const finish = () => {
      beginResolve();
      element.replaceChildren(document.createTextNode(newText));
      element.classList.remove('glitch-transition');
      element.style.width = originalInlineWidth;
      element.style.height = originalInlineHeight;

      if (originalDuration) {
        element.style.setProperty('--glitch-duration', originalDuration);
      } else {
        element.style.removeProperty('--glitch-duration');
      }

      if (originalAriaLabel === null) {
        element.removeAttribute('aria-label');
      } else {
        element.setAttribute('aria-label', originalAriaLabel);
      }

      resolve();
    };

    const animate = (now: number) => {
      const elapsed = now - startedAt;
      const progress = Math.min(1, elapsed / duration);

      if (progress >= resolveAt) beginResolve();

      if (elapsed - lastTextUpdate >= 42 || progress === 1) {
        const replacementProgress = progress <= 0.28
          ? 0
          : progress >= 0.9
            ? 1
            : (progress - 0.28) / 0.62;
        const corruptionIntensity = progress < 0.14
          ? 0
          : progress < 0.32
            ? ((progress - 0.14) / 0.18) * 0.82
            : progress < 0.68
              ? 0.82
              : progress < 0.9
                ? ((0.9 - progress) / 0.22) * 0.82
                : 0;
        const currentText = transitionText(
          originalText,
          newText,
          replacementProgress,
          corruptionIntensity,
          revealOrder,
          textFrame,
        );

        base.textContent = currentText;
        cyan.textContent = currentText;
        magenta.textContent = currentText;
        slices.forEach((slice, index) => {
          slice.textContent = transitionText(
            originalText,
            newText,
            replacementProgress,
            corruptionIntensity * 0.88,
            revealOrder,
            textFrame + index + 1,
          );
        });

        textFrame += 1;
        lastTextUpdate = elapsed;
      }

      if (progress < 1) {
        window.requestAnimationFrame(animate);
      } else {
        finish();
      }
    };

    window.requestAnimationFrame(animate);
  });
}
