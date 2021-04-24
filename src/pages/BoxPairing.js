import { InfoCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Drawer, Grid, Popover, Result, Space, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from "react-intl";
import '../App.scss';
import boxFocusIcon from '../assets/img/img-device32-box-focus.png';
import { Actions } from '../components/Store/Reducer';
import { StoreContext } from '../components/Store/Store';
import AddBoxToStationSubPane from '../components/SubPanes/AddBoxToStationSubPane/AssignBoxToStationSubPane';
import BoxPairingDetails from '../components/SubPanes/BoxPairingSubPane/BoxPairingSubPane';
import TopBarMainMenu, { Current } from '../components/TopBar/TopBarMainMenu';
import Messages from '../Messages';
import { findBoxsBySCStationId } from '../SCStationAPI';
import { getDrawerWidth, lexicalSort } from '../util/AntUtil';
import _orderBy from 'lodash/orderBy';
import './BoxPairing.scss';

const { useBreakpoint } = Grid;

export default function BoxPairing() {
  const intl = useIntl();
  const screens = useBreakpoint();
  const [store, dispatch] = useContext(StoreContext);
  const [detailBoxId, setDetailBoxId] = useState(null);
  const [boxes, setBoxes] = useState(null);
  const [boxesError, setBoxesError] = useState(null);
  const [showAddBoxesDrawer, setShowAddBoxesDrawer] = useState(false);
  const [isSettingsMenuVisible, setIsSettingsMenuVisible] = useState(false);

  useEffect(() => {
    if (boxes === null && boxesError === null) {
      (async () => {
        const result = await findBoxsBySCStationId({ store, dispatch, intl, setError: setBoxesError });
        if (result) {
          dispatch({ type: Actions.SetControlBoxes, payload: result });
          setBoxes(result);
        }
      })();
    }
  }, [boxes, boxesError, dispatch, intl, store]);


  const columns = [
    {
      title: intl.formatMessage(Messages.Text_BoxManagement_Box),
      dataIndex: 'boxId',
      sorter: (a, b) => lexicalSort(a, b, 'boxId'),
      sortDirections: ['descend', 'ascend'],
      render: boxId => <div><img src={boxFocusIcon} alt='' className="boxIconTable" />{boxId}</div>,
    },
    {
      title: intl.formatMessage(Messages.Text_BoxManagement_Bed),
      dataIndex: 'bedNo',
      sorter: (a, b) => lexicalSort(a, b, 'bedNo'),
      sortDirections: ['descend', 'ascend'],
      render: bedNo => bedNo === null || bedNo === '' ? intl.formatMessage(Messages.Text_Common_Pairing) : bedNo,
    },
    {
      title: intl.formatMessage(Messages.Text_BoxManagement_Firmware),
      dataIndex: 'boxFWVer',
      sorter: (a, b) => lexicalSort(a, b, 'boxFWVer'),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '',
      key: 'details',
      render: (text, record) => (
        <Button type="link" onClick={event => setDetailBoxId(record.boxId)}><FormattedMessage {...Messages.Text_BoxManagement_Detail} /></Button>
      ),
    },
  ];

  const addBoxesBtn = (
    <Button key="assignBoxesButton" onClick={() => {
      setIsSettingsMenuVisible(false);
      setShowAddBoxesDrawer(true);
    }}>
      <FormattedMessage {...Messages.Text_BoxManagement_Button_AddBoxesToStation} />
    </Button>
  );
  let headerButtons = [
    addBoxesBtn,
  ];

  if (!screens.lg && screens.md) {
    headerButtons = (
      <Popover
        placement="bottom"
        content={<Space>{headerButtons}</Space>}
        trigger="click"
        visible={isSettingsMenuVisible}
        onVisibleChange={() => setIsSettingsMenuVisible(!isSettingsMenuVisible)} >
        <Button type="link"><SettingOutlined style={{ fontSize: 24 }} /></Button>
      </Popover>
    );
  }

  const sortedBoxes = _orderBy(store.controlBoxes, ['boxId'], ['asc']);

  return (
    <div>
      <TopBarMainMenu
        className="mt-header"
        title={intl.formatMessage(Messages.Text_Title_Box_Manager)}
        showBack={true}
        current={Current.BoxPairing}
        buttons={headerButtons} />
      <div className="mt-content">
        <div className={!screens.sm ? null : 'content-detail-mt'}>


          {boxesError ? (
            <Result
              icon={<InfoCircleOutlined />}
              title={intl.formatMessage(Messages.Text_BoxManagement_Message_NoBoxesToStation)}
              extra={addBoxesBtn}
            />
          ) :
            <Table
              tableLayout='fixed'
              size='small'
              className="mt-list-table"
              dataSource={sortedBoxes}
              columns={columns}
              pagination={false}
              loading={store.controlBoxes === null}
              rowKey='boxId' />}

          <Drawer
            placement="right"
            closable={true}
            onClose={() => setDetailBoxId(null)}
            visible={detailBoxId !== null}
            width={getDrawerWidth(screens)}
            className="drawer-mt">
            {detailBoxId ?
              <BoxPairingDetails
                boxId={detailBoxId}
                onComplete={() => setDetailBoxId(null)} /> : null}
          </Drawer>
          <Drawer
            placement="right"
            closable={true}
            onClose={() => setShowAddBoxesDrawer(false)}
            visible={showAddBoxesDrawer}
            width={getDrawerWidth(screens)}
            className="drawer-mt">
            {showAddBoxesDrawer ?
              <AddBoxToStationSubPane /> : null}
          </Drawer>
        </div>
      </div>
    </div>
  );
};
