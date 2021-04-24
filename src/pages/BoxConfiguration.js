import { CheckCircleFilled, SettingOutlined } from '@ant-design/icons';
import { Alert, Button, Drawer, Form, Grid, Input, notification, Popover, Select, Space, Table, Tabs, Statistic, Divider, Row, Col, Avatar } from 'antd';
import _orderBy from 'lodash/orderBy';
import React, { useContext, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from "react-intl";
import '../App.scss';
import boxFocusIcon from '../assets/img/img-device32-box-focus.png';
import { StoreContext } from '../components/Store/Store';
import TopBarMainMenu, { Current } from '../components/TopBar/TopBarMainMenu';
import { boxConfigDeleteBoxConfigurations, boxConfigGetBoxes, boxConfigGetNetworkProfiles, boxConfigSetBoxStatus } from '../BoxConfigAPI';
import Messages from '../Messages';
import { getDrawerWidth, lexicalSort } from '../util/AntUtil';
import { Colors } from '../util/Colors';
import moment from 'moment';
import NetworkProfiles from '../components/BoxConfiguration/NetworkProfiles';
import CreateNetworkProfileSubPane from '../components/SubPanes/NetworkProfileSubPane/CreateNetworkProfileSubPane';
import { Actions } from '../components/Store/Reducer';
const { Option } = Select;
const { TabPane } = Tabs;
const { useBreakpoint } = Grid;
const { TextArea } = Input;
const { Countdown } = Statistic;

const ConfigurationTabs = {
  Configurations: 'Configurations',
  NetworkProfiles: 'NetworkProfiles',
};
if (Object.freeze) { Object.freeze(ConfigurationTabs) };

const BoxStatus = {
  Success: 'Success',
  Pending: 'Pending',
  Error: 'Error',
};
if (Object.freeze) { Object.freeze(BoxStatus) };

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 10 }
};
const tailLayout = {
  wrapperCol: { offset: 5, span: 10 }
};

export default function BoxConfiguration() {
  const intl = useIntl();
  const screens = useBreakpoint();
  const [store, dispatch] = useContext(StoreContext);
  const [showAddProfileDrawer, setShowAddProfileDrawer] = useState(false);
  const [isSettingsMenuVisible, setIsSettingsMenuVisible] = useState(false);
  const [isLoadingBoxes, setIsLoadingBoxes] = useState(false);
  const [boxesError, setBoxesError] = useState();
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [boxDeleteLoading, setBoxDeleteLoading] = useState();
  const [boxDeleteError, setBoxDeleteError] = useState();
  const [boxRetryLoading, setBoxRetryLoading] = useState();
  const [boxRetryError, setBoxRetryError] = useState();
  const [form] = Form.useForm();

  // util funciton for reloading box configurations
  async function reloadBoxes() {
    const result = await boxConfigGetBoxes({ store, dispatch, intl });
    if (result) dispatch({ type: Actions.SetBoxConfigurations, payload: result });
  }

  // Load Network Profiles & Box Configurations
  useEffect(() => {
    (async () => {
      const profiles = await boxConfigGetNetworkProfiles({ store, dispatch, intl, setIsLoading: setIsLoadingBoxes, setError: setBoxesError });
      if(profiles) dispatch({ type: Actions.SetNetworkProfiles, payload: profiles });
      const configs = await boxConfigGetBoxes({ store, dispatch, intl, setIsLoading: setIsLoadingBoxes, setError: setBoxesError });
      if(configs) dispatch({ type: Actions.SetBoxConfigurations, payload: configs });
    })();
  }, []);

  // Poll Box Configurations so we get updated status as boxes are physically configured
  useEffect(() => {
    const interval = setInterval(async () => reloadBoxes(), 15000);
    return () => clearInterval(interval);
  }, []);

  // prepare boxes from Step 1
  const onPrepareBoxes = async ({ networkProfileId, serialNumbers }) => {
    const boxSerials = serialNumbers.trim().split("\n");
    const boxes = boxSerials.map(serialNumber => ({
      SerialNumber: serialNumber,
      DesiredNetworkProfileId: networkProfileId
    }));
    prepareBoxes(boxes);
  }

  // Retry boxes configurations
  const onRetryBoxes = async () => {
    const boxes = selectedBoxes.map(box => ({
      SerialNumber: box.SerialNumber,
      DesiredNetworkProfileId: box.DesiredNetworkProfileId,
    }));
    prepareBoxes(boxes);
  }

  // actually prepare boxes
  const prepareBoxes = async (boxes) => {
    if (boxes && boxes.length > 0) {
      const success = await boxConfigSetBoxStatus({ boxes, store, dispatch, intl, setIsLoading: setIsLoadingBoxes, setError: setBoxesError });
      if (success) {
        reloadBoxes();
        setSelectedBoxes([]);
        notification.open({
          message: intl.formatMessage(Messages.Text_Common_Success),
          description: intl.formatMessage(Messages.Text_BoxConfig_Text_PrepareSuccess),
          icon: <CheckCircleFilled style={{ color: Colors.Good }} />,
        });
        form.resetFields();
      }
    }
  }

  const deleteConfigs = async () => {
    const serialNumbers = selectedBoxes.map(box => box.SerialNumber);
    const success = await boxConfigDeleteBoxConfigurations({ serialNumbers, store, dispatch, intl, setIsLoading: setBoxDeleteLoading, setError: setBoxDeleteError });
    if (success) {
      setSelectedBoxes([]);
      notification.open({
        message: intl.formatMessage(Messages.Text_Common_Success),
        description: intl.formatMessage(Messages.Text_BoxConfig_Text_DeleteConfigurationsSuccess),
        icon: <CheckCircleFilled style={{ color: Colors.Good }} />,
      });
      reloadBoxes();
    }
  }

  const addProfileBtn = (
    <Button key="addProfileBtn" onClick={() => {
      setIsSettingsMenuVisible(false);
      setShowAddProfileDrawer(true);
    }}>
      <FormattedMessage {...Messages.Text_BoxConfig_Button_AddProfile} />
    </Button>
  );
  let headerButtons = [
    addProfileBtn,
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

  const statusRender = (text, record, index) => {
    if (text === BoxStatus.Success) {
      let msg = intl.formatMessage(Messages.Text_Common_Success);
      return <span style={{ color: Colors.Good }}>{msg}</span>;
    } else if (text === BoxStatus.Error) {
      return <span style={{ color: Colors.Error }}>{text}</span>;
    } else if (text === BoxStatus.Pending) {
      let msg = intl.formatMessage(Messages.Text_BoxConfig_Text_Expired);
      if (moment(record.ConfigExpiresAt) > moment()) {
        msg = <Countdown value={record.ConfigExpiresAt} />;
      }
      return <span style={{ color: Colors.Warn }}>{msg}</span>;
    }
  }

  // table columns
  const columns = [
    {
      title: intl.formatMessage(Messages.Text_BoxManagement_Detail_HardwareID),
      dataIndex: 'SerialNumber',
      sorter: (a, b) => lexicalSort(a, b, 'SerialNumber'),
      sortDirections: ['descend', 'ascend'],
      render: boxId => <div><img src={boxFocusIcon} alt='' className="boxIconTable" />{boxId}</div>,
    },
    {
      title: intl.formatMessage(Messages.Text_BoxConfig_Table_ConfigStatus),
      dataIndex: 'ConfigStatus',
      sorter: (a, b) => lexicalSort(a, b, 'ConfigStatus'),
      sortDirections: ['descend', 'ascend'],
      render: statusRender,
    },
    {
      title: intl.formatMessage(Messages.Text_BoxConfig_Table_CurrentProfile),
      dataIndex: 'ReportedNetworkProfileId',
      sorter: (a, b) => store.networkProfilesById[a['ReportedNetworkProfileId']] < store.networkProfilesById[b['ReportedNetworkProfileId']] ? -1 : 1,
      sortDirections: ['descend', 'ascend'],
      render: ReportedNetworkProfileId => store.networkProfilesById[ReportedNetworkProfileId] && (store.networkProfilesById[ReportedNetworkProfileId].ProfileName),
    },
    {
      title: intl.formatMessage(Messages.Text_BoxConfig_Table_LastUpdate),
      dataIndex: 'ConfigUpdatedAt',
      sorter: (a, b) => lexicalSort(a, b, 'ConfigUpdatedAt'),
      sortDirections: ['descend', 'ascend'],
      render: configUpdatedAt => configUpdatedAt ? moment(configUpdatedAt).format("YYYY-MM-DD HH:mm:ss") : '',
    },
    {
      title: intl.formatMessage(Messages.Text_BoxConfig_Table_PreparedProfile),
      dataIndex: 'DesiredNetworkProfileId',
      sorter: (a, b) => store.networkProfilesById[a['DesiredNetworkProfileId']] < store.networkProfilesById[b['DesiredNetworkProfileId']] ? -1 : 1,
      sortDirections: ['descend', 'ascend'],
      render: DesiredNetworkProfileId => store.networkProfilesById[DesiredNetworkProfileId] && (store.networkProfilesById[DesiredNetworkProfileId].ProfileName),
    },
  ];
  // box data
  const sortedBoxes = _orderBy(store.boxConfigurations, ['ConfigExpiresAt'], ['desc']);
  const profiles = _orderBy(store.networkProfiles, ['ConfigUpdatedAt'], ['asc']).map(profile => <Option value={profile.ProfileId} key={profile.ProfileId}>{profile.ProfileName}</Option>);


  return (
    <div>
      <TopBarMainMenu
        className="mt-header"
        title={intl.formatMessage(Messages.Text_Title_Box_Configuration)}
        showBack={true}
        buttons={headerButtons} />
      <div className="mt-content">
        <Tabs className="mt-tabs" defaultActiveKey={ConfigurationTabs.Configurations} animated={false}>
          <TabPane tab={intl.formatMessage(Messages.Text_BoxConfig_Tab_Configurations)} key={ConfigurationTabs.Configurations}>
            <div className={!screens.sm ? null : 'content-detail-mt'}>
              <div style={{ padding: '4px' }}>
                <h3><Avatar style={{ backgroundColor: Colors.Focus, marginRight: 16 }}>1</Avatar><FormattedMessage {...Messages.Text_BoxConfig_Title_PrepareConfig} /></h3>
                <p>
                  <FormattedMessage {...Messages.Text_BoxConfig_Text_Step1Instructions} />
                </p>
                <Form {...layout}
                  form={form}
                  onFinish={onPrepareBoxes}>
                  <Form.Item
                    name="networkProfileId"
                    label={intl.formatMessage(Messages.Text_BoxConfig_Text_NetworkProfile)}
                    className="mt-drawer-form"
                    rules={[
                      { required: true, message: intl.formatMessage(Messages.Text_ErrorMessage_E014) },
                    ]}>
                    <Select
                      showSearch
                      placeholder={intl.formatMessage(Messages.Text_BoxConfig_Text_SelectProfile)}
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }>
                      {profiles}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="serialNumbers"
                    className="mt-drawer-form"
                    label={intl.formatMessage(Messages.Text_BoxConfig_Text_BoxSerialNumbers)}
                    rules={[
                      { required: true, message: intl.formatMessage(Messages.Text_ErrorMessage_E014) },
                    ]}>
                    <TextArea
                      rows={4}
                      placeholder={intl.formatMessage(Messages.Text_BoxConfig_Text_OnePerLine)} />
                  </Form.Item>
                  <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" disabled={isLoadingBoxes}>
                      <FormattedMessage {...Messages.Text_BoxConfig_Button_Prepare} />
                    </Button>
                  </Form.Item>
                  {boxesError ? <Alert message={boxesError} type='error' showIcon /> : null}
                </Form>
                <Divider className="mt-divider-horizontal" />
                <h3><Avatar style={{ backgroundColor: Colors.Focus, marginRight: 16 }}>2</Avatar><FormattedMessage {...Messages.Text_BoxConfig_Title_BoxStatus} /></h3>
                <p>
                  <FormattedMessage {...Messages.Text_BoxConfig_Text_Step2Instructions} />
                  <ol>
                    <li><FormattedMessage {...Messages.Text_BoxConfig_Text_Step2Instructions1} /></li>
                    <li><FormattedMessage {...Messages.Text_BoxConfig_Text_Step2Instructions2} /></li>
                    <li><FormattedMessage {...Messages.Text_BoxConfig_Text_Step2Instructions3} /></li>
                  </ol>
                </p>
                <div style={{ padding: '12px 0' }}>
                  <Space>
                    <Button onClick={onRetryBoxes} disabled={boxRetryLoading || selectedBoxes.length === 0}>
                      <FormattedMessage {...Messages.Text_Button_Retry} />
                    </Button>
                    <Button onClick={deleteConfigs} disabled={boxDeleteLoading || selectedBoxes.length === 0}>
                      <FormattedMessage {...Messages.Text_Button_Delete} />
                    </Button>
                  </Space>
                  {boxDeleteError ? <Alert message={boxDeleteError} type='error' showIcon /> : null}
                  {boxRetryError ? <Alert message={boxRetryError} type='error' showIcon /> : null}
                </div>
                <Table
                  tableLayout='fixed'
                  size='small'
                  className="mt-list-table"
                  dataSource={sortedBoxes}
                  columns={columns}
                  pagination={false}
                  loading={isLoadingBoxes}
                  rowKey='SerialNumber'
                  rowSelection={{
                    type: 'checkbox',
                    selectedRowKeys: selectedBoxes.map(box => box.SerialNumber),
                    onChange: (selectedRowKeys, selectedRows) => setSelectedBoxes(selectedRows),
                  }} />
              </div>
            </div>
          </TabPane>
          <TabPane tab={intl.formatMessage(Messages.Text_BoxConfig_Tab_NetworkProfiles)} key={ConfigurationTabs.NetworkProfiles}>
            <div className={!screens.sm ? null : 'content-detail-mt'}>
              <div style={{ padding: '4px' }}>
                <NetworkProfiles />
              </div>
            </div>
          </TabPane>
        </Tabs>
        <Drawer
          placement="right"
          closable={true}
          onClose={() => setShowAddProfileDrawer(false)}
          visible={showAddProfileDrawer}
          width={getDrawerWidth(screens)}
          className="drawer-mt">
          <CreateNetworkProfileSubPane onComplete={() => setShowAddProfileDrawer(false)} />
        </Drawer>
      </div>
    </div>
  );
};