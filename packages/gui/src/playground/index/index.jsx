import React from 'react';
import classNames from 'classnames';
import render from '../app-target';
import styles from '../../css/info-page.css';
import myStyles from './index.css';

import 'modern-normalize/modern-normalize.css';

import {applyGuiColors} from '../../lib/themes/guiHelpers';
import {detectTheme} from '../../lib/themes/themePersistance';

import Header from '../../components/lk-header/header.jsx';
import Footer from '../../components/lk-footer/footer.jsx';

import Vision from '../components/vision/vision.tsx';

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
                        If you know at least a little bit of web technologies and git, please contribute to LibreKitten.
                    </span>
                    <a
                        href="/for-contributors.html"
                        className={myStyles.notificationButton}
                    >
                        Contribute! 😻
                    </a>
                </p>
            </div>
            <header className={styles.headerContainer}>
                <h1 className={styles.headerText}>
                    {process.env.CANARY_MODE ?
                        'LibreKitten (Canary Build)' :
                        'LibreKitten - A powerful block-based visual programming language.'}
                </h1>
                {process.env.CANARY_MODE && <p>
                    <strong>Please do not write serious projects in the canary build.</strong> Features that you
                    are using may be removed, your project may get corrupted, among other things that may happen. <a href="https://librekitten.org/">
                        Click here to go to stable LibreKitten.
                    </a>
                </p>}
                <p>
                    LibreKitten is an <strong>alpha-quality</strong> block-based visual programming language based
                    on <a href="https://turbowarp.org/">TurboWarp</a>. The primary feature is being able to function as a web server, but it is
                    also an experimentation ground to push the limits of block-based languages.
                </p>
                <a
                    href="/editor.html"
                    className={styles.headerButton}
                >
                    Try now!
                </a>
            </header>
            <section id="prototype">
                <h2>Zoooooom! Quickly build something.</h2>
                <p>
                    With block-based programming, you can quickly prototype something from start to finish without
                    worrying about syntax or other complications of text-based programming languages.
                </p>
            </section>
            <section id="why">
                <h2>Why does LibreKitten exist?</h2>
                <p>
                    Scratch is made for a novice userbase. This means it doesn&apos;t cater to the more advanced users
                    of Scratch who like the simple block-based interface of Scratch and the easy to use primitive
                    blocks, but want more advanced features.
                </p>
                <p>
                    For this audience, we have made a new block-based visual programming language called LibreKitten.
                    It is a fork of TurboWarp, which itself was forked off Scratch.
                </p>
                <p>
                    LibreKitten was created with the intention of containing more advanced features and accept
                    contributions written by the community, while still being for all ages.
                </p>
            </section>
            <section id="vision">
                <h2>What is the vision?</h2>
                <p>
                    LibreKitten has a vision. We want you to know it so you can know our intentions for LibreKitten,
                    and look at LibreKitten the way that we do.
                </p>
                <Vision />
            </section>
            <section id="license">
                <h2>LibreKitten is free software.</h2>
                <p>The LibreKitten editor is licensed under the GNU General Public License v3.</p>
                <div className={classNames(styles.buttonContainer, myStyles.buttonContainer)}>
                    <a
                        href="/LICENSE.txt"
                        className={styles.button}
                    >View</a>
                </div>
            </section>
            <Footer />
        </main>
    </>
);

render(<Index />);
