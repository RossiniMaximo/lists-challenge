import { TbTriangles } from "ui/icons";
import Image from "next/image";
import styles from "./layout.module.css";
import { MainTitle, RegularTextBold } from "ui/texts";
import { HeaderNavBar, FooterNavBar } from "components/navBar";
import { useUser } from "lib/hooks";
import { MdArrowDropDown } from "ui/icons";
import { DropwDown } from "components/dropDown";
import { useState } from "react";
import Router from "next/router";

export function Layout({ children }) {
  const { me } = useUser();

  const [isActive, setActive] = useState(false);
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.icon_title_container}>
          <TbTriangles size="40" color="var(--secondary-color)" />
          <MainTitle className={styles.title}>Tweeter</MainTitle>
        </div>
        <div className={styles.navbar_container}>
          <HeaderNavBar />
        </div>
        <div className={styles.img_container}>
          <div onClick={() => Router.push("/profile")}>
            <Image
              src={me?.pics.profilePicture}
              layout="fill"
              className={styles.image}
            />
          </div>
          <div className={styles.user_name_container}>
            <RegularTextBold>{me?.fullname}</RegularTextBold>
            <div
              className={styles.arrow_container}
              onClick={() => setActive(!isActive)}
            >
              <MdArrowDropDown size="30" />
            </div>
            {isActive ? (
              <div className={styles.dropdown_container}>
                <DropwDown />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </header>
      <div>{children}</div>
      <footer className={styles.footer}>
        <div>
          <FooterNavBar />
        </div>
      </footer>
    </div>
  );
}
