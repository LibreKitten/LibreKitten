import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';
import Box from '../box/box.jsx';
import Button from '../button/button.jsx';
import {defineMessages, injectIntl, intlShape, FormattedMessage} from 'react-intl';
import {APP_NAME} from '../../lib/brand.js';

import styles from './welcome-modal.css';
import librekittyWaving from './librekitty-waving.svg';

const messages = defineMessages({
    welcome: {
        id: 'lk.welcomeModal.label',
        defaultMessage: 'Welcome to {APP_NAME}!',
        description: '',
        values: {
            APP_NAME
        }
    }
});

const WelcomeModalComponent = ({intl, ...props}) => {
    const title = messages.welcome;
    return (
        <ReactModal
            isOpen
            className={styles.modalContent}
            contentLabel={intl.formatMessage(title)}
            overlayClassName={styles.modalOverlay}
            onRequestClose={props.onClose}
        >
            <div dir={props.isRtl ? 'rtl' : 'ltr'} >
                <Box className={styles.illustration}>
                    <img
                        // eslint-disable-next-line max-len
                        alt="The Librekitty (orange cat-like being, in his humanoid form in this illustration) waving at you with a joyful expression."
                        src={librekittyWaving}
                        draggable={false}
                    />
                </Box>

                <Box className={styles.body}>
                    <h2 className={styles.title}>
                        <FormattedMessage {...title} />
                    </h2>

                    {/* eslint-disable max-len */}

                    <>
                        <p>
                            <FormattedMessage
                                defaultMessage="{APP_NAME} is an alpha-quality block-based visual programming language based on TurboWarp. The primary feature is being able to function as a web server, but it is also an experimentation ground to push the limits of block-based languages."
                                description="An explanation about the app."
                                id="lk.welcomeModal.about"
                                values={{
                                    APP_NAME
                                }}
                            />
                        </p>
                        <p>
                            <FormattedMessage
                                defaultMessage="{APP_NAME} is in alpha — so features are subject to change, and there may be bugs. Please report bugs using the feedback link at the top of the page."
                                description="A standard &quot;we're in alpha, stuff may change, and report any bugs&quot; message."
                                id="lk.welcomeModal.hereBeDragons"
                                values={{
                                    APP_NAME
                                }}
                            />
                        </p>
                        <p>
                            <FormattedMessage
                                defaultMessage="We hope you like {APP_NAME}. Enjoy! — Librekitty"
                                description="A &quot;we hope you like this&quot; message and a signature from our mascot, Librekitty."
                                id="lk.welcomeModal.enjoy"
                                values={{
                                    APP_NAME
                                }}
                            />
                        </p>
                    </>

                    {process.env.CANARY_MODE && (
                        <div className={styles.canaryWarning}>
                            <p>
                                <FormattedMessage
                                    // eslint-disable-next-line max-len
                                    defaultMessage="You are using the canary build of {APP_NAME}. Please do not write serious projects in the canary build. Features that you are using may be removed, your project may get corrupted, among other things that may happen."
                                    description="An obligatory &quot;don't use the unstable build in production&quot; warning."
                                    id="lk.welcomeModal.canaryBuild"
                                    values={{
                                        APP_NAME
                                    }}
                                />
                            </p>
                        </div>
                    )}

                    <div className={styles.buttonContainer}>
                        <Button
                            className={styles.button}
                            onClick={props.onClose}
                        >
                            <FormattedMessage
                                defaultMessage="OK"
                                description=""
                                id="lk.welcomeModal.close"
                            />
                        </Button>
                        {process.env.CANARY_MODE && (
                            <Button
                                className={styles.button}
                                onClick={props.onOpenStable}
                            >
                                <FormattedMessage
                                    defaultMessage="Open Stable {APP_NAME}"
                                    description="Opens the stable version of LibreKitten."
                                    id="lk.welcomeModal.openStable"
                                    values={{
                                        APP_NAME
                                    }}
                                />
                            </Button>
                        )}
                    </div>

                    <div className={styles.dontShowAgainArea}>
                        <input
                            type="checkbox"
                            ref={props.dontShowAgainRef}
                            id="dontShowAgain"
                        />
                        <label for="dontShowAgain">
                            <FormattedMessage
                                defaultMessage="Don't show again"
                                description=""
                                id="lk.welcomeModal.dontShowAgain"
                            />
                        </label>
                    </div>

                    {/* eslint-enable max-len */}
                </Box>
            </div>
        </ReactModal>
    );
};

WelcomeModalComponent.propTypes = {
    dontShowAgainRef: PropTypes.func,
    intl: intlShape.isRequired,
    isRtl: PropTypes.bool,
    onClose: PropTypes.func,
    onOpenStable: PropTypes.func
};

const WrappedWelcomeModalComponent = injectIntl(WelcomeModalComponent);

WrappedWelcomeModalComponent.setAppElement = ReactModal.setAppElement;

export default WrappedWelcomeModalComponent;
