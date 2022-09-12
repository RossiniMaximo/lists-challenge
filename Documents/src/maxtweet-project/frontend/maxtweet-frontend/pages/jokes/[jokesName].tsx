import { JokesDisplay } from "components/jokesDisplay";
import { Layout } from "components/layout";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "./jokes.module.css";

export default function JokesPage() {
  const router = useRouter();
  const query = router.query.jokesName as string;
  return (
    <Layout>
      <Head>
        <title>{query}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div style={{ minHeight: 500 }}>
        <JokesDisplay query={query} />
      </div>
    </Layout>
  );
}
