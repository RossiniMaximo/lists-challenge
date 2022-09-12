import styles from "./explore.module.css";
import { Layout } from "components/layout";
import { ShowSearchResults } from "components/showResults";
import { MiniNavMenu } from "components/miniMenuNav";
import Head from "next/head";

function Explore() {
  return (
    <Layout>
        <Head>
        <title>Explore</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.searchBar_container}>
        <ShowSearchResults />
      </div>
    </Layout>
  );
}

export default Explore;
