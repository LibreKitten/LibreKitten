import React from 'react';
import classNames from 'classnames';
import render from '../app-target.js';
import styles from '../../css/info-page.css';
import myStyles from './server-manual.css';

import 'modern-normalize/modern-normalize.css';
import '../load-fonts.css';

import {applyGuiColors} from '../../lib/themes/guiHelpers.js';
import {detectTheme} from '../../lib/themes/themePersistance.js';

import Header from '../../components/lk-header/header.jsx';
import Footer from '../../components/lk-footer/footer.jsx';

import serverExample from './server-example.png';

/* eslint-disable react/jsx-no-literals */

applyGuiColors(detectTheme());
document.documentElement.lang = 'en';

const ServerManual = () => (
    <>
        <Header />
        <main className={classNames(styles.main, myStyles.main)}>
            <header className={styles.headerContainer}>
                <h1 className={styles.headerText}>
                    How to Setup a LibreKitten Web Server
                </h1>
            </header>
            <section id="intro">
                <p>
                    Ever wanted to write a website or API with LibreKitten? Then you are very much in the right place!
                    We will show you how to do just that, right now.
                </p>
                <div className={myStyles.infobox}>
                    <p>
                        Note: The server has not been tested on Windows and may not work properly on there. You may want
                        to run the server
                        in <a href="https://learn.microsoft.com/en-us/windows/wsl/install">Windows Subsystem for Linux</a> if
                        you must use Windows.
                    </p>
                </div>
            </section>
            <section id="prerequisites">
                <h2>Prerequisites</h2>
                <p>
                    Firstly, if you haven&apos;t aready, <a href="https://nodejs.org/en/download">install Node.js.</a> If you can, you
                    should preferably use Node.js v22.x or later for LibreKitten.
                </p>
            </section>
            <section id="install">
                <h2>Download and Install</h2>
                <p>
                    From our <a href="https://codeberg.org/LibreKitten/LibreKitten/releases">downloads page (which is hosted by Codeberg)</a>,
                    download the latest file which has a name like <code>(version)-cli.tar.gz</code>, and expand it.
                </p>
            </section>
            <section id="run">
                <h2>Run the Server</h2>
                <p>
                    In the terminal,
                    run <code>
                        node
                        /path/to/the/unzipped/folder/librekitten.js
                        serve /path/to/your/Project.lb
                        8080
                    </code>.
                </p>
                <p>
                    If you want to be able to hot-swap projects while developing, you can append <code>--dev</code> to
                    the command. To update the project running on the server, press Edit &gt; Send to development
                    server.
                </p>
                <div className={classNames(myStyles.infobox, myStyles.danger)}>
                    <p>
                        Do NOT use the developer option on a server exposed to the public internet, as it has NO
                        authentication, which means a malicious person can change the project to ANYTHING they like,
                        and depending on what permissions you granted for the server — they can install malware,
                        encrypt your files, violate your server host&apos;s Acceptable Use Policy, among other bad
                        things they can do.
                    </p>
                </div>
            </section>
            <section id="build">
                <h2>Go Make Something!</h2>
                <p>Go on, build to your heart&apos;s desire! We&apos;ll provide an example to get you going:</p>
                <img
                    src={serverExample}
                    className={myStyles.serverExample}
                />
            </section>
            <section id="help">
                <h2>Need Help?</h2>
                <p>
                    You can always get help using the &ldquo;LibreKitten forum topic&rdquo; link at the top of the page.
                    After pressing the link, scroll down to the bottom and ask. (Note that you need to be signed into
                    Scratch.)
                </p>
            </section>
            <Footer />
        </main>
    </>
);

render(<ServerManual />);
