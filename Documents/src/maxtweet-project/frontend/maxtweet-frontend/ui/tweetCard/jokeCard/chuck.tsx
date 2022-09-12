import Image from "next/image";
import styles from "./jokecard.module.css";
const norrisImg = require("/public/chucknorris.jpg");
// import Chuck Norris ,trucker hat, geek person and developer images to use as their twitter user.

export function ChuckNorrisCard(props) {
  return (
    <div className={styles.main_container}>
      <div className={styles.top_content__container}>
        <div className={styles.img_container}>
          <Image src={norrisImg} className={styles.img} layout="fill"></Image>
        </div>
        <h4 className={styles.joke_title}>{props.jokeTitle}</h4>
      </div>
      <div className={styles.joke_container}>
        <p className={styles.joke}>{props.value}</p>
      </div>
    </div>
  );
}
