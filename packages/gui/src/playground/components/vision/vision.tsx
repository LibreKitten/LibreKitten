import React from 'react';

import styles from './vision.css';

const Vision = () => (
    <div className={styles.visionBox}>
        <h2 className={styles.header}>
            LibreKitten Vision
        </h2>
        <ul>
            <li>
                <p>
                    LibreKitten should be for all ages and family-friendly, meaning it should contain no profanity
                    and other content that is inappropriate for children (not even in the source code!)
                </p>
            </li>
            <li>
                <p>
                    LibreKitten should be easy to use, while still being able to handle advanced stuff.
                </p>
            </li>
            <li>
                <p>
                    LibreKitten should have as little feature creep as reasonably possible.
                </p>
            </li>
        </ul>
    </div>
)

export default Vision;