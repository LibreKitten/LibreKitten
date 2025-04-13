import React from 'react';
import render from '../app-target';
import styles from '../../css/info-page.css';
import myStyles from './index.css';

import { applyGuiColors } from '../../lib/themes/guiHelpers';
import { detectTheme } from '../../lib/themes/themePersistance';

import Header from '../../components/lk-header/header.jsx';
import Footer from '../../components/lk-footer/footer.jsx';

/* eslint-disable react/jsx-no-literals */

applyGuiColors(detectTheme());
document.documentElement.lang = 'en';

const Index = () => (
    <>
        <Header />
        <main className={styles.main}>
            <div className={myStyles.notification}>
                <p>
                    <span>
                        If you know at least a little bit of web technologies and git, please contribute to LibreKitten. It will help make LibreKitten better!
                    </span>
                    <a href="/for-contributors.html" className={myStyles.notificationButton}>
                        Contribute! 😻
                    </a>
                </p>
            </div>
            <header className={styles.headerContainer}>
                <h1 className={styles.headerText}>
                    LibreKitten - A powerful block-based visual programming language.
                </h1>
                <p>
                    LibreKitten is an <strong>alpha quality</strong> block-based visual programming language based on <a href="https://turbowarp.org/">TurboWarp</a> that supports server-side execution.
                </p>
                <a href="/editor.html" className={styles.primaryButton}>
                    Try now!
                </a>
            </header>
            <section id="what">
                <h1>What is LibreKitten?</h1>
                <p>
                    LibreKitten is a block-based visual programming language based on <a href="https://turbowarp.org/">TurboWarp</a>.
                    Its primary feature is server-side execution support, but it is also an experimentation ground to push the limits of block-based languages.
                </p>
            </section>
            <section id="prototype">
                <h1>Zoooooom! Quickly build something.</h1>
                <p>
                    With block-based programming, you can quickly prototype something from start to finish without worrying about that missing semicolon or those messy sphagetti nodes.
                </p>
            </section>
            <section id="license">
                <h1>LibreKitten is free software.</h1>
                <p>The LibreKitten editor is licensed under the GNU General Public License v3.</p>
                <div className={styles.buttonContainer}>
                    <a href="/LICENSE.txt" className={styles.button}>View</a>
                </div>
            </section>
            <Footer />
        </main>
    </>
);

render(<Index />);
