export function isStringValid(s: string): boolean {
  return s.search(/^[A-zА-я\d\s,._-]+$/gu) !== -1;
}
