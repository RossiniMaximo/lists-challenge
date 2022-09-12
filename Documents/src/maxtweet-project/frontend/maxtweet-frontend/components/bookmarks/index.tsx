import { MiniNavMenu } from "components/miniMenuNav";
import { TweetCard } from "ui/tweetCard/tweetCard";
import styles from "./booksmarks.module.css";
import { useUser } from "lib/hooks";
import { handleAction } from "lib";

// Based on the data retrieved by the clicks handlers display the cards

export function BookmarksPage() {
  const me = useUser();
  return (
    <div className={styles.container}>
      {me?.saves.map((t) => {
        console.log(t);

        if (Object.keys(t).length !== 0) {
          const savedDate = t.createdAt;
          const date = new Date(
            savedDate._seconds * 1000 + savedDate._nanoseconds / 1000000
          );

          return (
            <TweetCard
              key={t.id}
              src={t.img}
              text={t.content}
              userName={t.userName}
              likes={t.info[0].likes}
              saves={t.info[0].saves}
              retweets={t.info[0].retweets}
              comments={t.info[0].comments}
              createdAt={date.toDateString()}
              id={t.id}
              userId={t.userId}
              onActionClick={handleAction}
              isRemoved={() => {}}
              profilePicture={t.profilePicture}
            />
          );
        }
      })}
    </div>
  );
}
