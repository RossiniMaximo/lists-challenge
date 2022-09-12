import styles from "./trends.module.css";
import { RegularBlackSmallTextBold, RegularGrayTextSmall } from "ui/texts";
import Router from "next/router";
const array = [
  {
    trendName: "Chuck Norris Jokes",
    numberOfTweets: 230.039,
    id: 20,
  },
  {
    trendName: "Dad Jokes",
    numberOfTweets: 100.123,
    id: 10,
  },
  {
    trendName: "Dev Jokes",
    numberOfTweets: 75.228,
    id: 102,
  },
  {
    trendName: "Geek & Chuck Norris Jokes",
    numberOfTweets: 66.368,
    id: 1230,
  },
];

export function Jokes(props) {
  return (
    <div className={styles.container}>
      <div className={styles.trends_title}>
        <RegularBlackSmallTextBold>Read some jokes</RegularBlackSmallTextBold>
      </div>
      <div className={styles.trends_card}>
        {array.map((t) => {
          return (
            <div
              key={t.id}
              className={styles.card_container}
              onClick={() => Router.push("/jokes/ " + t.trendName)}
            >
              <RegularBlackSmallTextBold className={styles.trend_name}>
                #{t.trendName}
              </RegularBlackSmallTextBold>
              <RegularGrayTextSmall className={styles.trend_popularity}>
                {t.numberOfTweets} Tweets
              </RegularGrayTextSmall>
            </div>
          );
        })}
      </div>
    </div>
  );
}
