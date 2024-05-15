import { Main } from '../../components/Main';
import Image from 'next/image';
import styles from './Experience.module.css';

import RDCImage from '../../public/images/RDC.png';
import SAPImage from '../../public/images/SAP.png';

const Job = ({ image, company, title, skills, points }) => {
    return (
        <div className={styles.experience}>
            <div className={styles['experience-title']}>
                <Image
                    src={image}
                    height={65}
                    width={65}
                    alt={`Logo for ${company}`}
                />
                <div>
                    <h2>{company}</h2>
                    <h4>{title}</h4>
                    <h5>{skills}</h5>
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

export default function Experience() {
    return (
        <Main>
            <div className={styles.experiences}>
                <Job
                    image={SAPImage}
                    company={'SAP'}
                    title={'Software Engineer Co-op'}
                    skills={'MySQL, Docker, Helm, Cloudformation'}
                    points={[
                        'Configured deployment and networking using Kubernetes, Helm, Docker, Cloudformation and shell scripts.',
                        'Upgraded service to use TLS, wrote custom script to manage certificates.',
                        'Reconfigured a redundant AWS instance for development and production environments, saving $500 a year.',
                    ]}
                />
                <Job
                    image={RDCImage}
                    company={'Realtor.com'}
                    title={'Software Engineer Co-op'}
                    skills={'Javascript, Typescript, React, Next.js'}
                    points={[
                        'Developed multiple React/Next.js shareable components and pages written in both JavaScript and TypeScript, including building the legend and modal for the wildfire risk map.',
                        'Prevented page-crashing bug by adding missing points to incomplete polygons in the properties map.',
                        'Fixed bug where state would go out of sync on slow internet connections by validating order of responses.',
                        'Reduced page load times by reworking API calls with GraphQL to cut number of calls by 50%.',
                        'Mitigated the risk of cross-site scripting by sanitizing results intended for rendering on the page',
                        'Prevented unnecessary redirects and 404s by fixing URL generation and parsing inconsistencies.',
                        'Initiated cross-team interest in WebAssembly with an informational slideshow, leading to new prototype project.',
                        'Maintained over 80% test coverage using Jest and React Testing Library.',
                    ]}
                />
            </div>
        </Main>
    );
}
