import React from 'react';
import render from '../app-target';
import styles from '../../css/info-page.css';
import myStyles from './for-contributors.css';

import { applyGuiColors } from '../../lib/themes/guiHelpers';
import { detectTheme } from '../../lib/themes/themePersistance';

import Header from '../../components/lk-header/header.jsx';
import Footer from '../../components/lk-footer/footer.jsx';

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
                    <strong>Thanks for considering contributing to LibreKitten!</strong> It really helps with the burden of maintaining, because we can't spend all our time on LibreKitten.
                    You can contribute to LibreKitten in many ways, including but not limited to bug fixes, new features, and bug reports.
                </p>
            </header>
            <section id="why">
                <h1>Why should I contribute?</h1>
                <p>
                    Scratch is very tightly controlled by their creator, the Scratch Foundation.
                    We know that Scratch is made for a novice audience, so an excess of features aren't their goal.
                    We respect the work Scratch has done.
                </p>
                <p>
                    LibreKitten is a fork of TurboWarp, which itself was forked off Scratch.
                    LibreKitten was created with the intention of being targeted to the same audience as Scratch, but with also the intention of being a lot more community-driven, and accept patches written by the community.
                </p>
            </section>
            <section id="rules">
                <h1>What are the rules?</h1>
                <ul>
                    <li>
                        <p>
                            Since we want to allow children to be in our community, and want (and need this early in our communities development) to be mentionable on Scratch, you must follow <a href="https://scratch.mit.edu/community_guidelines">Scratch's Community Guidelines</a> in your contributions.
                        </p>
                    </li>
                    <li>
                        <p>
                            For clarity reasons, using Australian English with no esoteric words in your contributions is preferred but isn't required. It will help us understand your contributions.
                        </p>
                    </li>
                    <li>
                        <p>
                            If you don't speak or aren't fluent enough in any English variant and you are using a translator, please leave your original text alongside the contributed translated text in case a community member or maintainer fluent in your language can do a human translation.
                        </p>
                    </li>
                </ul>
            </section>
            <section id="things-you-can-do">
                <h1>What are some of the things that I can do?</h1>
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
                            Merge or cherry pick TurboWarp or upstream Scratch updates.
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
            <Footer />
        </main>
    </>
);

render(<ForContributors />);
