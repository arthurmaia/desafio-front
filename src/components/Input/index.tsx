import React, { InputHTMLAttributes } from "react";

import styles from "./index.module.scss";

const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  style,
  ...rest
}) => {
  return (
    <div className={styles.container} style={style}>
      <input {...rest} />
    </div>
  );
};

export default Input;
