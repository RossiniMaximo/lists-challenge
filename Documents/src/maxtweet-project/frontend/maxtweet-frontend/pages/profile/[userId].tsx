import { Layout } from "components/layout";
import { OthersProfileTop } from "components/profile/top";
import { BottomProfileSection } from "components/profile/bottom";
import styles from "./profile.module.css";
import { useRouter } from "next/router";
import Head from "next/head";
function ProfilePage() {
  const router = useRouter();
  const userId = router.query.userId;
  if (userId != undefined) {
    return (
      <Layout>
        <Head>
          <title>Profile</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div className={styles.container}>
          <OthersProfileTop userId={userId} />
          <div>
            <BottomProfileSection userId={userId} />
          </div>
        </div>
      </Layout>
    );
  }
}

export default ProfilePage;
