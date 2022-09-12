import styles from "./commentCard.module.css";
import Image from "next/image";
const mockImg = require("/public/Elon_musk.jpg");
import {
  RegularBlackSmallTextBold,
  TextForTweetDescription,
  RegularGrayTextSmall,
  RegularTextBlack,
} from "ui/texts";
import { FcLike } from "ui/icons";
import { useState } from "react";
import { dislikeAComment, likeAComment } from "lib/api/user";

// I think the src props is for the user replier profile pic.
type CommentCardType = {
  src?: string;
  name: string;
  date: Date | string;
  content: string;
  likes: number;
  tweetId: number;
  replyId: number;
  userId: number;
  picture: string;
};

export function CommentCard(props: CommentCardType) {
  const [isLiked, setLiked] = useState(false);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.img_container}>
          <Image src={props.picture} className={styles.img} layout="fill" />
        </div>
        <div className={styles.comment_box_container}>
          <div className={styles.comment_box_info}>
            <RegularBlackSmallTextBold>{props.name}</RegularBlackSmallTextBold>
            <RegularGrayTextSmall>
              {props.date.toString().slice(0, -41)}
            </RegularGrayTextSmall>
          </div>
          <div className={styles.comment_box_comment}>
            <TextForTweetDescription>{props.content}</TextForTweetDescription>
          </div>
        </div>
      </div>
      <div className={styles.comment_box_feedback}>
        <div>
          <FcLike size="15" />
        </div>
        <div
          onClick={async () => {
            setLiked(!isLiked);
            isLiked
              ? await dislikeAComment(props.tweetId, props.replyId)
              : await likeAComment(props.tweetId, props.replyId);
          }}
        >
          <RegularTextBlack className={styles.comment_box_like}>
            Like
          </RegularTextBlack>
        </div>
        <RegularGrayTextSmall className={styles.comment_box_like}>
          {props.likes}
        </RegularGrayTextSmall>
      </div>
    </div>
  );
}
