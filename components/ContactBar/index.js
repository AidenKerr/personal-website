import styles from "./ContactBar.module.css";

const Link = ({ href, title }) => (
  <a className={styles.link} href={`http://www.${href}`} target="_blank">
    {title}
  </a>
);

export function ContactBar() {
  return (
    <div>
      <Link href={"linkedin.com/in/aidenkerr"} title={"LinkedIn"} />
      {" | "}
      <Link href="github.com/aidenkerr" title={"Github"} />
      {" | "}
      <Link href="aidenkerr.com/files/Resume_Dec_2021.pdf" title={"Resume"} />
    </div>
  );
}