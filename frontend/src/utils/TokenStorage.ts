export function getToken(): string | null {
  return localStorage.getItem("token");
}
export function setToken(token: string): void {
  localStorage.setItem("token", token);
}
export function removeToken(): void {
  localStorage.removeItem("token");
}
export function getId(): string | null  {
  return localStorage.getItem("id");
}
export function setId(id: string): void {
  localStorage.setItem("id", id);
}
export function removeId(): void {
  localStorage.removeItem("id");
}
