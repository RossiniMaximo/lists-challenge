import { TweetCard } from "ui/tweetCard/tweetCard";
import styles from "./showfeed.module.css";
import { useUserFeed, useUser } from "lib/hooks";
import { handleAction } from "lib";
import { useState } from "react";
import { Spinner } from "components/spinner";

export function ShowFeed() {
  const [isLoading, setIsLoading] = useState(false);
  const me = useUser();
  const { data } = useUserFeed() as any;
  if (!data) {
    return (
      <div className={styles.spinner_container}>
        <Spinner />
      </div>
    );
  }
  if (data != "error in fetchAPI" && data != "undefined") {
    return (
      <div>
        {isLoading ? <Spinner /> : " "}
        {data?.map((t) => {
          if (Object.keys(t).length !== 0) {
            const savedDate = t.createdAt;
            const date = new Date(
              savedDate._seconds * 1000 + savedDate._nanoseconds / 1000000
            );
            return (
              <div className={styles.tweet_container} key={t.id}>
                <TweetCard
                  profilePicture={t.profilePicture}
                  id={t.id}
                  key={t.id}
                  text={t.content}
                  createdAt={date.toDateString()}
                  src={t.img}
                  comments={t.info[0].comments}
                  retweets={t.info[0].retweets}
                  likes={t.info[0].likes}
                  saves={t.info[0].saves}
                  userName={t.userName}
                  onActionClick={handleAction}
                  replies={t.comments}
                  userId={me?.generatedId}
                  isRemoved={() => {}}
                />
              </div>
            );
          }
        })}
      </div>
    );
  } else {
    return <div>Error</div>;
  }
}
