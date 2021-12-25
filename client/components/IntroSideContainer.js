import React from "react";
import styles from "../styles/RegisterLogin.module.scss";
import bankLogo from "../assets/bank-logo.png";
import Image from "next/image";
import { useRouter } from "next/router";

export default function IntroSideContainer(props) {
  const forSignIn = props.forSignIn;
  const router = useRouter();
  return (
    <div className={styles.introSideParentContainer}>
      <div className={styles.introSideInnerContainer}>
        <div className={`${styles.bankLogo} unselectable`}>
          <Image src={bankLogo} alt="BankLogo" />
        </div>
        <div className={`${styles.dividerLine} bg-green`} />
        <h5 className={styles.introTitle}>The future of banking is here</h5>
        <p className={styles.introText}>
          Join now to experience banking like never before. The Blank Bank
          introduces the future of banking systems.
        </p>
        <div className={styles.emptyFiller}></div>
        <div
          onClick={() => {
            if (forSignIn) {
              router.replace("register");
            } else {
              router.replace("login");
            }
          }}
          className={styles.noAccountContainer}
        >
          <p>
            {forSignIn ? "Don’t have an account?" : "Already have an account?"}
          </p>
          <p className={styles.noAccountButtonText}>
            {forSignIn ? "Sign up" : "Sign in"}
          </p>
        </div>
      </div>
    </div>
  );
}
