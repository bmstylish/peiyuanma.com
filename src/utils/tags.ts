export function tagSlug(tag: string): string {
  return tag
    .normalize('NFKD')
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function tagHref(tag: string): string {
  return `/tags/${tagSlug(tag)}`;
}
