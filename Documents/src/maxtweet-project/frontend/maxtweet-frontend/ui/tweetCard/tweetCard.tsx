import {
  AiOutlinePicture,
  AiOutlineRetweet,
  FcLike,
  MdOutlineModeComment,
  IoMdBookmarks,
  MdDelete,
} from "ui/icons";
import Image from "next/image";
import {
  RegularBlackSmallTextBold,
  TextForTweetDescription,
  RegularGrayTextSmall,
  SmallTextForTweetCard,
} from "ui/texts";
import styles from "./tweetcard.module.css";
import { MakeAComment } from "ui/inputs";
import { useEffect, useState } from "react";
import { CommentCard } from "ui/tweetCard/commentCard";
import { useUser, useUserFeed } from "lib/hooks";
import { deleteTweet, submitAComment } from "lib/api/user";
import Link from "next/link";
import { useRouter } from "next/router";

type TweetCardProps = {
  key: number;
  src?: string;
  profilePicture: string;
  text: string;
  createdAt: string | Date;
  userName: string;
  likes: number;
  retweets?: number;
  saves?: number;
  comments?: number;
  replies?: [{}];
  id: number;
  userId: number;
  onActionClick: (action: string, id: number, remove: boolean) => any;
  isRemoved: (removed: boolean) => any;
  replySubmited?: (submited: true) => any;
};

export function TweetCard(props: TweetCardProps) {
  const [isActive, setIsActive] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isDeleted, setIsDeleted] = useState(false);
  const router = useRouter();
  const { me } = useUser();
  const { data, mutate } = useUserFeed() as any;

  const style = isDeleted ? { display: "none" } : {};

  async function handleCommentSubmit(e) {
    e.preventDefault();
    const newComment = {
      comment: e.target.comment.value,
      userId: me?.generatedId,
      tweetId: props.id,
      by: me?.fullname,
      pics: { profilePicture: me?.pics.profilePicture },
    };
    setIsLoading(true);
    e.target.comment.value = "";
    const result = await submitAComment(newComment);
    if (result) {
      setIsLoading(false);
      mutate([...data], newComment);
    }
  }

  useEffect(() => {
    setLikeCount(props.likes);
    if (router.route == "/profile") {
      setIsProfile(true);
    } else {
      setIsProfile(false);
    }
  }, [router]);

  return (
    <div style={style} className={styles.tweet_card_container}>
      <div className={styles.top_tweet_container}>
        <div className={styles.img_container}>
          <Link href={"/profile/" + props.userId}>
            <Image
              src={props.profilePicture}
              className={styles.img}
              layout="fill"
            />
          </Link>
        </div>

        <div className={styles.top_tweet_text}>
          <RegularBlackSmallTextBold>
            {props.userName}
          </RegularBlackSmallTextBold>
          <RegularGrayTextSmall>{props.createdAt}</RegularGrayTextSmall>
        </div>
        {isProfile ? (
          <div
            className={styles.delete_icon}
            onClick={async () => {
              props.isRemoved(true);
              setIsDeleted(true);
              await deleteTweet(props.id);
            }}
          >
            <MdDelete size="25" />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={styles.tweet_description}>
        <TextForTweetDescription>{props.text}</TextForTweetDescription>
      </div>
      <div
        className={
          props.src
            ? styles.bottom_img_container
            : styles.bottom_img_container_empty
        }
      >
        {/* Here was the interact-blocking problem */}
        <Image
          src={props.src || ""}
          className={styles.bottom_img}
          width={300}
          height={300}
        ></Image>
      </div>
      <div className={styles.tweet_specifications}>
        <SmallTextForTweetCard>{props.comments} Comments</SmallTextForTweetCard>
        <SmallTextForTweetCard>{props.retweets} Retweets</SmallTextForTweetCard>
        <SmallTextForTweetCard>{likeCount} Likes</SmallTextForTweetCard>
      </div>
      <div className={styles.tweet_interaction_container}>
        <ul className={styles.tweet_interaction}>
          <li className={styles.interaction}>
            <MdOutlineModeComment
              size="15"
              className={styles.interaction_comment__icon}
            />
            <RegularBlackSmallTextBold
              className={styles.interaction_comment__text}
              onClick={() => {
                setIsActive(!isActive);
              }}
            >
              Comment
            </RegularBlackSmallTextBold>
          </li>
          <li
            className={styles.interaction}
            onClick={() => {
              setIsRetweeted(!isRetweeted);

              props.onActionClick("retweet", props.id, isRetweeted);
            }}
          >
            <AiOutlineRetweet
              size="15"
              className={styles.interaction_retweet__icon}
            />
            <RegularBlackSmallTextBold
              className={styles.interaction_retweet__text}
            >
              Retweet
            </RegularBlackSmallTextBold>
          </li>
          <li
            className={styles.interaction}
            onClick={() => {
              setIsLiked(!isLiked);
              if (isLiked) {
                setLikeCount(likeCount - 1);
              } else {
                setLikeCount(likeCount + 1);
              }
              props.onActionClick("like", props.id, isLiked);
            }}
          >
            <FcLike size="15" className={styles.interaction_like__icon} />
            <RegularBlackSmallTextBold
              className={styles.interaction_like__text}
            >
              Like
            </RegularBlackSmallTextBold>
          </li>
          <li
            className={styles.interaction}
            onClick={() => {
              setIsSaved(!isSaved);
              props.onActionClick("save", props.id, isSaved);
            }}
          >
            <IoMdBookmarks
              size="15"
              className={styles.interaction_save__icon}
            />
            <RegularBlackSmallTextBold
              className={styles.interaction_save__text}
            >
              Save
            </RegularBlackSmallTextBold>
          </li>
        </ul>
      </div>
      {isActive ? (
        <form
          className={styles.comment_tweet_container}
          onSubmit={handleCommentSubmit}
        >
          <div className={styles.img_container}>
            <Image
              className={styles.img}
              src={me?.pics.profilePicture}
              layout="fill"
            />
          </div>
          <div>
            <MakeAComment
              placeholder="Tweet your reply"
              children={<AiOutlinePicture size="25" />}
              name="comment"
              isLoading={isLoading}
            />
          </div>
        </form>
      ) : (
        ""
      )}
      {isActive ? (
        <div>
          {props.replies?.map((r: any) => {
            const updatedDate = new Date(
              r.ia?._seconds * 1000 + r.ia?._nanoseconds / 1000000
            );
            if (Object.keys(r).length !== 0) {
              return (
                <CommentCard
                  key={r.id}
                  name={r.by || "Noname"}
                  date={updatedDate}
                  content={r.comment}
                  likes={r.likes}
                  tweetId={r.tweetId}
                  replyId={r.id}
                  userId={r.userId}
                  picture={r?.pics?.profilePicture || ""}
                />
              );
            }
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
