import styles from "./dropdown.module.css";
import { RiLogoutBoxRLine, IoSettingsSharp, HiUserCircle } from "ui/icons";
import { logOut } from "lib";
import { useRouter } from "next/router";

export function DropwDown() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <ul className={styles.menu}>
        <li>
          <p
            className={styles.menu_item}
            onClick={() => router.push("/profile")}
          >
            {" "}
            <HiUserCircle size="25" /> My Profile
          </p>
        </li>
        <li>
          <p className={styles.menu_item}>
            <IoSettingsSharp size="25" />
            Settings
          </p>
        </li>
      </ul>
      <div className={styles.menu_logout}>
        <p className={styles.logout_item} onClick={logOut}>
          <RiLogoutBoxRLine size="25" />
          Logout
        </p>
      </div>
    </div>
  );
}
