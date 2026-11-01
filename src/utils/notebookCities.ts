export interface NotebookCity { id: string; name: string; href: string; paths: string[]; x: number; y: number }
/** Match exact localized city routes; general guides are never assigned a guessed location. */
export function savedNotebookCities(entries: readonly { path: string }[], catalog: readonly NotebookCity[]) {
  const paths = new Set(entries.map(entry => entry.path));
  return catalog.filter(city => city.paths.some(path => paths.has(path)));
}
