import Image from "next/image";
import styles from "./jokecard.module.css";
const img = require("/public/geek.jpg");

export function GeekJokeCard(props) {
  return (
    <div className={styles.main_container}>
      <div className={styles.top_content__container}>
        <div className={styles.img_container}>
          <Image src={img} className={styles.img} layout="fill"></Image>
        </div>
        <h4 className={styles.joke_title}>{props.jokeTitle}</h4>
      </div>
      <div className={styles.joke_container}>
        <p className={styles.joke}>{props.punchline}</p>
      </div>
    </div>
  );
}
