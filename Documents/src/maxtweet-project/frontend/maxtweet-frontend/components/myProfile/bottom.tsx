import styles from "./bottom.module.css";
import { MiniNavMenu } from "components/miniMenuNav";
import { TweetCard } from "ui/tweetCard/tweetCard";
import { useState } from "react";
import {
  dislikeAComment,
  handleDeleteTweetAction,
  handleTweetAction,
  likeAComment,
} from "lib/api/user";
import { useUser } from "lib/hooks";

export function MyBottomProfileSection() {
  const [myTweets, setMyTweets] = useState([{}]);
  const [isLiked, setLiked] = useState(false);
  const { me, mutate } = useUser();

  //  Cambio el contenido de la pagina al tocar likes ,saves ,replies , ejecutando las siguiente funciones
  // en sus respectivos onClick para cambiar el estado , por lo tanto cambiando lo que se muestra
  // en pantalla

  function pullTweets() {
    setMyTweets([]);
    setMyTweets(me.tweets);
  }

  function pullLikedTweets() {
    setMyTweets([]);
    setMyTweets(me.likes);
  }

  function pullSaves() {
    setMyTweets([]);
    setMyTweets(me.saves);
  }
  function pullReplies() {
    setMyTweets([]);
    setMyTweets(me.replies);
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
          pullLikedTweets();
        }}
      />
      <div className={styles.card_container}>
        {myTweets.map((tweet: any) => {
          if (tweet.info != undefined && tweet.content) {
            const updatedDate = new Date(
              tweet.createdAt?._seconds * 1000 +
                tweet.createdAt?._nanoseconds / 1000000
            );

            return (
              <TweetCard
                key={tweet.id}
                text={tweet.content}
                userName={me?.fullname}
                likes={tweet.info[0].likes}
                src={tweet.img}
                profilePicture={me?.pics.profilePicture}
                retweets={tweet.info[0].retweets}
                saves={tweet.info[0].saves}
                comments={tweet.info[0].comments}
                createdAt={updatedDate.toDateString()}
                replies={tweet.comments}
                id={tweet.id}
                userId={me?.generatedId}
                onActionClick={async (action, tweetId, remove) => {
                  if (remove) {
                    await handleDeleteTweetAction(action, tweetId);
                  } else {
                    await handleTweetAction(action, tweet.id);
                  }
                }}
                isRemoved={(removed) => {
                  if (removed) {
                    setMyTweets(me.tweets);
                  }
                }}
                replySubmited={() => {}}
              />
            );
          }
          if (tweet.comment != undefined) {
            const updatedDate = new Date(
              tweet.ia?._seconds * 1000 + tweet.ia?._nanoseconds / 1000000
            );

            return (
              <TweetCard
                profilePicture={me?.pics.profilePicture}
                key={tweet.id}
                text={tweet.comment}
                userName={me.fullname}
                likes={tweet.likes}
                createdAt={updatedDate.toDateString()}
                id={tweet.id}
                userId={me?.generatedId}
                onActionClick={async () => {
                  setLiked(!isLiked);
                  isLiked
                    ? await dislikeAComment(tweet.tweetId, tweet.id)
                    : await likeAComment(tweet.tweetId, tweet.id);
                }}
                isRemoved={(removed) => {}}
                replySubmited={() => {}}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
