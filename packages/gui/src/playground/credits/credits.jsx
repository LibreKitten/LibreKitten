import React from 'react';
import PropTypes from 'prop-types';
import render from '../app-target';
import styles from '../../css/info-page.css';

import 'modern-normalize/modern-normalize.css';
import '../load-fonts.css';

import {APP_NAME} from '../../lib/brand';
import {applyGuiColors} from '../../lib/themes/guiHelpers';
import {detectTheme} from '../../lib/themes/themePersistance';
import UserData from './users';
import Header from '../../components/lk-header/header.jsx';
import Footer from '../../components/lk-footer/footer.jsx';

import librekitty from './purring-librekitty-with-love-heart.svg';

/* eslint-disable react/jsx-no-literals */

applyGuiColors(detectTheme());
document.documentElement.lang = 'en';

const User = ({image, text, href}) => (
    <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={styles.user}
    >
        <img
            loading="lazy"
            className={styles.userImage}
            src={image}
            width="60"
            height="60"
        />
        <div className={styles.userInfo}>
            {text}
        </div>
    </a>
);
User.propTypes = {
    image: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    href: PropTypes.string
};

const UserList = ({users}) => (
    <div className={styles.users}>
        {users.map((data, index) => (
            <User
                key={index}
                {...data}
            />
        ))}
    </div>
);
UserList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object)
};

const Credits = () => (
    <>
        <Header />
        <main className={styles.main}>
            <header className={styles.headerContainer}>
                <h1 className={styles.headerText}>
                    {APP_NAME} Credits
                </h1>
                <p>
                    The {APP_NAME} project is made possible by TurboWarp and Scratch. To them, thank you.
                    Without them, programming would have been less accessible to people, and people would
                    have had to learn confusing programming languages not designed for beginners as their
                    first programming language.
                </p>
            </header>
            <section>
                <p>
                    <i>
                        Individual contributors are listed in no particular order.
                        The order is randomized each visit.
                    </i>
                </p>
            </section>
            {APP_NAME !== 'LibreKitten' && (
                // Be kind and considerate. Don't remove this :)
                // lk: The TurboWarp version of this was replaced by a more detailed version.
                <section>
                    <h2>LibreKitten</h2>
                    <p>
                        {APP_NAME} is based on the work of the <a href="https://librekitten.org/credits.html">LibreKitten contributors</a> but
                        is not endorsed by LibreKitten in any way.
                    </p>
                </section>
            )}
            <section>
                <h2>TurboWarp</h2>
                <p>
                    {APP_NAME} is based on the work of the <a href="https://turbowarp.org/credits.html">TurboWarp contributors</a> but
                    is not endorsed by TurboWarp in any way.
                </p>
                <p>
                    <a href="https://github.com/sponsors/GarboMuffin">
                        Donate to support TurboWarp.
                    </a>
                </p>
            </section>
            <section>
                <h2>Scratch</h2>
                <p>
                    {APP_NAME} & TurboWarp is based on the work of the <a href="https://scratch.mit.edu/credits">Scratch contributors</a> but
                    is not endorsed by Scratch in any way.
                </p>
                <p>
                    <a href="https://scratch.mit.edu/donate">
                        Donate to support Scratch.
                    </a>
                </p>
            </section>
            <section>
                <h2>Icon</h2>
                The current icon is a vectorized version of an icon contributed by <a href="https://scratch.mit.edu/users/Eason_9/">Eason_9</a> on
                Scratch from a <a href="https://scratch.mit.edu/discuss/post/8154030/">forum post</a> on that platform.
            </section>
            <section>
                <h2>Contributors</h2>
                <UserList users={UserData.contributors} />
            </section>
            <section>
                <h2>Addons</h2>
                <UserList users={UserData.addonDevelopers} />
            </section>
            <section>
                <h2>TurboWarp Extension Gallery</h2>
                <UserList users={UserData.extensionDevelopers} />
            </section>
            <section>
                <h2>Documentation</h2>
                <UserList users={UserData.docs} />
            </section>
            <section>
                <h2>Translators</h2>
                <p>
                    Sadly, {APP_NAME} is only maintained by 1 person at the time of this being written,
                    and that person only knows English.
                </p>
                <p>
                    Note that in the future, we might provide a way for you to help us translate LibreKitten.
                </p>
            </section>
            <section>
                <h2>You</h2>
                <p>
                    <p>
                        Most importantly of all, <em>you!</em> Thank you for using LibreKitten, or at least giving it a
                        try. We appreciate that.
                    </p>
                </p>
            </section>
            <section>
                <p>
                    <img
                        src={librekitty}
                        alt="The Librekitty (ginger ailuromorphic/cat-shaped being) purring with a love heart."
                    />
                </p>
                <i>The  Librekitty purring from your usage of LibreKitten.</i>
                <p>- The Librekitty.</p>
            </section>
            <Footer />
        </main>
    </>
);

render(<Credits />);
