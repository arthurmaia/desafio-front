import React from "react";
import Image from "next/image";

import loaderImg from "../../../public/images/loader.png";

import styles from "./index.module.scss";

const Loader: React.FC = () => {
  return (
    <div className={styles.container}>
      <Image className={styles.image} src={loaderImg} alt="loader" />
    </div>
  );
};

export default Loader;
