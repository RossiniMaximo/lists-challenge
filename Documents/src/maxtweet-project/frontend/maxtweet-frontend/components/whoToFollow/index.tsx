import styles from "./whoToFollow.module.css";
import { RegularBlackSmallTextBold, RegularGrayTextSmall } from "ui/texts";
import Image from "next/image";
import { FollowButton } from "ui/buttons";
import { useRouter } from "next/router";
import { getWhoToFollow } from "lib/api/user";
import { useEffect, useState } from "react";
import { handleFollow } from "lib/api/user";

async function handleClick(userId: number, fullname: string) {
  await handleFollow(userId);
  window.alert("You are now following " + fullname);
}

export function WhoToFollow() {
  const [suggesteds, setSuggesteds] = useState([]) as any;

  // El backend crasheaba al ejecutar esta logica
  async function pullSuggestions() {
    const suggestedFollows = await getWhoToFollow();

    setSuggesteds(suggestedFollows);
  }
  useEffect(() => {
    pullSuggestions();
  }, []);
  const router = useRouter();

  if (suggesteds.length != 0 && suggesteds != "error in fetchAPI") {
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <RegularBlackSmallTextBold>Who to follow</RegularBlackSmallTextBold>
        </div>
        {suggesteds?.map((sug: any) => {
          return (
            <div
              key={sug?.generatedId}
              className={styles.main_container}
              onClick={() => router.push("/profile/" + sug?.generatedId)}
            >
              <div className={styles.upper_content_container}>
                <div className={styles.user_img_container}>
                  <Image
                    src={sug?.pics?.profilePicture}
                    className={styles.user_img}
                    layout="fill"
                  />
                </div>
                <div className={styles.user_info}>
                  <RegularBlackSmallTextBold>
                    {sug?.fullname}
                  </RegularBlackSmallTextBold>
                  <RegularGrayTextSmall>
                    {sug?.followers?.length} Followers
                  </RegularGrayTextSmall>
                </div>
                <FollowButton
                  onClick={() => handleClick(sug?.generatedId, sug?.fullname)}
                >
                  Follow
                </FollowButton>
              </div>
              <div className={styles.bottom_text_container}>
                <RegularGrayTextSmall>{sug?.description}</RegularGrayTextSmall>
                <div className={styles.cover_img_container}>
                  <Image
                    src={sug?.pics?.coverPicture}
                    className={styles.cover_img}
                    height={100}
                    width={250}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div></div>;
  }
}
