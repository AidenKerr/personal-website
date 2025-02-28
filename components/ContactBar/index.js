import styles from './ContactBar.module.css';
import Link from 'next/link';

const CustomLink = ({ href, title }) => (
    <Link
        className={styles.link}
        href={`http://www.${href}`}
        target='_blank'
        rel='noreferrer'
    >
        {title}
    </Link>
);

export function ContactBar() {
    return (
        <div>
            <CustomLink href={'linkedin.com/in/aidenkerr'} title={'LinkedIn'} />
            {' | '}
            <CustomLink href='github.com/aidenkerr' title={'Github'} />
            {' | '}
            <CustomLink
                href='aidenkerr.com/files/Aiden_Kerr_Resume_New_Grad.pdf'
                title={'Resume'}
            />
        </div>
    );
}
