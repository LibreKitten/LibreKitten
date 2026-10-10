import React from 'react';
import PropTypes from 'prop-types';
import render from '../app-target';
import styles from '../../css/info-page.css';
import myStyles from './credits.css';

import 'modern-normalize/modern-normalize.css';
import '../load-fonts.css';

import {APP_NAME} from '../../lib/brand';
import {applyGuiColors} from '../../lib/themes/guiHelpers';
import {detectTheme} from '../../lib/themes/themePersistance';
import UserData from './users';
import Header from '../../components/lk-header/header.jsx';
import Footer from '../../components/lk-footer/footer.jsx';

import librekitty from './assets/purring-librekitty-with-love-heart.svg';

/* eslint-disable react/jsx-no-literals */

applyGuiColors(detectTheme());
document.documentElement.lang = 'en';

const User = ({image, text, href}) => (
    <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={myStyles.user}
    >
        <img
            loading="lazy"
            className={myStyles.userImage}
            src={image}
            width="60"
            height="60"
        />
        <div className={myStyles.userInfo}>
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
    <div className={myStyles.users}>
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
                    The {APP_NAME} project is made possible by TurboWarp and Scratch, and our contributors.
                </p>
            </header>
            <section>
                <i>Individual contributors are listed in no particular order. The order is randomized each visit.</i>
                <h2>Some Thanks</h2>
                <p>
                    We would like to thank our contributors, and other things here.
                </p>
                <p>
                    To people who contributed to {APP_NAME}, we also thank you for putting your time
                    to helping improve our project and furthering the future of blocks. We are truly
                    grateful for your help!
                </p>
                <p>
                    To TurboWarp and Scratch, thank you! Without them, programming would
                    have been less accessible to people, and less people would of been introduced to
                    the magic art of programming.
                </p>
                <p>
                    We also thank the people of the various work we have adapted as well. Many things
                    in {APP_NAME} would of not been realised without them.
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
            </section>
            <section>
                <h2>Scratch</h2>
                <p>
                    {APP_NAME} and TurboWarp are based on the work of the <a href="https://scratch.mit.edu/credits">Scratch contributors</a> but
                    are not endorsed by Scratch in any way.
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
                <h2>Contributors for {APP_NAME}</h2>
                <UserList users={UserData.contributors} />
            </section>
            <section>
                <h2>Other Programming Languages</h2>
                <p>
                    We have adapted some code or were inspired by code from other Scratch and TurboWarp derivatives.
                    We are not necessarily affiliated with them, except for ones involved in the Block Programming
                    Development Community.
                </p>
                <UserList users={UserData.mods} />
            </section>
            <section>
                <h2>Addons</h2>
                <p>
                    This is a list of people who created addons for Scratch or TurboWarp. They are not necessarily
                    affiliated or involved with us, and neither are we necessarily affiliated with them.
                </p>
                <UserList users={UserData.addonDevelopers} />
            </section>
            <section>
                <h2>TurboWarp Extension Gallery</h2>
                <p>
                    This is a list of people who submitted extensions to the extension gallery for TurboWarp. They are
                    not necessarily affiliated or involved with us, and neither are we necessarily affiliated with them
                    or TurboWarp.
                </p>
                <UserList users={UserData.extensionDevelopers} />
            </section>
            <section>
                <h2>Translators</h2>
                <p>
                    {APP_NAME} currently has no translators. In the future, we might provide a way for you to help us
                    translate {APP_NAME}.
                </p>
            </section>
            <section>
                <h2>You!</h2>
                <p>
                    And of course, <em>you!</em> Thank you for using {APP_NAME}, or at least giving it a try. We really
                    appreciate it. ฅ^•ﻌ•^ฅ
                </p>
            </section>
            <section>
                {/* You may want to change or remove this if you're forking LibreKitten. */}
                <p>
                    <img
                        src={librekitty}
                        alt="The Librekitty (who looks visually like a ginger cat) purring with a love heart."
                        height={275}
                    />
                </p>
                <i>The Librekitty purring from your usage of LibreKitten.</i>
                <p>- The Librekitty.</p>
            </section>
            <Footer />
        </main>
    </>
);

render(<Credits />);
