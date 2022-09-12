import styles from "./alert.module.css";

export function AlertComponent(props) {
  return (
    <div className={styles.container}>
      <p className={styles.text}>{props.text}</p>
      <div className={styles.btn_container}>
        <button>Aceptar</button>
      </div>
    </div>
  );
}
