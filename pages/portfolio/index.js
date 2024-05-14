import { Main } from '../../components/Main';
import Image from 'next/image';
import styles from './Portfolio.module.css';

import LightningScene from '../demos/lightningScene/Lightning';

import LightningImage from '../../public/images/lightning.png';

const Link = ({ href, title }) => (
    <a
        className={styles.link}
        href={`http://www.${href}`}
        target='_blank'
        rel='noreferrer'
    >
        {title}
    </a>
);

const Showcase = ({ title, children }) => (
    <div className={styles.showcase}>
        <h2>{title}</h2>
        {children}
    </div>
);

export default function Portfolio() {
    return (
        <Main>
            <div className={styles.showcases}>
                <h1>Portfolio</h1>
                <Showcase title='Balloonium'>
                    <div>
                        <b>Lightning Shader</b>
                        <LightningScene dimension={200} />
                        <b>^ Interactive Demo. Please Click Balloon! ^</b>
                        <p>
                            The goal was to make a lightning effect that is
                            realistic but reasonably cartoony, and can be easily
                            reshaped. To achieve this, I use a texture where the
                            red channel is the bolt, and the green channel is
                            the strength of the glow.
                        </p>
                        <Image src={LightningImage} height={200} />
                        <p>
                            With the shader, I transform this texture into a
                            lightning bolt. Here is a video of it in action:
                        </p>
                        <video width={500} controls>
                            <source src='https://www.aidenkerr.com/videos/balloonium_zap_demo.mp4' />
                        </video>
                    </div>
                </Showcase>
            </div>
        </Main>
    );
}
