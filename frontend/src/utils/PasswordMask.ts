export function validPassword(value: string): boolean {
  const r = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
  return r.test(value);
}
