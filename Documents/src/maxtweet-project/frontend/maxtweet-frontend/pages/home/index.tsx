import Head from "next/head";
import { Layout } from "components/layout";
import styles from "./home.module.css";
import { TweetSomething } from "components/tweetSomething";
import { Jokes } from "components/jokes";
import { WhoToFollow } from "components/whoToFollow";
import { ShowFeed } from "components/showFeed";
import { isLogged } from "lib/index";
import Router from "next/router";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    const logged = isLogged();
    if (!logged) {
      Router.push("/login");
    }
  }, []);
  return (
    <Layout>
      <Head>
        <title>Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.container}>
        <div style={{ padding: 10 }} className={styles.upper_layout_content}>
          <TweetSomething />
          <div className={styles.tweet_container}>
            <ShowFeed />
          </div>
        </div>
        <div className={styles.trend_card_container}>
          <Jokes />
          <WhoToFollow />
        </div>
      </div>
    </Layout>
  );
}

export default Home;
