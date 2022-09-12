import { Layout } from "components/layout";
import { BookmarksPage } from "components/bookmarks";
import Head from "next/head";

function BookMarks() {
  return (
    <Layout>
      <Head>
        <title>Bookmarks</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <BookmarksPage />
    </Layout>
  );
}

export default BookMarks;
