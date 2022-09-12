import { fetchAPI } from "lib/index";

export async function getLatestTweets() {
  const json = await fetchAPI("/tweet/get/latest");
  return json;
}

export async function getTweetsWithMedia() {
  const json = await fetchAPI("/tweet/get/media");
  return json;
}
