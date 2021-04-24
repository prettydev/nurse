import { Col, Divider, Drawer, Row } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { FormattedMessage, useIntl } from "react-intl";
import '../../../App.scss';
import Messages from '../../../Messages';
import { getDrawerWidth } from '../../../util/AntUtil';
import { StoreContext } from '../../Store/Store';


function StationSettingsSubPane({ onComplete, isVisible }) {
    const intl = useIntl();
    const screens = useBreakpoint();
    const [store, dispatch] = useContext(StoreContext);

    return (
        <Drawer
            placement="right"
            closable={true}
            onClose={() => onComplete()}
            visible={isVisible}
            width={getDrawerWidth(screens)}
            className="drawer-mt">
            <div className="subpane">
                <h2 className="subpane-title">{intl.formatMessage(Messages.Text_Settings_Title)}</h2>
                {/* <h3 className="subpane-sec-title"><FormattedMessage {...Messages.Text_Settings_ShowName} /></h3> */}
                <Row className="mt-row">
                    <Col span={8}>
                        <FormattedMessage {...Messages.Text_Settings_ShowName} />
                    </Col>
                    <Col span={8} className="mt-general-bold">
                        {store.scStation.scStationName}
                    </Col>
                </Row>
                {/* <Divider className="mt-divider-horizontal" />
                <h3 className="subpane-sec-title"><FormattedMessage {...Messages.Text_Settings_SoftwareVersion} /></h3> */}
            </div>
        </Drawer>
    );
};

StationSettingsSubPane.propTypes = {
    isVisible: PropTypes.bool.isRequired,
};

export default StationSettingsSubPane;