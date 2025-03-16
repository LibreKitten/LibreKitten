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
            <header className={styles.headerContainer}>
                <h1 className={styles.headerText}>
                    LibreKitten - A powerful block-based visual programming language.
                </h1>
                <p>
                    LibreKitten is an <strong>alpha quality</strong> block-based visual programming language based on <a href="https://turbowarp.org/">TurboWarp</a> that supports server-side execution.
                </p>
                <a href="/editor.html" className={myStyles.primaryButton}>
                    Try now!
                </a>
            </header>
            {/* <div class="notification">
            <p>
                <div class="flex-img">
                    <img width="32px" height="32px" src="/images/happy-librekitty-white.svg" />
                </div>
                <span style="margin-left: 5px; margin-right: 5px;">If you know at least a little bit of JavaScript and git, please contribute to LibreKitten. Even without knowing
                    those, you can still help. It will help make LibreKitten better!</span>
                <a class="button" href="https://codeberg.org/LibreKitten">Contribute</a>
            </p>
        </div> */}
            <section id="prototype">
                <h1>Zoooooom! Quickly develop something and deploy it.</h1>
                <p>
                    With block-based programming, you can quickly prototype something from start to finish without worrying about that missing semicolon or those messy sphagetti nodes.
                </p>
            </section>
            <section id="license">
                <h1>LibreKitten editor is licensed under the GPL v3.</h1>
                <a href="/LICENSE.txt">View</a>
            </section>
            <Footer />
        </main>
    </>
);

render(<Index />);
