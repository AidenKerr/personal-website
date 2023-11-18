import { Main } from '../../components/Main';
import Image from 'next/image';
import styles from './Portfolio.module.css';

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

export default function Portfolio() {
  return (
    <Main>
      <Image
        src={headshot}
        width={80}
        height={80}
        className={styles.headshot}
        alt="Headshot of Aiden Kerr"
      />
      <h2>Portfolio</h2>
      <p>This is where I will put my portfolio.</p>
      <p>
        If you would like to get in touch, feel free to contact me on{' '}
        <Link href="linkedin.com/in/aidenkerr" title="LinkedIn." />
      </p>
    </Main>
  );
}
