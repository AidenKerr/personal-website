import { Main } from '../../components/Main';
import styles from './Balloonium.module.css';
import Image from 'next/image';
import Link from 'next/link';

import BallooniumImage from '../../public/images/balloonium.png';

export default function Balloonium() {
    return (
        <Main>
            <div className={styles.info}>
                <h1>Balloonium</h1>
                <h2>Custom ECS Engine / Game</h2>
                <p>
                    <Image src={BallooniumImage} height={100} />
                </p>

                <button className={styles.button}>
                    <Link
                        href='https://www.dropbox.com/scl/fi/b80605e82oggxkm9kkbzk/Balloonium.zip?rlkey=3viygq2w96x2dzxmgo1pjf568&st=15yhq3oq&dl=1'
                        target='_blank'
                        rel='noreferrer'
                    >
                        Download
                    </Link>
                </button>
                <p>
                    This has been tested on Windows with Intel, NVidia, and AMD
                    GPUs.
                </p>
                <b>
                    Click{' '}
                    <Link className={styles.link} href='/blogs/balloonium'>
                        HERE
                    </Link>{' '}
                    to read about the lightning shader, and see a demo of it in
                    action!
                </b>
                <h3>Trailer:</h3>
                <iframe
                    className={styles.video}
                    src='https://www.youtube.com/embed/lzcgCclYAKM?si=5DckyVRaMr4i2sL5'
                    title='YouTube video player'
                    frameborder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    referrerpolicy='strict-origin-when-cross-origin'
                    allowfullscreen
                ></iframe>

                <p>
                    Credits: Annabelle Wang, Colby Sparks, Herman Muller, Aiden
                    Kerr, Phillip Dumitru, Jiajun Zou
                </p>
            </div>
        </Main>
    );
}
