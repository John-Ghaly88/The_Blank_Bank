import React, { useEffect, useState } from "react";
import styles from "../styles/NavigatibleView.module.scss";

const NavigatibleView = (props) => {
  const renderCurrentView = () => {
    return props.views[props.current];
  };

  const PreviousButton = () => (
    <div className={styles.previousViewLabel} onClick={props.handlePrevSelect}>
      <h1>{`< ${props.previous}`}</h1>
      <div className={styles.underline}></div>
    </div>
  );

  return (
    <>
      <div key={Math.random()} className={styles.viewContainer}>
        {props.previous && <PreviousButton />}
        <h1 key={Math.random()} className={styles.currentViewLabel}>
          {props.current}
        </h1>

        {renderCurrentView()}
      </div>
    </>
  );
};
export default NavigatibleView;
