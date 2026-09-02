export const BLOG_CATEGORIES = {
  'site-building': {
    label: 'Site Building',
    description: 'Notes about building, operating, and improving this portfolio.',
  },
  homelab: {
    label: 'Homelab',
    description: 'Infrastructure, networking, and self-hosted systems from the home lab.',
  },
  'project-notes': {
    label: 'Project Notes',
    description: 'Build logs, implementation decisions, and lessons from individual projects.',
  },
  'learning-journal': {
    label: 'Learning Journal',
    description: 'Changes in learning direction, study systems, and practical training progress.',
  },
} as const;

export const BLOG_CATEGORY_KEYS = Object.keys(BLOG_CATEGORIES) as BlogCategory[];

export type BlogCategory = keyof typeof BLOG_CATEGORIES;

export function titleSlug(value: string): string {
  return value
    .normalize('NFKD')
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function sourceSlug(id: string): string {
  return id.replace(/\.(md|mdx)$/, '');
}

export function blogCategoryPath(category: BlogCategory): string {
  return `/blog/${category}/`;
}

export function blogPostPath(category: BlogCategory, title: string): string {
  return `${blogCategoryPath(category)}${titleSlug(title)}/`;
}

export function projectPath(title: string): string {
  return `/projects/${titleSlug(title)}/`;
}

export function journalWeekPath(
  projectTitle: string,
  weekNumber: number,
  weekTitle: string,
): string {
  return `${projectPath(projectTitle)}journal/weeks/week-${weekNumber}-${titleSlug(weekTitle)}/`;
}

export function journalDayPath(projectTitle: string, day: number, dayTitle: string): string {
  const dayNumber = String(day).padStart(2, '0');
  return `${projectPath(projectTitle)}journal/days/day-${dayNumber}-${titleSlug(dayTitle)}/`;
}

export function writeupSourcePath(source: string): string {
  return `/writeups/${sourceSlug(source)}/`;
}

export function writeupPath(source: string, title: string): string {
  return `${writeupSourcePath(source)}${titleSlug(title)}/`;
}
