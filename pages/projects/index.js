import Image from 'next/image';
import { Main } from '../../components/Main';
import styles from './Projects.module.css';
import { SiGithub } from 'react-icons/si';
import { RiExternalLinkFill } from 'react-icons/ri';

import GOOpyImage from '../../public/images/gOOpy.png';
import BallooniumImage from '../../public/images/balloonium.png';
import BFImage from '../../public/images/bf.png';
import RedditImage from '../../public/images/reddit.png';
import TwentyQImage from '../../public/images/20Q.png';
import GeneticImage from '../../public/images/genetic.png';
import Link from 'next/link';

const AdditionalPage = ({ additionalPage }) => {
    return (
        <button className={styles.button}>
            <Link href={additionalPage.link}>{additionalPage.message}</Link>
        </button>
    );
};

const Project = ({
    image,
    imageAlt,
    title,
    repos,
    skills,
    points,
    additionalPage,
}) => {
    return (
        <div className={styles.project}>
            <div className={styles['project-title']}>
                <div className={styles['project-logo']}>
                    <Image src={image} height={65} width={65} alt={imageAlt} />
                </div>
                <div>
                    <h3>{title}</h3>
                    <Repos repos={repos} />
                    {additionalPage && (
                        <AdditionalPage additionalPage={additionalPage} />
                    )}
                    <h6>{skills}</h6>
                </div>
            </div>
            <div>
                <ul>
                    {points.map((p) => (
                        <li key={p}>{p}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const Repos = ({ repos }) => {
    if (!repos) return <></>;
    return (
        <h5>
            {repos.source && (
                <span>
                    <Link href={repos.source} target='_blank'>
                        <SiGithub /> Source Code
                    </Link>{' '}
                </span>
            )}
            {repos.front && (
                <span>
                    <Link href={repos.front} target='_blank'>
                        <SiGithub /> Frontend
                    </Link>{' '}
                </span>
            )}
            {repos.back && (
                <span>
                    |{' '}
                    <Link href={repos.back} target='_blank'>
                        <SiGithub /> Backend
                    </Link>{' '}
                </span>
            )}
            {repos.link && (
                <span>
                    |{''}
                    <Link href={repos.link} target='_blank'>
                        <RiExternalLinkFill /> Link
                    </Link>
                </span>
            )}
        </h5>
    );
};

export default function Projects() {
    return (
        <Main>
            <div className={styles.projects}>
                <Project
                    image={GOOpyImage}
                    imageAlt={'Logo for BF'}
                    title={'gOOpy - 3D Raymarching Scene Editor'}
                    repos={{
                        source: 'https://github.com/ubc-cpsc455-2024S/gOOpy',
                        link: 'https://goopy-frontend.onrender.com/',
                    }}
                    skills={'ThreeJS, GLSL, React, Node, Express.js, MongoDB'}
                    points={[
                        'Created a 3D scene editor with React / Three.js allowing users to create, save, and share their creations. ',
                        'Implemented backend with Node and Express, using a NoSQL MongoDB database to store scene and user info.',
                        'Implemented raymarching in GLSL using signed distance functions, allowing for "goopy" shape interactions.',
                        'Calculated surface normals using gradients of the signed distance functions with central differences to implement Blinn-Phong lighting.',
                    ]}
                />
                <Project
                    image={BFImage}
                    imageAlt={'Logo for BF'}
                    title={'BF Interpreter'}
                    repos={{ source: 'https://github.com/AidenKerr/brainfuck' }}
                    skills={'C++'}
                    points={[
                        'Created an interpreter for the BF language written in C++.',
                        'Improved performance by preprocessing instructions, storing possible instruction jump addresses.',
                        'Tested using the Google Test unit testing library.',
                    ]}
                />
                <Project
                    image={BallooniumImage}
                    imageAlt={'Logo for Balloonium'}
                    title={'Balloonium - First Place Winner'}
                    additionalPage={{
                        link: '/balloonium',
                        message: 'View More and Download',
                    }}
                    skills={'C++, OpenGL, GLSL'}
                    points={[
                        'Awarded first place out of 18 teams, judged by video game industry professionals, for a 2D game built in team of 6 in a custom engine using C++ and OpenGL with an Entity Component System.',
                        'Implemented electric player attack with custom electricity shader made by displacing UV coordinates with noise, using RGB texture channels to encode visual information.',
                        'Created shaded sprites using the Blinn-Phong model with normal maps and configurable material properties.',
                        'Implemented smooth camera movement by offsetting position based on velocity and interpolating between frames.',
                    ]}
                />
                <Project
                    image={RedditImage}
                    imageAlt={'Logo for Kerrdit'}
                    title={'Kerrdit (Reddit Clone)'}
                    repos={{
                        front: 'https://github.com/AidenKerr/Kerrdit-frontend',
                        back: 'https://github.com/AidenKerr/Kerrdit-backend',
                    }}
                    skills={'React, MySQL, Node.js, Express'}
                    points={[
                        "Used React with Material-UI to build responsive website similar to Reddit's layout.",
                        'Utilized Express to read/write from a MySQL database to allow posting, voting, and more.',
                    ]}
                />
                <Project
                    image={TwentyQImage}
                    imageAlt={'Logo for twenty Q style game editor'}
                    title={'20Q-style Game Editor'}
                    repos={{
                        source: 'https://github.com/AidenKerr/20Q-Designer',
                    }}
                    skills={'Java, Swing'}
                    points={[
                        'Developed using a binary tree structure that backtracks when all questions in a branch have been asked.',
                        'Implemented persistence by reading and writing to JSON files.',
                        'Achieved 100% test coverage with JUnit to ensure program quality.',
                    ]}
                />
                <Project
                    image={GeneticImage}
                    imageAlt={'Logo for Genetic Algorithm Visualization'}
                    title={'Genetic Algorithm Visualization By Colour'}
                    repos={{
                        front: 'https://github.com/AidenKerr/genetic-v2',
                    }}
                    skills={'React, Genetic Algorithms'}
                    points={[
                        'Developed algorithm and designed interface to visualize how natural selection can affect populations over time.',
                        'Used custom React components as well as libraries to display the state of the population.',
                    ]}
                />
            </div>
        </Main>
    );
}
