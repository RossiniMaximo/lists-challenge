import { handleDeleteTweetAction, handleTweetAction } from "./api/user";

const DEV_URL = "http://localhost:5500/api";
const PROD_URL = process.env.NEXT_PUBLIC_DATABASE_URL;

export async function fetchAPI(input: RequestInfo, init?: RequestInit | {}) {
  const token = getAuthToken();
  const newInit: any = init || {};
  newInit.headers ||= {};
  if (token) {
    newInit.headers.authorization = "Bearer" + " " + token;
  }
  if (newInit.body) {
    newInit.headers["Content-Type"] = "application/json";
    newInit.body = JSON.stringify(newInit.body);
  }
  const res = await fetch(DEV_URL + input, newInit);
  if (res.status >= 200 && res.status < 300) {
    const json = await res.json();
    return json;
  } else {
    return "error in fetchAPI";
  }
}

function getAuthToken() {
  return localStorage.getItem("auth_token");
}
export function saveTokenInStorage(token) {
  localStorage.setItem("auth_token", token.token);
}

export function logOut() {
  localStorage.clear();
}
export function setLoggedInStorage() {
  localStorage.setItem("logged", "true");
}
export function isLogged() {
  const logged = localStorage.getItem("logged");
  if (logged == "true") {
    return true;
  }
}

export async function handleAction(
  action: string,
  tweetId: number,
  remove: boolean
) {
  if (remove) {
    await handleDeleteTweetAction(action, tweetId);
  } else {
    const result = await handleTweetAction(action, tweetId);
    return result;
  }
}
export function isObjectEmpty(obj) {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
}
