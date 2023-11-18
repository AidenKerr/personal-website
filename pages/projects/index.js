import Image from 'next/image';
import { Main } from '../../components/Main';
import styles from './Projects.module.css';
import { SiGithub } from 'react-icons/si';

import RedditImage from '../../public/images/reddit.png';
import TwentyQImage from '../../public/images/20Q.png';
import GeneticImage from '../../public/images/genetic.png';

const Project = ({ image, imageAlt, title, repos, skills, points }) => {
  return (
    <div className={styles.project}>
      <div className={styles['project-title']}>
        <div className={styles['project-logo']}>
          <Image src={image} height={65} width={65} alt={imageAlt} />
        </div>
        <div>
          <h3>{title}</h3>
          <Repos repos={repos} />
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
  return (
    <h5>
      {repos.source && (
        <span>
          <a href={repos.source}>
            <SiGithub />
          </a>{' '}
          Source Code{' '}
        </span>
      )}
      {repos.front && (
        <span>
          <a href={repos.front}>
            <SiGithub />
          </a>{' '}
          Frontend{' '}
        </span>
      )}
      {repos.back && (
        <span>
          |{' '}
          <a href={repos.back}>
            <SiGithub />
          </a>{' '}
          Backend{' '}
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
          skills={''}
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
