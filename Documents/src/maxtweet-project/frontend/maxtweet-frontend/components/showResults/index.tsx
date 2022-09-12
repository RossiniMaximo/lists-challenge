import { MiniNavMenu } from "components/miniMenuNav";
import { getUsersByQuery } from "lib/api/user";
import { useEffect, useState } from "react";
import { SearchBtn } from "ui/buttons";
import { GiMagnifyingGlass } from "ui/icons";
import { UserCard } from "ui/tweetCard/userCard";
import { get10RandomUsers } from "lib/api/user";
import { getLatestTweets, getTweetsWithMedia } from "lib/api/tweets";
import styles from "./showResults.module.css";
import { TweetCard } from "ui/tweetCard/tweetCard";
import { handleAction, isObjectEmpty } from "lib";
import { useMostFollowedUsers } from "lib/hooks";
import { Spinner } from "components/spinner";

export function ShowSearchResults() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const mostFollowed = useMostFollowedUsers();

  async function handleSubmit(e) {
    e.preventDefault();
    const query = e.target.search.value;
    setResults([]);
    setIsLoading(true);
    const result = await getUsersByQuery(query);
    if (result) {
      setIsLoading(false);
      setResults(result);
    }
  }

  return (
    <div className={styles.main_container}>
      {isLoading ? (
        <div className={styles.spinner_container}>
          <Spinner />
        </div>
      ) : (
        ""
      )}
      <MiniNavMenu
        firstItem="Top"
        secondItem="Latest"
        thirdItem="People"
        fourthItem="Media"
        firstItemClick={() => {
          // Api call para traer most followed users / top users.
          setResults([]);
          setResults(mostFollowed);
        }}
        secondItemClick={async () => {
          // Api call to bring latest tweets.
          setResults([]);
          setIsLoading(true);
          const result = await getLatestTweets();
          if (result) {
            setIsLoading(false);
            setResults(result);
          }
        }}
        thirdItemClick={async () => {
          //Api call to bring 10 random users.
          setResults([]);
          setIsLoading(true);
          const result = await get10RandomUsers();
          if (result) {
            setIsLoading(false);
            setResults(result);
          }
        }}
        fourthItemClick={async () => {
          setResults([]);
          setIsLoading(true);
          const result = await getTweetsWithMedia();
          const mapResult = result.map((tweet) => {
            const updatedDate = new Date(
              tweet.createdAt?._seconds * 1000 +
                tweet.createdAt?._nanoseconds / 1000000
            );
            tweet.createdAt = updatedDate.toDateString();
            return tweet;
          });
          if (mapResult) {
            setIsLoading(false);
            setResults(mapResult);
          }
        }}
      />
      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fields}>
            <GiMagnifyingGlass size={20} />
            <input type="text" name="search" className={styles.input} />
            <SearchBtn>Search</SearchBtn>
          </div>
        </form>
        <div className={styles.card_container}>
          {results.map((r: any) => {
            if (r?.feed || r.followers) {
              return (
                <UserCard
                  name={r.fullname}
                  img={r.pics.profilePicture}
                  description={r.description}
                  userId={r.userId}
                />
              );
            } else {
              return (
                <TweetCard
                  userName={r.userName}
                  createdAt={r.createdAt}
                  src={r.img || ""}
                  text={r.content}
                  likes={r.info[0].likes}
                  saves={r.info[0].saves}
                  comments={r.info[0].comments}
                  retweets={r.info[0].retweets}
                  replies={r.comments}
                  id={r.id}
                  userId={r.userId}
                  key={r.id}
                  onActionClick={handleAction}
                  profilePicture={r.profilePicture}
                  isRemoved={() => {}}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
