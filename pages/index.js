import Image from "next/image";
import styles from "../styles/Home.module.css";
import { ContactBar } from "../components/ContactBar";
import { Main } from "../components/Main";

import headshot from "../public/images/headshot.jpg";

export default function Home() {
  return (
    <Main>
      <Image
        src={headshot}
        width={150}
        height={150}
        className={styles.headshot}
        alt="Headshot of Aiden Kerr"
      />
      <h1 className={styles.title}>Aiden Kerr</h1>
      <ContactBar />
    </Main>
  );
}
