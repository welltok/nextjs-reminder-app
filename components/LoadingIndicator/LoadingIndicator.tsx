import React from 'react';
import styles from './LoadingIndicator.module.css';

const LoadingIndicator: React.FC = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default LoadingIndicator;