import { LoginComp } from "components/loginComp";
import Head from "next/head";
const loginBackgroundImg = require("/public/login_background.jpg");
console.log(loginBackgroundImg);
import styles from "./login.module.css";

export default function LoginPage() {
  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(${loginBackgroundImg.default.src})`,
      }}
    >
      <Head>
        <title>Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <LoginComp />
    </div>
  );
}
