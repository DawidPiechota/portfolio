import { FC } from "react";
import styles from "./WidthClampLayout.module.css";

type WidthClampLayoutProps = {
  children: React.ReactNode;
};

const WidthClampLayout: FC<WidthClampLayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};

export default WidthClampLayout;