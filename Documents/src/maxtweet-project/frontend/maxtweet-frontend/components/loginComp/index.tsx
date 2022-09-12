import styles from "./login.module.css";
import { TweetButton } from "ui/buttons";
import { useState } from "react";
import { getCode, sendCode } from "lib/api/auth";
import { setLoggedInStorage } from "lib/index";
import Router from "next/router";
import { AlertComponent } from "components/alert";

export function LoginComp() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);

  async function handleFirstSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const fullname = e.target.fullname.value;
    setEmail(email);
    setIsSent(true);
    await getCode(email, fullname);
  }
  async function handleCodeSubmit(e) {
    e.preventDefault();
    const code = e.target.code.value;
    const result = await sendCode(email, Number(code));
    if (result) {
      setLoggedInStorage();
      Router.push("/edit-profile");
    }
  }
  return (
    <div className={styles.main_container}>
      {email == "" ? (
        <form className={styles.first_form} onSubmit={handleFirstSubmit}>
          <label className={styles.label}>
            <p className={styles.text}>Email</p>
            <input className={styles.input} type="text" name="email" />
          </label>
          <label className={styles.label}>
            <p className={styles.text}>Fullname</p>
            <input className={styles.input} type="text" name="fullname" />
          </label>
          <div className={styles.btn_container}>
            <TweetButton>Send</TweetButton>
          </div>
        </form>
      ) : (
        <form className={styles.first_form} onSubmit={handleCodeSubmit}>
          <label className={styles.label}>
            <p className={styles.text}>Code</p>
            <input className={styles.input} type="number" name="code" />
          </label>
          <div className={styles.btn_container}>
            <TweetButton>Send</TweetButton>
          </div>
        </form>
      )}
      {isSent ? (
        <div
          className={styles.alert_container}
          onClick={() => setIsSent(false)}
        >
          <AlertComponent text="El código de verificación ha sido enviado a su casilla de mails." />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
