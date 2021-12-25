import React from "react";
import styles from "../styles/DialogBox.module.scss";

const DialogBox = (props) => (
  <div className={styles.blurScreen}>
    <div className={styles.dialogBox}>
      <h1>{props.message}</h1>
      <div className={styles.buttonContainer}>
        {props.options.map((o) => (
          <div key={o.key} onClick={o.action} className={styles.button}>
            <h6>{o.label}</h6>
          </div>
        ))}
      </div>
    </div>
  </div>
);
export default DialogBox;
