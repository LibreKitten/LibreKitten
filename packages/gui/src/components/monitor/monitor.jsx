import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import {FormattedMessage} from 'react-intl';
import {ContextMenu} from 'radix-ui';
import {BorderedMenuItem, StyledContextMenu, StyledMenuItem} from '../context-menu/context-menu.jsx';
import Box from '../box/box.jsx';
import DefaultMonitor from './default-monitor.jsx';
import LargeMonitor from './large-monitor.jsx';
import SliderMonitor from '../../containers/slider-monitor.jsx';
import ListMonitor from '../../containers/list-monitor.jsx';
import {Theme} from '../../lib/themes/index.js';

import styles from './monitor.css';

// Map category name to color name used in scratch-blocks Blockly.Colours
const categoryColorMap = {
    data: 'data',
    sensing: 'sensing',
    sound: 'sounds',
    looks: 'looks',
    motion: 'motion',
    list: 'data_lists',
    extension: 'pen'
};

const modes = {
    default: DefaultMonitor,
    large: LargeMonitor,
    slider: SliderMonitor,
    list: ListMonitor
};

const getCategoryColor = (theme, category) => {
    const colors = theme.getStageBlockColors();
    return {
        background: colors[categoryColorMap[category]].primary,
        text: colors.text
    };
};

const MonitorComponent = props => (
    <ContextMenu.Root>
        <ContextMenu.Trigger
            // TW: if export is defined, we always show it, even outside of the editor
            disable={!props.draggable && !props.onExport}
            holdToDisplay={props.mode === 'slider' ? -1 : 1000}
            id={`monitor-${props.id}`}
        >
            <Draggable
                bounds=".monitor-overlay" // Class for monitor container
                cancel=".no-drag" // Class used for slider input to prevent drag
                defaultClassNameDragging={styles.dragging}
                disabled={!props.draggable}
                onStop={props.onDragEnd}

                // https://github.com/TurboWarp/scratch-gui/issues/950
                enableUserSelectHack={false}
            >
                <Box
                    className={styles.monitorContainer}
                    componentRef={props.componentRef}
                    onDoubleClick={props.mode === 'list' || !props.draggable ? null : props.onNextMode}
                    data-id={props.id}
                    data-opcode={props.opcode}
                >
                    {React.createElement(modes[props.mode], {
                        categoryColor: getCategoryColor(props.theme, props.category),
                        ...props
                    })}
                </Box>
            </Draggable>
        </ContextMenu.Trigger>
        <ContextMenu.Portal>
            <StyledContextMenu id={`monitor-${props.id}`}>
                {props.draggable && props.onSetModeToDefault &&
                    <StyledMenuItem onClick={props.onSetModeToDefault}>
                        <FormattedMessage
                            defaultMessage="normal readout"
                            description="Menu item to switch to the default monitor"
                            id="gui.monitor.contextMenu.default"
                        />
                    </StyledMenuItem>}
                {props.draggable && props.onSetModeToLarge &&
                    <StyledMenuItem onClick={props.onSetModeToLarge}>
                        <FormattedMessage
                            defaultMessage="large readout"
                            description="Menu item to switch to the large monitor"
                            id="gui.monitor.contextMenu.large"
                        />
                    </StyledMenuItem>}
                {props.draggable && props.onSetModeToSlider &&
                    <StyledMenuItem onClick={props.onSetModeToSlider}>
                        <FormattedMessage
                            defaultMessage="slider"
                            description="Menu item to switch to the slider monitor"
                            id="gui.monitor.contextMenu.slider"
                        />
                    </StyledMenuItem>}
                {props.draggable && props.onSliderPromptOpen && props.mode === 'slider' &&
                    <BorderedMenuItem onClick={props.onSliderPromptOpen}>
                        <FormattedMessage
                            defaultMessage="change slider range"
                            description="Menu item to change the slider range"
                            id="gui.monitor.contextMenu.sliderRange"
                        />
                    </BorderedMenuItem>}
                {props.onImport &&
                    <StyledMenuItem onClick={props.onImport}>
                        <FormattedMessage
                            defaultMessage="import"
                            description="Menu item to import into list monitors"
                            id="gui.monitor.contextMenu.import"
                        />
                    </StyledMenuItem>}
                {props.onExport &&
                    <StyledMenuItem onClick={props.onExport}>
                        <FormattedMessage
                            defaultMessage="export"
                            description="Menu item to export from list monitors"
                            id="gui.monitor.contextMenu.export"
                        />
                    </StyledMenuItem>}
                {props.draggable && props.onHide &&
                    <BorderedMenuItem onClick={props.onHide}>
                        <FormattedMessage
                            defaultMessage="hide"
                            description="Menu item to hide the monitor"
                            id="gui.monitor.contextMenu.hide"
                        />
                    </BorderedMenuItem>}
            </StyledContextMenu>
        </ContextMenu.Portal>
    </ContextMenu.Root>
);

const monitorModes = Object.keys(modes);

MonitorComponent.propTypes = {
    category: PropTypes.oneOf(Object.keys(categoryColorMap)),
    componentRef: PropTypes.func.isRequired,
    draggable: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    mode: PropTypes.oneOf(monitorModes),
    opcode: PropTypes.string.isRequired,
    onDragEnd: PropTypes.func.isRequired,
    onExport: PropTypes.func,
    onImport: PropTypes.func,
    onHide: PropTypes.func,
    onNextMode: PropTypes.func.isRequired,
    onSetModeToDefault: PropTypes.func,
    onSetModeToLarge: PropTypes.func,
    onSetModeToSlider: PropTypes.func,
    onSliderPromptOpen: PropTypes.func,
    theme: PropTypes.instanceOf(Theme).isRequired
};

MonitorComponent.defaultProps = {
    category: 'extension',
    mode: 'default'
};

export {
    MonitorComponent as default,
    monitorModes
};
