import { Main } from "../../components/Main";
import Image from "next/image";
import styles from "./About.module.css";

import headshot from "../../public/images/headshot.jpg";

export default function About() {
  return (
    <Main>
      <Image
        src={headshot}
        width={80}
        height={80}
        className={styles.headshot}
      />
      <h2>Hi. I am a software developer.</h2>
      <p>
        Based out of British Columbia, Canada, I love to solve problems and
        write high quality solutions. I am always excited to learn new skills
        through projects and internships. I look forward to meeting you!
      </p>
    </Main>
  );
}
