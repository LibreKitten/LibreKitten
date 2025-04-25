import React from 'react';
import render from '../app-target';
import styles from '../../css/info-page.css';

import {applyGuiColors} from '../../lib/themes/guiHelpers';
import {detectTheme} from '../../lib/themes/themePersistance';

import Header from '../../components/lk-header/header.jsx';
import Footer from '../../components/lk-footer/footer.jsx';

import Vision from '../components/vision/vision.tsx';

/* eslint-disable react/jsx-no-literals */

applyGuiColors(detectTheme());
document.documentElement.lang = 'en';

const ForContributors = () => (
    <>
        <Header />
        <main className={styles.main}>
            <header className={styles.headerContainer}>
                <h1 className={styles.headerText}>
                    Contributing to LibreKitten
                </h1>
                <p>
                    <strong>Thanks for considering contributing to LibreKitten!</strong> It really helps with the burden of maintaining,
                    because we can't spend all our time on LibreKitten. You can contribute to LibreKitten in many ways, including but not
                    limited to bug fixes, new features, and bug reports.
                </p>
            </header>
            <section id="rules">
                <h2>What are the rules?</h2>
                <ul>
                    <li>
                        <p>
                            Since we want to allow children to be in our community, and want (and need this early in our community's development)
                            to be mentionable on Scratch, you must follow <a href="https://scratch.mit.edu/community_guidelines">Scratch's Community Guidelines</a> in
                            your contributions (including in the source code).
                        </p>
                    </li>
                    <li>
                        <p>
                            For clarity reasons, using Australian English with no esoteric words in your contributions is preferred,
                            but isn't required. It will help us understand your contributions. If you don't speak or aren't fluent
                            enough in any English variant and you are using a translator, please leave your original text alongside
                            the contributed translated text in case a community member or maintainer fluent in your language can do
                            a human translation.
                        </p>
                    </li>
                </ul>
            </section>
            <section id="things-you-can-do">
                <h2>What are some of the things that I can do?</h2>
                <p>Some of the things you can do are:</p>
                <ol>
                    <li>
                        <p>
                            Fix bugs. (May look boring but it is very helpful.)
                        </p>
                    </li>
                    <li>
                        <p>
                            Add new useful features.
                        </p>
                    </li>
                    <li>
                        <p>
                            Merge TurboWarp or upstream Scratch updates.
                        </p>
                    </li>
                    <li>
                        <p>
                            Complete something on <a href="https://codeberg.org/LibreKitten/-/projects/9653">the roadmap</a>.
                        </p>
                    </li>
                </ol>
                <em>If you think something you want to do is useful, do it!</em>  😸
            </section>
            <section id="vision">
                <h2>What is the vision?</h2>
                <p>
                    <strong>
                        We recommend before you contribute to LibreKitten, you check if your contribution is in the spirit
                        of the vision.
                    </strong>
                </p>
                <Vision />
            </section>
            <section id="how">
                <h2>I'm interested. How do I start?</h2>
                <p>
                    If you've modified <em>TurboWarp</em> before, feel free to open the source code.
                    Otherwise, the wiki has resources that explain things such as how to add blocks to the compiler.
                </p>
                <div className={styles.buttonContainer}>
                    <a
                        href="https://codeberg.org/LibreKitten/LibreKitten/"
                        className={styles.button}
                    >Open the repository on Codeberg (Preferred)</a>
                    <a
                        href="https://github.com/LibreKitten/LibreKitten/"
                        className={styles.button}
                    >Open the repository on GitHub</a>
                    <a
                        href="https://codeberg.org/LibreKitten/LibreKitten/wiki"
                        className={styles.button}
                    >Open the wiki</a>
                </div>
            </section>
            <Footer />
        </main>
    </>
);

render(<ForContributors />);
