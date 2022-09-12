import styles from "./navBar.module.css";
import { RegularGrayText } from "ui/texts";
import { TiHomeOutline, MdExplore, IoMdBookmarks } from "ui/icons";
import Link from "next/link";

export function HeaderNavBar() {
  return (
    <nav className={styles.header_container}>
      <ul className={styles.header_list}>
        <li className={styles.header_li}>
          <Link href="/home">
            <a>
              <RegularGrayText className={styles.li_text}>Home</RegularGrayText>
            </a>
          </Link>
        </li>
        <li className={styles.header_li}>
          <Link href="/explore">
            <a>
              <RegularGrayText className={styles.li_text}>
                Explore
              </RegularGrayText>
            </a>
          </Link>
        </li>
        <li className={styles.header_li}>
          <Link href="/bookmarks">
            <a>
              <RegularGrayText className={styles.li_text}>
                Bookmarks
              </RegularGrayText>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export function FooterNavBar() {
  return (
    <nav className={styles.footer_container}>
      <ul className={styles.footer_list}>
        <li className={styles.footer_li}>
          <Link href="/home">
            <a>
              <TiHomeOutline size="35" />
            </a>
          </Link>
        </li>
        <li className={styles.footer_li}>
          <Link href="/explore">
            <a>
              <MdExplore size="35" />
            </a>
          </Link>
        </li>
        <li className={styles.footer_li}>
          <Link href="/bookmarks">
            <a>
              <IoMdBookmarks size="35" />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
