import { UploadImageForTweet } from "components/uploadImage";
import { useUser } from "lib/hooks";
import { RegularTextBlue } from "ui/texts";
import styles from "./editUser.module.css";
import { useState } from "react";
import { updateUser } from "lib/api/user";
import { useRouter } from "next/router";

export function EditUser() {
  const me = useUser();
  const [isCover, setIsCover] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [coverPic, setCoverPic] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const fullname = e.target.username.value;
    const email = e.target.email.value;
    const description = e.target.description.value;
    if (description.length > 80) {
      window.alert("Description must not exceed 80 words.");
      return "";
    }
    const update = await updateUser({
      fullname,
      email,
      description,
      profilePic,
      coverPic,
    });
    router.push("/profile");
    return update;
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.fields_container}>
        <div className={styles.input_container}>
          <label className={styles.label}>
            <RegularTextBlue>Username</RegularTextBlue>
          </label>
          <input
            className={styles.input}
            type="text"
            name="username"
            placeholder={me?.fullname}
          />
        </div>
        <div className={styles.input_container}>
          <label className={styles.label}>
            <RegularTextBlue>Email</RegularTextBlue>
          </label>
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder={me?.email}
          />
        </div>
        <div className={styles.input_container}>
          <label className={styles.label}>
            <RegularTextBlue>Description</RegularTextBlue>
          </label>
          <input
            className={styles.input}
            type="text"
            name="description"
            placeholder={me?.description}
          />
        </div>
      </div>
      <div className={styles.pickers_container}>
        <div
          className={styles.photo_picker}
          onClick={() => setIsProfile(!isProfile)}
        >
          <p>Pick a profile photo</p>
        </div>
        {isProfile ? (
          <div className={styles.cover_photo__file_picker}>
            <UploadImageForTweet
              onFile={(file) => {
                setProfilePic(file.url);
              }}
            />
          </div>
        ) : (
          ""
        )}

        <div
          className={styles.photo_picker}
          onClick={() => setIsCover(!isCover)}
        >
          <p>Pick a cover photo</p>
        </div>
        {isCover ? (
          <div className={styles.cover_photo__file_picker}>
            <UploadImageForTweet
              onFile={(file) => {
                setCoverPic(file.url);
              }}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={styles.btn_container}>
        <button className={styles.btn}>
          <p>Send</p>
        </button>
      </div>
    </form>
  );
}
{
  /* <UploadImageForTweet /> */
}
