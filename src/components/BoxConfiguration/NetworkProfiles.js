import { Button, Drawer, Grid, Table } from 'antd';
import _orderBy from 'lodash/orderBy';
import React, { useContext, useState } from 'react';
import { FormattedMessage, useIntl } from "react-intl";
import '../../App.scss';
import Messages from '../../Messages';
import { getDrawerWidth, lexicalSort } from '../../util/AntUtil';
import { StoreContext } from '../Store/Store';
import NetworkProfileSubPane from '../SubPanes/NetworkProfileSubPane/NetworkProfileSubPane';
const { useBreakpoint } = Grid;

const ConfigurationTabs = {
    Configurations: 'Configurations',
    NetworkProfiles: 'NetworkProfiles',
}
if (Object.freeze) { Object.freeze(ConfigurationTabs) };

const BoxStatus = {
    Success: 'Success',
    Pending: 'Pending',
    Error: 'Error',
}
if (Object.freeze) { Object.freeze(BoxStatus) };

export default function NetworkProfiles() {
    const intl = useIntl();
    const screens = useBreakpoint();
    const [store, dispatch] = useContext(StoreContext);
    const [detailProfileId, setDetailProfileId] = useState(null);

    // table columns
    const columns = [
        {
            title: intl.formatMessage(Messages.Text_BoxConfig_Text_ProfileName),
            dataIndex: 'ProfileName',
            sorter: (a, b) => lexicalSort(a, b, 'ProfileName'),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: intl.formatMessage(Messages.Text_BoxConfig_Text_ConnectionType),
            dataIndex: 'ProfileType',
            sorter: (a, b) => lexicalSort(a, b, 'ProfileType'),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: '',
            key: 'details',
            render: (text, record) => (
                <Button type="link" onClick={event => setDetailProfileId(record.ProfileId)}><FormattedMessage {...Messages.Text_BoxManagement_Detail} /></Button>
            ),
        },
    ];
    const profiles = _orderBy(store.networkProfiles, ['ProfileName'], ['asc']);

    return (
        <div>
            <Table
                tableLayout='fixed'
                size='small'
                className="mt-list-table"
                dataSource={profiles}
                columns={columns}
                pagination={false}
                rowKey='SerialNumber' />
            <Drawer
                placement="right"
                closable={true}
                onClose={() => setDetailProfileId(null)}
                visible={detailProfileId !== null}
                width={getDrawerWidth(screens)}
                className="drawer-mt">
                {detailProfileId ?
                    <NetworkProfileSubPane
                        profileId={detailProfileId}
                        onComplete={() => setDetailProfileId(null)} /> : null}
            </Drawer>

        </div>
    );
};
