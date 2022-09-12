import { BlandInput } from "ui/inputs";
import {
  RegularBlackSmallTextBold,
  RegularTextBlue,
  RegularGrayTextSmall,
} from "ui/texts";
import Image from "next/image";
import styles from "./tweetSomething.module.css";
const img = require("/public/Elon_musk.jpg");
import { AiOutlinePicture, BiWorld } from "ui/icons";
import { useState } from "react";
import { TweetButton } from "ui/buttons";
import { postTweet } from "lib/api/user";
import { UploadImageForTweet } from "components/uploadImage";
import { useUser, useUserFeed } from "lib/hooks";
import { SmallerSpinner } from "components/spinner";

export function TweetSomething() {
  const [isActive, setIsActive] = useState(false);
  const [canReply, setCanReply] = useState("Everyone");
  const [isDropFile, setIsDropFile] = useState(false);
  const [file, setFile] = useState(null) as any;
  const [fileUrl, setFileUrl] = useState({});
  const { data, mutate } = useUserFeed();
  const [isLoading, setIsLoading] = useState(false);
  const { me } = useUser();

  const style = isLoading ? { backgroundColor: "transparent" } : {};

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const tweet = e.target.tweet_content.value;
    const newTweet = {
      content: tweet,
      mode: canReply,
      img: file?.name,
      imgURL: fileUrl || "",
    };
    e.target.tweet_content.value = "";
    const res = await postTweet(newTweet);
    if (res) {
      setIsLoading(false);
      mutate(data);
    }

    /*
    location.pathname = "/home"; 
    this is for reloading the page in order to show the new tweet 
    but this may not be a good practice.
    Instead of that , use mutate or set the state to have new content displayed.
    */
  }

  return (
    <form onSubmit={handleSubmit} className={styles.tweet_container}>
      <RegularBlackSmallTextBold>Tweet something</RegularBlackSmallTextBold>
      <div className={styles.tweet_content__container}>
        <div className={styles.img_container}>
          <Image
            src={me?.pics.profilePicture || ""}
            className={styles.img}
            layout="fill"
          />
        </div>
        <BlandInput
          name="tweet_content"
          type="text"
          placeholder="What's happening?"
        ></BlandInput>
      </div>
      {isDropFile ? (
        <div className={styles.file_drop_container}>
          <UploadImageForTweet
            onFile={(file) => {
              setFile(file);
              setFileUrl(file.url);
            }}
          />
        </div>
      ) : (
        ""
      )}
      <div className={styles.tweet_options}>
        <div
          onClick={() => {
            setIsDropFile(!isDropFile);
          }}
        >
          <AiOutlinePicture size="25" color="var(--secondary-color)" />
        </div>
        <BiWorld size="25" color="var(--secondary-color)" />
        <RegularTextBlue
          className={styles.bottom_text}
          onClick={() => setIsActive(!isActive)}
        >
          {canReply}
        </RegularTextBlue>
        <TweetButton className={styles.tweet_button} style={style}>
          {isLoading ? (
            <div className={styles.spinner_container}>
              <SmallerSpinner />
            </div>
          ) : (
            "Enviar"
          )}
        </TweetButton>
      </div>
      {isActive ? (
        <div className={styles.pop_up_container}>
          <RegularBlackSmallTextBold>Who can reply?</RegularBlackSmallTextBold>
          <RegularGrayTextSmall>
            Choose who can reply to this Tweet.
          </RegularGrayTextSmall>
          <div className={styles.pop_up_options}>
            <RegularBlackSmallTextBold
              className={styles.option}
              onClick={() => {
                setCanReply("everyone");
                setIsActive(!isActive);
              }}
            >
              <BiWorld
                size="15"
                color="var(--secondary-color)"
                className={styles.world_icon}
              />
              Everyone
            </RegularBlackSmallTextBold>
            <RegularBlackSmallTextBold
              className={styles.option}
              onClick={() => {
                setCanReply("followers");
                setIsActive(!isActive);
              }}
            >
              People you follow
            </RegularBlackSmallTextBold>
          </div>
        </div>
      ) : (
        ""
      )}
    </form>
  );
}
