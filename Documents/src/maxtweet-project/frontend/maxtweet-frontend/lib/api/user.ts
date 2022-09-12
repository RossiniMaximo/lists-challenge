import { fetchAPI, isObjectEmpty } from "lib";

export async function updateUser(newUser) {
  const newBody: any = {};
  newBody.pics = {};
  if (newUser.fullname) {
    newBody.fullname = newUser.fullname;
  }
  if (newUser.email) {
    newBody.email = newUser.email;
  }
  if (newUser.profilePic) {
    newBody.pics.profilePicture = newUser.profilePic;
  }
  if (newUser.coverPic) {
    newBody.pics.coverPicture = newUser.coverPic;
  }
  if (newUser.description) {
    newBody.description = newUser.description;
  }

  const json = await fetchAPI("/user", {
    method: "PATCH",
    body: { newBody },
  });
  return json;
}

export async function handleUnfollow(userId: number) {
  const json = await fetchAPI("/user?userId=" + userId, {
    method: "DELETE",
  });
  return json;
}

export async function handleFollow(userId: number) {
  const json = await fetchAPI("/user?userId=" + userId, {
    method: "POST",
  });
  return json;
}

export async function likeAComment(tweetId: number, replyId: number) {
  const json = await fetchAPI("/tweet/comments/likes", {
    method: "POST",
    body: { tweetId, replyId },
  });
  return json;
}

export async function dislikeAComment(tweetId: number, replyId: number) {
  const json = await fetchAPI("/tweet/comments/likes", {
    method: "DELETE",
    body: { tweetId, replyId },
  });
  return json;
}
// Add comment
export async function submitAComment(newComment: {
  comment: string;
  userId: number;
  tweetId: number;
  by: string;
  pics: { profilePicture: string };
}) {
  const json = await fetchAPI("/tweet/comments", {
    method: "POST",
    body: {
      newComment,
    },
  });
  return json;
}

// If the new tweet does not have an imgURL creates a new tweet without an image.
export async function postTweet(newTweet) {
  if (isObjectEmpty(newTweet.imgURL)) {
    const json = await fetchAPI("/tweet", {
      method: "POST",
      body: { content: newTweet.content, tweetMode: newTweet.mode },
    });
    return json;
  } else {
    console.log(true);
    const json = await fetchAPI("/tweet", {
      method: "POST",
      body: {
        content: newTweet.content,
        tweetMode: newTweet.mode,
        img: newTweet.img,
        imgURL: newTweet.imgURL,
      },
    });
    return json;
  }
}

export async function handleTweetAction(action: string, tweetId: number) {
  const json = await fetchAPI("/tweet/actions", {
    method: "POST",
    body: { action, tweetId },
  });
  return json;
}
export async function handleDeleteTweetAction(action: string, tweetId: number) {
  const json = await fetchAPI("/tweet/actions", {
    method: "DELETE",
    body: { action, tweetId },
  });
  return json;
}

export async function pullUserTweets(userId: string) {
  const json = await fetchAPI("/tweet/all?id=" + userId, {
    method: "GET",
  });
  return json;
}

export async function deleteTweet(tweetId) {
  const json = await fetchAPI("/tweet", {
    method: "DELETE",
    body: { tweetId },
  });
  return json;
}

export async function updateTweet(tweetId, body) {
  const json = await fetchAPI("/tweet", {
    method: "PATCH",
    body: { body },
  });
  return json;
}
export async function getWhoToFollow() {
  const json = await fetchAPI("/user/suggestFollow");
  return json;
}

export async function getUsersByQuery(query: string) {
  const json = await fetchAPI("/user/all?search=" + query);
  return json;
}

export async function get10RandomUsers() {
  const json = await fetchAPI("/user/get/random");
  return json;
}
