import { InfoCircleFilled } from '@ant-design/icons';
import { Card, Spin, Tooltip, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { FormattedMessage, useIntl } from "react-intl";
import { useHistory } from "react-router-dom";
import '../../App.scss';
import errorIconSmall from '../../assets/img/icon-error.png';
import bodyBlackMedium from '../../assets/img/img-ptwin-bodyoutline-128-black.png';
import bodyWhiteMedium from '../../assets/img/img-ptwin-bodyoutline-128-white.png';
import bodyBlackLarge from '../../assets/img/img-ptwin-bodyoutline-180-black.png';
import bodyWhiteLarge from '../../assets/img/img-ptwin-bodyoutline-180-white.png';
import errorIconMedium from '../../assets/img/ptwin-icon-64.png';
import errorIconLarge from '../../assets/img/ptwin-icon-96.png';
import { Colors } from '../../util/Colors';
import { StoreContext } from '../Store/Store';
import './Bed.scss';
import { BodyStyle, getBoxEventDisplay } from './BoxEventDisplay';
import { BoxEventType, BoxEventValue } from './BoxEvents';
import { ALarge, AMedium, BedSize, DisplayConfig } from './displayConstants';
import SensorDisplay from './SensorDisplay';
import Timer from './Timer';
import Messages from '../../Messages';

const warningImageMap = {
    [BedSize.Large]: errorIconLarge,
    [BedSize.Medium]: errorIconMedium,
    [BedSize.Small]: errorIconSmall,
}

const bodyImageMap = {
    [BedSize.Large]: {
        [BodyStyle.White]: <img src={bodyWhiteLarge} width={ALarge} alt="body" />,
        [BodyStyle.Black]: <img src={bodyBlackLarge} width={ALarge} alt="body" />,
    },
    [BedSize.Medium]: {
        [BodyStyle.White]: <img src={bodyWhiteMedium} width={AMedium} alt="body" />,
        [BodyStyle.Black]: <img src={bodyBlackMedium} width={AMedium} alt="body" />,
    },
    [BedSize.Small]: {
        [BodyStyle.White]: <img src={bodyWhiteMedium} width={110} alt="body" />,
        [BodyStyle.Black]: <img src={bodyBlackMedium} width={110} alt="body" />,
    },
}

function Bed({ boxEvent, currentPressure, showRaw, size, isBoxesLoading }) {
    const intl = useIntl();
    const history = useHistory();
    const [store, dispatch] = useContext(StoreContext);
    const display = getBoxEventDisplay({
        boxEvent,
        intl,
        controlBoxIdToBox: store.controlBoxIdToBox,
        controlBoxIdToSettings: store.controlBoxIdToSettings
    });

    const onClick = () => {
        if (store.permissions.includes('patient_detail')) {
            history.push(`/patient/${boxEvent.patientId}`);
        } else {
            Modal.info({
                title: intl.formatMessage(Messages.Text_Common_NotRole),
                content: (
                    <div>
                        <p>
                            {intl.formatMessage(Messages.Text_ErrorMessage_E021)}
                        </p>
                    </div>
                ),
                onOk() { },
            });
        }
    };

    const cfg = DisplayConfig[size];
    let rawTable = null;
    if (currentPressure && showRaw) {
        rawTable = <SensorDisplay
            currentPressure={currentPressure}
            size={size}
            zeroPressureDark={display.zeroPressureDark} />
    }

    return (
        <Card
            className="bed-card"
            style={{
                height: cfg.height,
                width: cfg.width,
                margin: cfg.padding,
                background: display.bgColor,
                textAlign: 'center',
                cursor: 'pointer',
                border: `2px solid ${display.outerBorderColor}`,
                boxShadow: `inset 0 0 3px ${display.innerBorderColor}, inset 0 0 3px ${display.innerBorderColor}, inset 0 0 3px ${display.innerBorderColor} ${display.outerShadow}`
            }}
            onClick={onClick} >
            <div style={{ position: 'relative' }}>
                <div className="limit-label-width" style={{ position: 'absolute', top: cfg.bedIdTop, color: display.titleTextColor, fontSize: cfg.bedIdFontSize }}>
                    {isBoxesLoading ? <Spin size="small" /> : display.titleText}
                </div>
                <div className="limit-label-width" style={{ position: 'absolute', top: cfg.eveneNameTop, color: display.eventTextColor, fontSize: cfg.eventNameFontSize }}>
                    {display.eventText}
                </div>
                {display.warningText ? (
                    <div className="bed-overlay">
                        <div style={{ position: 'absolute', top: cfg.warningMarginTop, margin: 'auto', width: '100%' }}>
                            <div >
                                <img src={warningImageMap[size]} alt="error" />
                            </div>
                            <div style={{ color: display.warningTextColor }}>
                                {display.warningText}
                            </div>
                        </div>
                    </div>
                ) : null}
                <div className="bed-overlay">
                    <div style={{ position: 'absolute', top: cfg.tableTop, left: cfg.tableLeft }}>
                        {display.warningText === null ? rawTable : null}
                    </div>
                </div>
                <div className="bed-overlay">
                    <div style={{ position: 'absolute', top: cfg.bodyTop, left: cfg.bodyLeft }}>
                        {bodyImageMap[size][display.bodyStyle]}
                    </div>
                </div>
                {display.timer ? (
                    <div className="bed-overlay timer-overlay" >
                        <div style={{ position: 'absolute', top: cfg.timerTop, width: cfg.timerWidth, fontSize: cfg.timerFontSize }}>
                            <div style={{ background: display.timerBoxColor }}>
                                <Timer startTime={display.timerStartOverride ? display.timerStartOverride : boxEvent.Time} />
                            </div>
                        </div>
                    </div>
                ) : null}
                {display.exclamationShow ? (
                    <div className="bed-overlay">
                        <div style={{ position: 'absolute', top: cfg.exclamationTop, right: cfg.exclamationRight, fontSize: cfg.exclamationFont }}>
                            <Tooltip title={display.exclamationAlert}>
                                <span style={{ color: display.exclamationLight ? Colors.White : Colors.Gray }}>
                                    <InfoCircleFilled />
                                </span>
                            </Tooltip>
                        </div>
                    </div>
                ) : null}
            </div>
        </Card>
    );
}

Bed.propTypes = {
    boxEvent: PropTypes.shape({
        class: PropTypes.string.isRequired,
        type: PropTypes.oneOf(Object.values(BoxEventType)).isRequired,
        value: PropTypes.oneOf(Object.values(BoxEventValue)).isRequired,
        boxId: PropTypes.string.isRequired,
        patientId: PropTypes.string.isRequired,
        time: PropTypes.string,
    }).isRequired,
    currentPressure: PropTypes.array,
    showRaw: PropTypes.bool,
    size: PropTypes.oneOf([BedSize.Large, BedSize.Medium, BedSize.Small]).isRequired,
    isBoxesLoading: PropTypes.bool,
};

export default Bed;

