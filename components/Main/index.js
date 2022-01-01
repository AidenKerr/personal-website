import { Menu } from "../Menu";
import Head from "next/head";
import styles from "./Main.module.css";

// colours: 993438, C3958E, 130604, 495985
// FFFFE6, FF4D4F, 33B2FF, 2D80B3, edf8ff

export function Main({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Aiden Kerr</title>
        <meta name="description" content="Aiden Kerr's Personal Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Menu />
        <div className={styles.info}>{children}</div>
        {/* maybe replace / improve this: */}
        <div className={styles.padright} />
      </main>
    </div>
  );
}
