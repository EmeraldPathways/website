const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

export function publicAsset(path: string): string {
  const normalizedPath = path.replace(/^\/+/, "");
  return `${basePath}/${normalizedPath}`;
}
