import { fetchAPI, saveTokenInStorage } from "lib";

export async function getCode(email: string, fullname: string) {
  const json = await fetchAPI("/auth", {
    method: "POST",
    body: { email, fullname },
  });
  return json;
}
export async function sendCode(email: string, code: number) {
  const json = await fetchAPI("/auth/token", {
    method: "POST",
    body: { email, code },
  });
  saveTokenInStorage(json);
  return json;
}
