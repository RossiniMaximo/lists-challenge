import styles from "./top.module.css";
const mockCoverImg = require("/public/horse.jpg");
const mockProfileImg = require("/public/Elon_musk.jpg");
import Image from "next/image";
import {
  RegularTextBold,
  RegularBlackSmallTextBold,
  RegularGrayTextSmall,
  RegularGrayText,
} from "ui/texts";
import { FollowButton } from "ui/buttons";
import { useState } from "react";
import { handleFollow, handleUnfollow } from "lib/api/user";
import { useOthersProfile } from "lib/hooks";

export function OthersProfileTop({ userId }) {
  const [following, setFollowing] = useState(false);
  const userData = useOthersProfile(userId);
  console.log(userData);

  async function followButtonListener() {
    if (following) {
      setFollowing(false);
      await handleUnfollow(userId);
    } else {
      setFollowing(true);
      await handleFollow(userId);
    }
  }
  console.log(userData);

  return (
    <div className={styles.main_container}>
      <div className={styles.cover_img_container}>
        <Image
          className={styles.cover_img}
          src={userData?.pics.coverPicture || mockCoverImg}
          layout="fill"
        />
      </div>
      <div className={styles.user_info_container}>
        <div className={styles.profile_container}>
          <div className={styles.profile_img_container}>
            <Image
              src={userData?.pics.profilePicture || mockProfileImg}
              className={styles.profile_img}
              layout="fill"
            />
          </div>
          <div className={styles.profile_info}>
            <RegularTextBold>{userData?.fullname}</RegularTextBold>
            <div className={styles.profile_stats_container}>
              <div className={styles.profile_stats}>
                <RegularBlackSmallTextBold>
                  {userData?.following?.length}
                </RegularBlackSmallTextBold>
                <RegularGrayTextSmall>Following</RegularGrayTextSmall>
              </div>
              <div className={styles.profile_stats}>
                <RegularBlackSmallTextBold>
                  {userData?.followers?.length}
                </RegularBlackSmallTextBold>
                <RegularGrayTextSmall>Followers</RegularGrayTextSmall>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.user_description}>
          <RegularGrayText>{userData?.description}</RegularGrayText>
        </div>
        <div className={styles.button_container}>
          <FollowButton
            className={styles.button}
            onClick={() => {
              followButtonListener();
            }}
          >
            {following ? "Unfollow" : "Follow"}
          </FollowButton>
        </div>
      </div>
    </div>
  );
}
