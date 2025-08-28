import React from 'react';
import render from '../app-target';
import styles from '../../css/info-page.css';
import './not_found.css';

import '../../lib/normalize.css';

import {applyGuiColors} from '../../lib/themes/guiHelpers';
import {detectTheme} from '../../lib/themes/themePersistance';

import Header from '../../components/lk-header/header.jsx';
import Footer from '../../components/lk-footer/footer.jsx';

import librekitty from './sad-librekitty.svg';

/* eslint-disable react/jsx-no-literals */

applyGuiColors(detectTheme());
document.documentElement.lang = 'en';

const FourOhFour = () => (
    <>
        <Header />
        <main className={styles.main}>
            <header className={styles.headerContainer}>
                <h1 className={styles.headerText}>
                    Oh no! The Librekitty coudn't find what you're looking for.
                </h1>
            </header>
            <section>
                <p>
                    He looked everywhere, but alas, he coudn't find it.
                </p>
                <img
                    src={librekitty}
                    alt="A sad Librekitty (ginger ailuromorphic/cat-shaped being)."
                />
                <h3 className={styles.headerText}>404</h3>
            </section>
            <Footer />
        </main>
    </>
);

render(<FourOhFour />);
