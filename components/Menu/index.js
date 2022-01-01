import styles from "./Menu.module.css";
import Link from "next/link";

export function Menu() {
  return (
    <div className={styles.menu}>
      <ul role="list">
        <li>
          <Link href="/">Welcome</Link>
        </li>
        <li>
          <Link href="/about">About Me</Link>
        </li>
        <li>
          <Link href="/experience">Experience</Link>
        </li>
        <li>
          <Link href="/projects">Projects</Link>
        </li>
      </ul>
    </div>
  );
}
