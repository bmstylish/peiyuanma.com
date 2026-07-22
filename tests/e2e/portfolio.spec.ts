import { expect, test, type Page } from '@playwright/test';

const projectPath = '/projects/30-days-of-ctf-winter-break-2026/';

function collectBrowserErrors(page: Page) {
  const errors: string[] = [];

  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  page.on('console', (message) => {
    const sourceUrl = message.location().url;
    const isCloudflareBeaconError = sourceUrl.startsWith('https://static.cloudflareinsights.com/');

    if (message.type() === 'error' && !isCloudflareBeaconError) {
      errors.push(`console: ${message.text()}`);
    }
  });

  return errors;
}

async function expectNoHorizontalOverflow(page: Page) {
  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );

  expect(hasOverflow).toBe(false);
}

test('project navigation reaches the revised Day 19 plan', async ({ page }) => {
  const browserErrors = collectBrowserErrors(page);

  await page.goto(projectPath);
  await expect(page).toHaveTitle(/TryHackMe Jr Penetration Tester: Daily Learning Journal/);
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'TryHackMe Jr Penetration Tester: Daily Learning Journal',
    }),
  ).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Why the plan changed' })).toBeVisible();
  await expect(page.getByText('The journal is no longer limited to thirty days.')).toBeVisible();

  await page.getByRole('link', { name: 'Open week 3' }).click();
  await expect(page).toHaveURL(/\/weeks\/week-3\/?$/);
  await expect(
    page.getByRole('heading', { level: 1, name: 'Web enumeration and Burp Suite' }),
  ).toBeVisible();

  await page
    .getByRole('link', {
      name: 'Open Day 19: Burp Suite: Repeater and supporting modules',
    })
    .click();
  await expect(page).toHaveURL(/\/days\/day-19-burp-suite-workflow\/?$/);
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Burp Suite: Repeater and supporting modules',
    }),
  ).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Corresponding practice' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Burp Suite: Repeater' })).toHaveAttribute(
    'href',
    'https://tryhackme.com/room/burpsuiterepeater',
  );

  await expectNoHorizontalOverflow(page);
  expect(browserErrors).toEqual([]);
});

test('blog index opens the plan-pivot article', async ({ page }) => {
  const browserErrors = collectBrowserErrors(page);
  const articleTitle =
    'Turning My CTF Sprint into an Open-Ended TryHackMe Jr Pentester Journal';

  await page.goto('/blog/');
  await expect(page.getByRole('heading', { level: 1, name: 'Blog' })).toBeVisible();
  await page.getByRole('link', { name: articleTitle }).click();

  await expect(page).toHaveURL(
    /\/blog\/pivoting-my-30-day-ctf-plan-to-the-tryhackme-jr-pentester-path\.md\/?$/,
  );
  await expect(page.getByRole('heading', { level: 1, name: articleTitle })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Removing the deadline' })).toBeVisible();

  await expectNoHorizontalOverflow(page);
  expect(browserErrors).toEqual([]);
});

test('Day 30 remains a normal journal entry with practice and reporting links', async ({ page }) => {
  const browserErrors = collectBrowserErrors(page);

  await page.goto(`${projectPath}days/day-30-linux-privilege-escalation-and-reporting/`);
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Linux privilege escalation and reporting',
    }),
  ).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Corresponding practice' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Jump' })).toHaveAttribute(
    'href',
    'https://tryhackme.com/room/jump',
  );
  await expect(page.getByRole('link', { name: 'Writing Pentest Reports' })).toHaveAttribute(
    'href',
    'https://tryhackme.com/room/writingpentestreports',
  );

  await expectNoHorizontalOverflow(page);
  expect(browserErrors).toEqual([]);
});
