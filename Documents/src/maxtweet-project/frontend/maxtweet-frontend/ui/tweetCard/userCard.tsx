import Image from "next/image";
import styles from "./userCard.module.css";
import { useRouter } from "next/router";
const mockProfileImg = require("/public/Elon_musk.jpg");

type UserCard = {
  name: string;
  img: string;
  description: string;
  userId: number;
};
export function UserCard(props: UserCard) {
  const router = useRouter();
  return (
    <div
      className={styles.main_container}
      onClick={() => router.push("/profile/" + props.userId)}
    >
      <div className={styles.img_container}>
        <Image
          src={props.img || mockProfileImg}
          layout="fill"
          className={styles.img}
        ></Image>
      </div>
      <div className={styles.text_container}>
        <p className={styles.name}>{props.name}</p>
        <p className={styles.description}>{props.description}</p>
      </div>
    </div>
  );
}
