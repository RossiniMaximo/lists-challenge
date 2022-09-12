import styles from "./bottom.module.css";
import { MiniNavMenu } from "components/miniMenuNav";
import { TweetCard } from "ui/tweetCard/tweetCard";
import {
  dislikeAComment,
  handleDeleteTweetAction,
  handleTweetAction,
  likeAComment,
} from "lib/api/user";
import { useState } from "react";
import { useOthersProfile, useUser } from "lib/hooks";

export function BottomProfileSection({ userId }) {
  const [content, setContent] = useState([{}] as any);
  const [isLiked, setLiked] = useState(false);
  const [isRetweeted, setRetweeted] = useState(false);
  const [isSaved, setSaved] = useState(false);
  const data = useOthersProfile(userId);
  const me = useUser();
  function pullTweets() {
    setContent(data.tweets);
  }

  function pullLikes() {
    setContent(data.likes);
  }
  function pullSaves() {
    setContent(data.saves);
  }
  function pullReplies() {
    setContent(data.replies);
  }
  return (
    <div className={styles.container}>
      <MiniNavMenu
        firstItem="Tweets"
        firstItemClick={() => {
          pullTweets();
        }}
        secondItem="Replies"
        secondItemClick={() => {
          pullReplies();
        }}
        thirdItem="Saves"
        thirdItemClick={() => {
          pullSaves();
        }}
        fourthItem="Likes"
        fourthItemClick={() => {
          pullLikes();
        }}
      />
      <div className={styles.card_container}>
        {content?.map((element) => {
          if (element.content || element.img) {
            const updatedDate = new Date(
              element.createdAt?._seconds * 1000 +
                element.createdAt?._nanoseconds / 1000000
            );
            return (
              <TweetCard
                key={element.id}
                profilePicture={data.pics.profilePicture}
                text={element.content}
                userName={data?.fullname}
                src={element.img}
                likes={element.info?.likes}
                retweets={element.info?.retweets}
                saves={element.info?.saves}
                comments={element.info?.comments}
                createdAt={updatedDate.toDateString()}
                id={element.id}
                userId={data?.generatedId}
                onActionClick={async (action, tweetId, remove) => {
                  if (remove) {
                    await handleDeleteTweetAction(action, tweetId);
                  } else {
                    await handleTweetAction(action, tweetId);
                  }
                }}
                isRemoved={() => {}}
              />
            );
          } else if (element.comment) {
            const updatedDate = new Date(
              element.ia?._seconds * 1000 + element.ia?._nanoseconds / 1000000
            );

            return (
              <TweetCard
                key={element.id}
                text={element.comment}
                profilePicture={data.pics.profilePicture}
                userName={me.fullname}
                likes={element.likes}
                createdAt={updatedDate.toDateString()}
                id={element.id}
                userId={me.generatedId}
                onActionClick={async () => {
                  setLiked(!isLiked);
                  isLiked
                    ? await dislikeAComment(element.tweetId, element.id)
                    : await likeAComment(element.tweetId, element.id);
                }}
                isRemoved={() => {}}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
