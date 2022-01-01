import { Main } from "../../components/Main";
import Image from "next/image";
import styles from "./Experience.module.css";

import RDCImage from "../../public/images/RDC.png";

export default function Experience() {
  return (
    <Main>
      <div className={styles.experience}>
        <div className={styles["experience-title"]}>
          <Image src={RDCImage} height={65} width={65} />
          <div>
            <h2>Realtor.com</h2>
            <h4>Software Engineer Co-op</h4>
            <h5>Javascript, Typescript, React, Next.js</h5>
          </div>
        </div>
        <div>
          <ul>
            <li>
              Working on multiple shareable components and pages written in both
              Javascript and Typescript, including a custom Google Maps wrapper.
            </li>
            <li>
              Collaborating across multiple teams to ensure product quality and
              consistency.
            </li>
            <li>
              Contributing and asking relevant questions in all Scrum events,
              and participating in code review.
            </li>
            <li>
              Achieved over 80% test coverage using Jest and React Testing
              Library.
            </li>
          </ul>
        </div>
      </div>
    </Main>
  );
}
