import { SettingOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Grid, Popover, Row, Space } from "antd";
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import boxPairingIcon from '../../assets/img/icon-box.png';
import userAccountIcon from '../../assets/img/icon-usermgr.png';
import topbarBack from '../../assets/img/topbar-back.png';
import { SIDEBAR_WIDTH } from '../../layouts/ResponsiveLayout';
import Messages from "../../Messages";
import { StoreContext } from '../Store/Store';
import MoreMenu from "./MoreMenu";
import './TopBarMainMenu.scss';
import UserMenu from "./UserMenu";
import { useHistory } from "react-router-dom";

const { useBreakpoint } = Grid;

export const Current = {
    UserAccounts: 0,
    BoxPairing: 1,
    Settings: 2,
    UserProfile: 3,
};
if (Object.freeze) { Object.freeze(Current) };

function TopBarMainMenu({ title, titleSecond, showBack, isBackHistory, current, buttons }) {
    const intl = useIntl();
    const history = useHistory();
    const screens = useBreakpoint();
    const [store, dispatch] = useContext(StoreContext);
    const scStationId = store.scStation && store.scStation.scStationId ? store.scStation.scStationId : '';
    const [isPhoneFilterVisible, setIsPhoneFilterVisible] = useState(false);
    const isPhone = !screens.md;

    let buttonCol = (
        <Col className="buttonset">
            <Space size="large">
                {buttons}
            </Space>
        </Col>
    );

    const backAction = isBackHistory ? () => history.goBack() : () => history.push('/dashboard');
    const backMessage = isBackHistory ? Messages.Text_Topbar_PageTitle_Back2 : Messages.Text_Topbar_PageTitle_Back;
    let back = [
        <Col key="tbBackBtn" style={{ marginLeft: '16px', top: '-4px' }}>
            <Button type="link" onClick={backAction}>
                <img src={topbarBack} alt='' />
            </Button>
        </Col>,
        <Col key="tbBackMain" className="topbar-secondary">
            <a onClick={backAction}>
                <FormattedMessage {...backMessage} />
            </a>
        </Col>,
        <Col key="tbBackDivider">
            <Divider type="vertical" className="mt-divider" />
        </Col>
    ];
    // Remove labeling on back button on phones
    if (!screens.xxl) back = [back[0]];

    // responsive sizing
    let titleMax = 300;
    let titlePaddingLeft = 0;
    let menuBoxWidth = 112;
    let menuBoxIconPaddingTop = '10px';
    if (!screens.xxl) {
        titleMax = 265;
        menuBoxWidth = 90;
    }
    if (!screens.xl) {
        titleMax = 240;
        menuBoxWidth = 40;
        menuBoxIconPaddingTop = '16px';
    }
    if (!screens.lg) {
        titlePaddingLeft = 36;
    }
    const menuBoxStyle = {
        width: menuBoxWidth,

    };
    const menuBoxIconStyle = {
        paddingTop: menuBoxIconPaddingTop,
    }

    const accountManagementBtn = (
        <Link to={`/accounts`}>
            <div className={`main-menu-box ${Current.UserAccounts === current ? 'main-menu-box-current' : ''}`} style={menuBoxStyle}>
                <div style={menuBoxIconStyle}><img src={userAccountIcon} alt='' /></div>
                {screens.xl ? <div className="main-menu-box-text"><FormattedMessage {...Messages.Text_UserManagement_Title} /></div> : null}
            </div>
        </Link>
    );
    const boxPairingBtn = (
        <Link to={`/boxpairing`}>
            <div className={`main-menu-box ${Current.BoxPairing === current ? 'main-menu-box-current' : ''}`} style={menuBoxStyle}>
                <div style={menuBoxIconStyle}><img src={boxPairingIcon} alt='' /></div>
                {screens.xl ? <div className="main-menu-box-text"><FormattedMessage {...Messages.Text_BoxManagement_Title} /></div> : null}
            </div>
        </Link>
    );

    let controlButtons;
    if (isPhone) {
        controlButtons = (
            <div>
                <Row justify="end" align="middle">
                    {store.permissions.includes('user_mgmt') ?
                        <Col>
                            {accountManagementBtn}
                        </Col> : null}
                    {store.permissions.includes('box_pairing') ?
                        <Col>
                            {boxPairingBtn}
                        </Col> : null}
                    <Col>
                        <UserMenu menuBoxStyle={menuBoxStyle} menuBoxIconStyle={menuBoxIconStyle} />
                    </Col>
                    <Col>
                        <MoreMenu />
                    </Col>
                </Row>
                <Row justify="center" align="middle">
                    {buttonCol}
                </Row>
            </div>
        );
    } else
        controlButtons = (
            <Row justify="end" align="middle">
                {buttonCol}
                {store.permissions.includes('user_mgmt') ?
                    <Col>
                        {accountManagementBtn}
                    </Col> : null}
                {store.permissions.includes('box_pairing') ?
                    <Col>
                        {boxPairingBtn}
                    </Col> : null}
                <Col>
                    <UserMenu menuBoxStyle={menuBoxStyle} menuBoxIconStyle={menuBoxIconStyle} />
                </Col>
                <Col>
                    <MoreMenu />
                </Col>
            </Row>
        );

    const phoneControlButtonWrapper = (
        <Popover
            placement="bottom"
            content={controlButtons}
            trigger="click"
            visible={isPhoneFilterVisible}
            onVisibleChange={() => setIsPhoneFilterVisible(!isPhoneFilterVisible)} >
            <Button type="link"><SettingOutlined style={{ fontSize: 24 }} /></Button>
        </Popover>

    );

    return (
        <div
            className="topbar-fixed"
            style={screens.lg ? { paddingRight: SIDEBAR_WIDTH } : {}}>
            <Row className="topbar-main-menu header-mt" justify="space-between" align="middle">
                <Col style={{ textAlign: 'left' }}>
                    <Row align="middle">
                        {!screens.lg ? <div style={{ width: 30 }}></div> : null}
                        {showBack ? back : null}
                        <Col>
                            <div className="topbar-title" style={{ maxWidth: titleMax }}>
                                {title}
                                {titleSecond ? <span className="topbar-title-second" style={{ paddingLeft: 16 }}>{titleSecond}</span> : null}
                            </div>
                        </Col>

                    </Row>
                </Col>
                <Col>
                    {isPhone ? phoneControlButtonWrapper : controlButtons}
                </Col>
            </Row>
            <div className="header-shadow-mt"></div>
        </div>
    );
};

TopBarMainMenu.defaultProps = {
    inStation: true,
    closePopover: false,
    isBackHistory: false,
}

TopBarMainMenu.propTypes = {
    title: PropTypes.string.isRequired,
    titleSecond: PropTypes.string,
    showBack: PropTypes.bool,
    isBackHistory: PropTypes.bool,
    current: PropTypes.oneOf(Object.values(Current)),
    buttons: PropTypes.arrayOf(PropTypes.element),
    inStation: PropTypes.bool,
    closePopover: PropTypes.bool,
};

export default TopBarMainMenu;