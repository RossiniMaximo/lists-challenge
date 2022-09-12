import { Layout } from "components/layout";
import { MyProfileTop } from "components/myProfile/top";
import { MyBottomProfileSection } from "components/myProfile/bottom";
import styles from "./profile.module.css";
import Head from "next/head";
function ProfilePage() {
  return (
    <Layout>
      <Head>
        <title>Profile</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.container}>
        <MyProfileTop />
        <div>
          <MyBottomProfileSection />
        </div>
      </div>
    </Layout>
  );
}

export default ProfilePage;
