import { FC } from "react";
import styles from "./MainContainer.module.css";

type MainContainerProps = {
  children: React.ReactNode;
};

const MainContainer: FC<MainContainerProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};

export default MainContainer;