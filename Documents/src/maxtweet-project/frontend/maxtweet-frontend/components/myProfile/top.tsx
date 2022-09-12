import styles from "./top.module.css";
const mockCoverImg = require("/public/horse.jpg");

import Image from "next/image";
import { useUser } from "lib/hooks";
import {
  RegularTextBold,
  RegularBlackSmallTextBold,
  RegularGrayTextSmall,
  RegularGrayText,
  RegularTextBlack,
} from "ui/texts";
import Link from "next/link";

export function MyProfileTop() {
  const { me } = useUser();

  return (
    <div className={styles.main_container}>
      <div className={styles.cover_img_container}>
        <Image
          className={styles.cover_img}
          src={me?.pics.coverPicture}
          layout="fill"
        />
      </div>

      <div className={styles.user_info_container}>
        <Link href="/edit-profile">
          <a className={styles.user_edit_profile}>
            <RegularTextBold>Edit profile</RegularTextBold>
          </a>
        </Link>
        <div className={styles.profile_container}>
          <div className={styles.profile_img_container}>
            <Image
              src={me?.pics.profilePicture}
              className={styles.profile_img}
              layout="fill"
            />
          </div>
          <div className={styles.profile_info}>
            <RegularTextBold>{me?.fullname}</RegularTextBold>
            <div className={styles.profile_stats_container}>
              <div className={styles.profile_stats}>
                <RegularBlackSmallTextBold>
                  {me?.following.length}
                </RegularBlackSmallTextBold>
                <RegularGrayTextSmall>Following</RegularGrayTextSmall>
              </div>
              <div className={styles.profile_stats}>
                <RegularBlackSmallTextBold>
                  {me?.followers.length}
                </RegularBlackSmallTextBold>
                <RegularGrayTextSmall>Followers</RegularGrayTextSmall>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.user_description}>
          <RegularGrayText>{me?.description}</RegularGrayText>
        </div>
      </div>
    </div>
  );
}
