import Image from "next/image";
import styles from "./jokecard.module.css";
const dadJokesImg = require("/public/dadJoke.jpg");

export function DadJokeCard(props) {
  return (
    <div className={styles.main_container}>
      <div className={styles.top_content__container}>
        <div className={styles.img_container}>
          <Image src={dadJokesImg} className={styles.img} layout="fill"></Image>
        </div>
        <h4 className={styles.joke_title}>{props.jokeTitle}</h4>
      </div>
      <div className={styles.joke_container}>
        <p className={styles.joke}>{props.setUp}</p>
        <p className={styles.joke}>{props.punchline}</p>
      </div>
    </div>
  );
}
