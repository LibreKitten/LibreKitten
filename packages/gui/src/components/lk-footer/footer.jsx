/**
 * Copyright (C) 2021 Thomas Weber
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */


import React from 'react';
import { APP_NAME } from '../../lib/brand.js';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';

import styles from './footer.css';

const hardRefresh = () => {
    var search = location.search.replace(/[?&]nocache=\d+/, '');
    location.replace(location.pathname + search + (search ? '&' : '?') + 'nocache=' + Math.floor(Math.random() * 100000));
}

const eraseData = async () => {
    if (confirm('Please be aware that this will reset all your local data, including the Restore Points and backpack. Are you sure you want to continue?')) {
        ;
        localStorage.clear();
        // We have to manually delete the databases due to Firefox not supporting indexedDB.databases(). WHYYYY???
        indexedDB.deleteDatabase('TW_RestorePoints');
        indexedDB.deleteDatabase('TW_Backpack');
        location.reload();
    }
}

const Footer = () => (
    <footer className={styles.footer}>
        <div className={styles.footerContent}>
            <div className={styles.footerText}>
                <FormattedMessage
                    // eslint-disable-next-line max-len
                    defaultMessage="{APP_NAME} is not affiliated with TurboWarp, GarboMuffin, Scratch, the Scratch Team, or the Scratch Foundation."
                    description="Disclaimer that LibreKitten is not connected to Scratch"
                    id="tw.footer.disclaimer"
                    values={{
                        APP_NAME
                    }}
                />
            </div>

            <div className={styles.footerText}>
                <FormattedMessage
                    defaultMessage="Scratch is a project of the Scratch Foundation. It is available for free at {scratchDotOrg}."
                    description="A disclaimer that Scratch requires when referring to Scratch. {scratchDotOrg} is a link with text 'https://scratch.org/'"
                    id="tw.footer.scratchDisclaimer"
                    values={{
                        scratchDotOrg: (
                            <a
                                href="https://scratch.org/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                {'https://scratch.org/'}
                            </a>
                        )
                    }}
                />
            </div>

            <div className={styles.footerColumns}>
                <div className={styles.footerSection}>
                    <a href="credits.html">
                        <FormattedMessage
                            defaultMessage="Credits"
                            description="Credits link in footer"
                            id="tw.footer.credits"
                        />
                    </a>
                    <a /* </div>href="https://github.com/sponsors/GarboMuffin" */ style={{ cursor: 'not-allowed' }} title="Not available (yet)">
                        <FormattedMessage
                            defaultMessage="Donate"
                            description="Donation link in footer"
                            id="tw.footer.donate"
                        />
                    </a>
                </div>
                <div className={styles.footerSection}>
                    <a href="https://desktop.turbowarp.org/">
                        {/* Do not translate */}
                        {'TurboWarp Desktop'}
                    </a>
                    <a href="https://packager.turbowarp.org/">
                        {/* Do not translate */}
                        {'TurboWarp Packager'}
                    </a>
                    <a href="https://docs.turbowarp.org/embedding">
                        <FormattedMessage
                            defaultMessage="Embedding"
                            description="Link in footer to embedding documentation for embedding link"
                            id="tw.footer.embed"
                        />
                    </a>
                    <a href="https://docs.turbowarp.org/url-parameters">
                        <FormattedMessage
                            defaultMessage="URL Parameters"
                            description="Link in footer to URL parameters documentation"
                            id="tw.footer.parameters"
                        />
                    </a>
                    <a href="https://docs.turbowarp.org/">
                        <FormattedMessage
                            defaultMessage="Documentation"
                            description="Link in footer to additional documentation"
                            id="tw.footer.documentation"
                        />
                    </a>
                </div>
                <div className={styles.footerSection}>
                    <a href="https://scratch.mit.edu/discuss/topic/772797/">
                        <FormattedMessage
                            defaultMessage="Forum Topic"
                            description="Link to forum topic"
                            id="lk.topic"
                        />
                    </a>
                    <a href="https://codeberg.org/LibreKitten/">
                        <FormattedMessage
                            defaultMessage="Source Code"
                            description="Link to source code"
                            id="tw.code"
                        />
                    </a>
                    <a href="privacy.html">
                        <FormattedMessage
                            defaultMessage="Privacy Policy"
                            description="Link to privacy policy"
                            id="tw.privacy"
                        />
                    </a>
                </div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <p>
                    <strong>
                        <em>Pspspsps! </em>
                    </strong>
                    <FormattedMessage
                        defaultMessage="Like {appName}? Want to promote it? Add this badge to your website/forum signature/software forge profile. It would help build a community around {appName}!"
                        description="A message that if they like {appName}, to promote it."
                        id="lk.footer.badge"
                        values={{
                            appName: APP_NAME
                        }}
                    />
                </p>
                <p><a href="https://librekitten.org/"><img alt="LibreKitten - Code in blocks seriously" src="https://u.cubeupload.com/gl12/LibreKittenBadge.png" /></a></p>
                <p><em>HTML</em></p>
                <textarea contentEditable={false} value={'<a href="https://librekitten.org/"><img alt="LibreKitten - Code in blocks seriously" src="https://u.cubeupload.com/gl12/LibreKittenBadge.png"/></a>'}></textarea>
                <p><em>BBCode</em></p>
                <textarea contentEditable={false} value={'[url=https://librekitten.org/][img]https://u.cubeupload.com/gl12/LibreKittenBadge.png[/img][/url]'}></textarea>
                <p><em>Markdown</em></p>
                <textarea contentEditable={false} value={'[![LibreKitten - Code in blocks seriously](https://u.cubeupload.com/gl12/LibreKittenBadge.png)](https://librekitten.org/)'}></textarea>
            </div>

            <p>Version: {process.env.npm_package_version} | <a onClick={eraseData} style={{ color: 'red' }}>Erase data</a></p>
        </div>
    </footer>
);

export default Footer;
