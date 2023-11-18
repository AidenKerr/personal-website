import { Main } from '../../components/Main';
import Image from 'next/image';
import styles from './About.module.css';

import headshot from '../../public/images/headshot.jpg';

const Link = ({ href, title }) => (
  <a
    className={styles.link}
    href={`http://www.${href}`}
    target="_blank"
    rel="noreferrer"
  >
    {title}
  </a>
);

export default function About() {
  return (
    <Main>
      <Image
        src={headshot}
        width={80}
        height={80}
        className={styles.headshot}
        alt="Headshot of Aiden Kerr"
      />
      <h2>Hi. My name is Aiden Kerr.</h2>
      <p>
        I study Computer Science at The University of British Columbia in
        Vancouver, British Columbia, Canada.
      </p>
      <p>
        I am currently looking for internship positions. In particular, I am
        interested in software development positions regarding computer graphics
        and/or game development.
      </p>
      <p>
        If you would like to get in touch, feel free to contact me on{' '}
        <Link href="linkedin.com/in/aidenkerr" title="LinkedIn." />
      </p>
    </Main>
  );
}
