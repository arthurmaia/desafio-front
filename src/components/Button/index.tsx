import React, { ButtonHTMLAttributes } from "react";

import styles from "./index.module.scss";

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...rest
}) => {
  return (
    <button className={styles.container} {...rest}>
      {children}
    </button>
  );
};

export default Button;
