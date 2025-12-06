import {defineMessages, FormattedMessage, intlShape, injectIntl} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import bindAll from 'lodash.bindall';
import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';
import FancyCheckbox from '../tw-fancy-checkbox/checkbox.jsx';
import ToggleButtons from '../toggle-buttons/toggle-buttons.jsx';
import Input from '../forms/input.jsx';
import BufferedInputHOC from '../forms/buffered-input-hoc.jsx';
import DocumentationLink from '../tw-documentation-link/documentation-link.jsx';
import styles from './settings-modal.css';
import helpIcon from './help-icon.svg';
import {APP_NAME} from '../../lib/brand.js';

/* eslint-disable react/no-multi-comp */

const BufferedInput = BufferedInputHOC(Input);

const messages = defineMessages({
    title: {
        defaultMessage: 'Project Settings',
        description: 'Title of settings modal',
        id: 'lk.settingsModal.title'
    },
    help: {
        defaultMessage: 'Click for help',
        description: 'Hover text of help icon in settings',
        id: 'tw.settingsModal.help'
    },
    fpsDynamic: {
        defaultMessage: 'Dynamic',
        description: 'The dynamic mode for the framerate',
        id: 'lk.settingsModal.fpsDynamic'
    },
    fpsCapped: {
        defaultMessage: 'Capped',
        description: 'The capped mode for the framerate',
        id: 'lk.settingsModal.fpsCapped'
    }
});

const LearnMore = props => (
    <React.Fragment>
        {' '}
        <DocumentationLink {...props}>
            <FormattedMessage
                defaultMessage="Learn more."
                id="gui.alerts.cloudInfoLearnMore"
            />
        </DocumentationLink>
    </React.Fragment>
);

class UnwrappedSetting extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClickHelp'
        ]);
        this.state = {
            helpVisible: false
        };
    }
    componentDidUpdate (prevProps) {
        if (this.props.active && !prevProps.active) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                helpVisible: true
            });
        }
    }
    handleClickHelp () {
        this.setState(prevState => ({
            helpVisible: !prevState.helpVisible
        }));
    }
    render () {
        return (
            <div
                className={classNames(styles.setting, {
                    [styles.active]: this.props.active
                })}
            >
                <div className={styles.label}>
                    {this.props.primary}
                    <button
                        className={styles.helpIcon}
                        onClick={this.handleClickHelp}
                        title={this.props.intl.formatMessage(messages.help)}
                    >
                        <img
                            src={helpIcon}
                            draggable={false}
                        />
                    </button>
                </div>
                {this.state.helpVisible && (
                    <div className={styles.detail}>
                        {this.props.help}
                        {this.props.slug && <LearnMore slug={this.props.slug} />}
                    </div>
                )}
                {this.props.secondary}
            </div>
        );
    }
}
UnwrappedSetting.propTypes = {
    intl: intlShape,
    active: PropTypes.bool,
    help: PropTypes.node,
    primary: PropTypes.node,
    secondary: PropTypes.node,
    slug: PropTypes.string
};
const Setting = injectIntl(UnwrappedSetting);

const BooleanSetting = ({value, onChange, label, ...props}) => (
    <Setting
        {...props}
        active={value}
        primary={
            <label className={styles.label}>
                <FancyCheckbox
                    className={styles.checkbox}
                    checked={value}
                    onChange={onChange}
                />
                {label}
            </label>
        }
    />
);
BooleanSetting.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.bool.isRequired,
    label: PropTypes.node.isRequired
};

// lk: Added toggle-based settings.
const ToggleSetting = ({buttons, selectedOption, label, extraInputs, ...props}) => (
    <Setting
        {...props}
        primary={
            <label className={styles.label}>
                {label}
                <ToggleButtons
                    buttons={buttons.map((button, index) => ({
                        ...button,
                        isSelected: selectedOption === index
                    }))}
                    className={styles.toggle}
                />
                {extraInputs}
            </label>
        }
    />
);
ToggleSetting.propTypes = {
    buttons: PropTypes.arrayOf(PropTypes.shape({
        children: PropTypes.element,
        title: PropTypes.string.isRequired,
        handleClick: PropTypes.func.isRequired,
        icon: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        iconClassName: PropTypes.string,
        isSelected: PropTypes.bool
    })),
    selectedOption: PropTypes.number.isRequired,
    label: PropTypes.node.isRequired,
    extraInputs: PropTypes.element
};

const HighQualityPen = props => (
    <BooleanSetting
        {...props}
        label={
            <FormattedMessage
                defaultMessage="High Quality Pen"
                description="High quality pen setting"
                id="tw.settingsModal.highQualityPen"
            />
        }
        help={
            <FormattedMessage
                // eslint-disable-next-line max-len
                defaultMessage="Allows pen projects to render at higher resolutions and disables some coordinate rounding in the editor. Not all projects benefit from this setting and it may impact performance."
                description="High quality pen setting help"
                id="tw.settingsModal.highQualityPenHelp"
            />
        }
        slug="high-quality-pen"
    />
);

const CustomFPS = props => (
    <ToggleSetting
        active={false}
        buttons={[
            {
                children: (
                    <FormattedMessage
                        {...messages.fpsDynamic}
                    />
                ),
                handleClick: () => props.onSetFramerate(0),
                title: props.intl.formatMessage(messages.fpsDynamic)
            },
            {
                children: (
                    <FormattedMessage
                        {...messages.fpsCapped}
                    />
                ),
                handleClick: () => props.onSetFramerate(60),
                title: props.intl.formatMessage(messages.fpsCapped)
            }
        ]}
        selectedOption={props.framerate === 0 ? 0 : 1}
        label={
            <FormattedMessage
                defaultMessage="Framerate:"
                description="Framerate setting"
                id="lk.settingsModal.fps"
            />
        }
        extraInputs={
            props.framerate !== 0 && (
                <BufferedInput
                    value={props.framerate}
                    onSubmit={props.onSetFramerate}
                    className={styles.fpsInput}
                    type="number"
                    min="0"
                    max="250"
                    step="1"
                />
            )
        }
        help={
            <FormattedMessage
                // eslint-disable-next-line max-len
                defaultMessage={"Runs scripts either at the monitor's refresh rate (when the mode is set to Dynamic), or capped to a specific max framerate (when the mode is set to Capped). Some legacy projects (or most Scratch projects) may not work properly without the framerate capped to a specific number. It is 30 FPS in the case of Scratch (or LibreKitten before 0.10.0 due to a bug). You should either adapt the project to use the \"delta time\" block, use Interpolation, or keep the FPS at 30."}
                description="FPS setting help"
                id="lk.settingsModal.fpsHelp"
            />
        }
        slug="custom-fps"
    />
);
CustomFPS.propTypes = {
    intl: intlShape,
    framerate: PropTypes.number,
    onSetFramerate: PropTypes.func
};

const Interpolation = props => (
    <BooleanSetting
        {...props}
        label={
            <FormattedMessage
                defaultMessage="Interpolation"
                description="Interpolation setting"
                id="tw.settingsModal.interpolation"
            />
        }
        help={
            <FormattedMessage
                // eslint-disable-next-line max-len
                defaultMessage="Makes projects appear smoother by interpolating sprite motion. Interpolation should not be used on 3D projects, raytracers, pen projects, and laggy projects as interpolation will make them run slower without making them appear smoother."
                description="Interpolation setting help"
                id="tw.settingsModal.interpolationHelp"
            />
        }
        slug="interpolation"
    />
);

const InfiniteClones = props => (
    <BooleanSetting
        {...props}
        label={
            <FormattedMessage
                defaultMessage="Infinite Clones"
                description="Infinite Clones setting"
                id="tw.settingsModal.infiniteClones"
            />
        }
        help={
            <FormattedMessage
                defaultMessage="Disables Scratch's 300 clone limit."
                description="Infinite Clones setting help"
                id="tw.settingsModal.infiniteClonesHelp"
            />
        }
        slug="infinite-clones"
    />
);

const Fencing = props => (
    <BooleanSetting
        {...props}
        label={
            <FormattedMessage
                defaultMessage="Fence Sprites"
                description="Fence Sprites setting"
                id="lk.settingsModal.fencing"
            />
        }
        help={
            <FormattedMessage
                // eslint-disable-next-line max-len
                defaultMessage="Stops sprites from moving fully offscreen, becoming too large or small, and stops touching blocks from sensing offscreen. Useful for compatibility with Scratch projects."
                description="Fence Sprites setting help"
                id="lk.settingsModal.fencingHelp"
            />
        }
        slug="fencing"
    />
);

const MiscLimits = props => (
    <BooleanSetting
        {...props}
        label={
            <FormattedMessage
                defaultMessage="Restore Miscellaneous Limits"
                description="Restore Miscellaneous Limits setting, for compatibility"
                id="lk.settingsModal.miscLimits"
            />
        }
        help={
            <FormattedMessage
                // eslint-disable-next-line max-len
                defaultMessage="Adds back sound effect limits and pen size limits. Useful for compatibility with Scratch projects."
                description="Restore Miscellaneous Limits setting help"
                id="lk.settingsModal.miscLimitsHelp"
            />
        }
        slug="misc-limits"
    />
);

const WarpTimer = props => (
    <BooleanSetting
        {...props}
        label={
            <FormattedMessage
                defaultMessage="Warp Timer"
                description="Warp Timer setting"
                id="tw.settingsModal.warpTimer"
            />
        }
        help={
            <FormattedMessage
                // eslint-disable-next-line max-len
                defaultMessage="Makes scripts check if they are stuck in a long or infinite loop and run at a low framerate instead of getting stuck until the loop finishes. This fixes most crashes but has a significant performance impact, so it's only enabled by default in the editor."
                description="Warp Timer help"
                id="tw.settingsModal.warpTimerHelp"
            />
        }
        slug="warp-timer"
    />
);

const DisableCompiler = props => (
    <BooleanSetting
        {...props}
        label={
            <FormattedMessage
                defaultMessage="Disable Compiler"
                description="Disable Compiler setting"
                id="tw.settingsModal.disableCompiler"
            />
        }
        help={
            <FormattedMessage
                // eslint-disable-next-line max-len
                defaultMessage="Disables the {APP_NAME} compiler. You may want to enable this while editing projects so that scripts update immediately. Otherwise, you should never enable this."
                description="Disable Compiler help"
                id="tw.settingsModal.disableCompilerHelp"
                values={{
                    APP_NAME
                }}
            />
        }
        slug="disable-compiler"
    />
);

const CustomStageSize = ({
    customStageSizeEnabled,
    stageWidth,
    onStageWidthChange,
    stageHeight,
    onStageHeightChange
}) => (
    <Setting
        active={customStageSizeEnabled}
        primary={(
            <div className={classNames(styles.label, styles.customStageSize)}>
                <FormattedMessage
                    defaultMessage="Custom Stage Size:"
                    description="Custom Stage Size option"
                    id="tw.settingsModal.customStageSize"
                />
                <BufferedInput
                    value={stageWidth}
                    onSubmit={onStageWidthChange}
                    className={styles.customStageSizeInput}
                    type="number"
                    min="0"
                    max="1024"
                    step="1"
                />
                <span>{'×'}</span>
                <BufferedInput
                    value={stageHeight}
                    onSubmit={onStageHeightChange}
                    className={styles.customStageSizeInput}
                    type="number"
                    min="0"
                    max="1024"
                    step="1"
                />
            </div>
        )}
        secondary={
            (stageWidth >= 1000 || stageHeight >= 1000) && (
                <div className={styles.warning}>
                    <FormattedMessage
                        // eslint-disable-next-line max-len
                        defaultMessage="Using a custom stage size this large is not recommended! Instead, use a lower size with the same aspect ratio and let fullscreen mode upscale it to match the user's display."
                        description="Warning about using stages that are too large in settings modal"
                        id="tw.settingsModal.largeStageWarning"
                    />
                    <LearnMore slug="custom-stage-size" />
                </div>
            )
        }
        help={(
            <FormattedMessage
                // eslint-disable-next-line max-len
                defaultMessage="Changes the size of the Scratch stage from 480x360 to something else. Try 640x360 to make the stage widescreen. Very few projects will handle this properly."
                description="Custom Stage Size option"
                id="tw.settingsModal.customStageSizeHelp"
            />
        )}
        slug="custom-stage-size"
    />
);
CustomStageSize.propTypes = {
    customStageSizeEnabled: PropTypes.bool,
    stageWidth: PropTypes.number,
    onStageWidthChange: PropTypes.func,
    stageHeight: PropTypes.number,
    onStageHeightChange: PropTypes.func
};

const StoreProjectOptions = ({onStoreProjectOptions}) => (
    <div className={styles.setting}>
        <div>
            <button
                onClick={onStoreProjectOptions}
                className={styles.button}
            >
                <FormattedMessage
                    defaultMessage="Store settings in project"
                    description="Button in settings modal"
                    id="tw.settingsModal.storeProjectOptions"
                />
            </button>
            <p>
                <FormattedMessage
                    // eslint-disable-next-line max-len
                    defaultMessage="Stores the selected settings in the project so they will be automatically applied when LibreKitten loads this project. Warp timer and disable compiler will not be saved."
                    description="Help text for the store settings in project button"
                    id="tw.settingsModal.storeProjectOptionsHelp"
                />
            </p>
        </div>
    </div>
);
StoreProjectOptions.propTypes = {
    onStoreProjectOptions: PropTypes.func
};

const Header = props => (
    <div className={styles.header}>
        {props.children}
        <div className={styles.divider} />
    </div>
);
Header.propTypes = {
    children: PropTypes.node
};

const SettingsModalComponent = props => (
    <Modal
        className={styles.modalContent}
        onRequestClose={props.onClose}
        contentLabel={props.intl.formatMessage(messages.title)}
        id="settingsModal"
    >
        <Box className={styles.body}>
            <Header>
                <FormattedMessage
                    defaultMessage="Featured"
                    description="Settings modal section"
                    id="tw.settingsModal.featured"
                />
            </Header>
            <CustomFPS
                intl={props.intl}
                framerate={props.framerate}
                onChange={props.onFramerateChange}
                onSetFramerate={props.onSetFramerate}
            />
            <Interpolation
                value={props.interpolation}
                onChange={props.onInterpolationChange}
            />
            <HighQualityPen
                value={props.highQualityPen}
                onChange={props.onHighQualityPenChange}
            />
            <WarpTimer
                value={props.warpTimer}
                onChange={props.onWarpTimerChange}
            />
            <Header>
                <FormattedMessage
                    defaultMessage="Remove Limits"
                    description="Settings modal section"
                    id="tw.settingsModal.removeLimits"
                />
            </Header>
            <InfiniteClones
                value={props.infiniteClones}
                onChange={props.onInfiniteClonesChange}
            />
            <Header>
                <FormattedMessage
                    defaultMessage="Compatibility"
                    description="Settings modal section"
                    id="lk.settingsModal.compat"
                />
            </Header>
            <Fencing
                value={props.fencing}
                onChange={props.onFencingChange}
            />
            <MiscLimits
                value={props.restoreLimits}
                onChange={props.onRestoreLimitsChange}
            />
            <Header>
                <FormattedMessage
                    defaultMessage="Danger Zone"
                    description="Settings modal section"
                    id="tw.settingsModal.dangerZone"
                />
            </Header>
            {!props.isEmbedded && (
                <CustomStageSize
                    {...props}
                />
            )}
            <DisableCompiler
                value={props.disableCompiler}
                onChange={props.onDisableCompilerChange}
            />
            {!props.isEmbedded && (
                <StoreProjectOptions
                    {...props}
                />
            )}
        </Box>
    </Modal>
);

SettingsModalComponent.propTypes = {
    intl: intlShape,
    onClose: PropTypes.func,
    isEmbedded: PropTypes.bool,
    framerate: PropTypes.number,
    onFramerateChange: PropTypes.func,
    onSetFramerate: PropTypes.func,
    highQualityPen: PropTypes.bool,
    onHighQualityPenChange: PropTypes.func,
    interpolation: PropTypes.bool,
    onInterpolationChange: PropTypes.func,
    infiniteClones: PropTypes.bool,
    onInfiniteClonesChange: PropTypes.func,
    fencing: PropTypes.bool,
    onFencingChange: PropTypes.func,
    restoreLimits: PropTypes.bool,
    onRestoreLimitsChange: PropTypes.func,
    warpTimer: PropTypes.bool,
    onWarpTimerChange: PropTypes.func,
    disableCompiler: PropTypes.bool,
    onDisableCompilerChange: PropTypes.func
};

export default injectIntl(SettingsModalComponent);
