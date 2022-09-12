import styles from "./miniNavMenu.module.css";
import { MediumGrayTextBold } from "ui/texts";

type miniNavProps = {
  firstItem: string;
  secondItem: string;
  thirdItem: string;
  fourthItem: string;
  firstItemClick: any;
  secondItemClick: any;
  thirdItemClick: any;
  fourthItemClick: any;
};

export function MiniNavMenu(props: miniNavProps) {
  return (
    <ul className={styles.list}>
      <li className={styles.item} onClick={props.firstItemClick}>
        <MediumGrayTextBold>{props.firstItem}</MediumGrayTextBold>
      </li>
      <li className={styles.item} onClick={props.secondItemClick}>
        <MediumGrayTextBold>{props.secondItem}</MediumGrayTextBold>
      </li>
      <li className={styles.item} onClick={props.thirdItemClick}>
        <MediumGrayTextBold>{props.thirdItem}</MediumGrayTextBold>
      </li>
      <li
        onClick={props.fourthItemClick}
        className={styles.item}
        style={{ borderBottom: "solid 1px var(--light-gray)" }}
      >
        <MediumGrayTextBold>{props.fourthItem}</MediumGrayTextBold>
      </li>
    </ul>
  );
}
