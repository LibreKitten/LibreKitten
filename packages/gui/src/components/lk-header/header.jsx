import classNames from 'classnames';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {defineMessages, FormattedMessage, injectIntl, intlShape} from 'react-intl';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import bowser from 'bowser';
import React from 'react';

import Button from '../button/button.jsx';

import styles from './header.css';

import {APP_NAME} from '../../lib/brand.js';

const Header = () => (
    <div className={styles.header}>
        <div className={styles.mainGroup}>
            <a
                href="/"
                className={classNames(styles.headerItem, styles.hoverable)}
            >
                <div className={styles.logo} />
            </a>
            <a
                href="/editor.html"
                className={classNames(styles.headerItem, styles.hoverable)}
            >
                Create
            </a>
            <a
                href="/credits.html"
                className={classNames(styles.headerItem, styles.hoverable)}
            >
                Credits
            </a>
            <a
                href="/for-contributors.html"
                className={classNames(styles.headerItem, styles.hoverable)}
            >
                Contribute
            </a>
            <div className={styles.headerItem}>
                <a
                    className={styles.feedbackLink}
                    href="https://scratch.mit.edu/discuss/topic/772797/"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    {/* todo: icon */}
                    <Button className={styles.feedbackButton}>
                        <FormattedMessage
                            defaultMessage="{APP_NAME} forum topic (for feedback, help & more)"
                            description="Button to give feedback in the menu bar"
                            id="lk.forumTopic"
                            values={{
                                APP_NAME
                            }}
                        />
                    </Button>
                </a>
            </div>
        </div>
    </div>
);

export default Header;
