import { Col, Row } from "antd";
import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import moreMenuIcon from '../../assets/img/icon-moremenu.png';
import userActiveIcon from '../../assets/img/icon-useractive.png';
import MTLogo from '../../assets/logo.svg';
import './TopBarMainMenu.scss';
import UserMenu from "./UserMenu";

function TopBarSelectStation() {
    return (
        <div
            className="topbar-fixed">
            <Row className="topbar-main-menu header-mt" justify="space-between" align="middle">
                <Col span={8} style={{ textAlign: 'left' }}>
                    <Row align="middle">
                        <Col className="topbar-title">
                            <img
                                style={{position: 'fixed', top: '-7px'}}
                                src={MTLogo}
                                alt="Cognito Health"
                                width={180} />
                        </Col>
                    </Row>
                </Col>
                <Col span={16}>
                    <Row justify="end" align="middle">
                        <Col>
                            <UserMenu isCurrent={false} />
                        </Col>
                        <Col><div className="main-menu-moremenu"><img src={moreMenuIcon} alt='' /></div></Col>
                    </Row>
                </Col>
            </Row>
            <div className="header-shadow-mt"></div>
        </div>
    );
};

export default TopBarSelectStation;