export function authorize(id: string): Promise<string[]> {
  return new Promise((resolve) => setTimeout(() => resolve(['nonAdmin']), 1000));
}
