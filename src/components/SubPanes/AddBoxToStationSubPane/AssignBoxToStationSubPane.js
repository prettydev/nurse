import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, notification, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from "react-intl";
import '../../../App.scss';
import boxFocusIcon from '../../../assets/img/img-device32-box-focus.png';
import Messages from '../../../Messages';
import { assignBoxToStation, findBoxsBySCStationId, findBoxsNonCareUnit } from '../../../SCStationAPI';
import { lexicalSort } from '../../../util/AntUtil';
import { Colors } from '../../../util/Colors';
import { Actions } from '../../Store/Reducer';
import { StoreContext } from '../../Store/Store';

function AddBoxToStationSubPane() {
    const intl = useIntl();
    const [store, dispatch] = useContext(StoreContext);
    const [nonStationBoxes, setNonStationBoxes] = useState(null);
    const [nonStationBoxesError, setNonStationBoxesError] = useState(null);
    const [assigned, setAssigned] = useState({});
    const [assignedLoading, setAssignedLoading] = useState({});
    const [assignedError, setAssignedError] = useState({});
    const [assignBoxId, setAssignBoxId] = useState(null);

    useEffect(() => {
        if (!nonStationBoxes && !nonStationBoxesError) {
            (async () => setNonStationBoxes(await findBoxsNonCareUnit({ store, dispatch, intl, setError: setNonStationBoxesError })))();
        }
    }, [assigned]);

    // update server in side effect when assignBoxId is changed
    useEffect(() => {
        if (assignBoxId) {
            (async () => {
                const result = await assignBoxToStation({
                    boxId: assignBoxId,
                    scStationId: store.scStation.scStationId,
                    store, 
                    dispatch,
                    intl,
                    setIsLoading: (value) => setAssignedLoading({ ...assignedLoading, [assignBoxId]: value }),
                    setError: (error) => {
                        setAssignedError({ ...assignedError, [assignBoxId]: error })
                    },
                });
                if (result) {
                    setAssigned({ ...assigned, [assignBoxId]: true });
                    const reload = await findBoxsBySCStationId({ store, dispatch, intl });
                    if (reload) {
                        dispatch({ type: Actions.SetControlBoxes, payload: reload });
                    }
                }
            })();
        }
    }, [assignBoxId]);

    useEffect(() => {
        for (let errorBoxId in assignedError) {
            if (assignedError[errorBoxId]) {
                notification.open({
                    message: intl.formatMessage(Messages.Text_ErrorMessage),
                    description: `${intl.formatMessage(Messages.Text_BoxManagement_Detail_AssignmentError)}: ${errorBoxId}`,
                    icon: <ExclamationCircleFilled style={{ color: Colors.Error }} />,
                  });        
                setAssignedError({ ...assignedError, [errorBoxId]: false });
            }
        }
    }, [assignedError]);

    const columns = [
        {
            title: intl.formatMessage(Messages.Text_BoxManagement_Box),
            dataIndex: 'boxid',
            sorter: (a, b) => lexicalSort(a, b, 'boxid'),
            sortDirections: ['descend', 'ascend'],
            render: boxId => <div><img src={boxFocusIcon} alt='' className="boxIconTable" />{boxId}</div>,
        },
        {
            title: '',
            render: (text, record) => {
                if (assigned[record.boxid]) {
                    return (
                        <Button disabled>
                            <FormattedMessage  {...Messages.Text_BoxManagement_Detail_Assigned} />
                        </Button>
                    );
                } else {
                    return (
                        <Button onClick={event => setAssignBoxId(record.boxid)} loading={assignedLoading[record.boxid]}>
                            <FormattedMessage  {...Messages.Text_BoxManagement_Button_AddToStation} />
                        </Button>

                    );
                }
            }
        }
    ];

    return (
        <div className="subpane">
            <h2 className="subpane-title"><FormattedMessage {...Messages.Text_BoxManagement_Button_AddBoxesToStation} /></h2>
            <h3 className="subpane-sec-title"><FormattedMessage {...Messages.Text_BoxManagement_Label_AvailableBoxes} /></h3>
            <Table
                tableLayout='fixed'
                size='small'
                className="mt-list-table"
                dataSource={nonStationBoxes}
                columns={columns}
                pagination={false}
                rowKey='boxid' />
        </div>
    );
};

AddBoxToStationSubPane.propTypes = {
};

export default AddBoxToStationSubPane;