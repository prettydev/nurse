import {Modal} from 'antd';
import {Auth} from 'aws-amplify';
import moment from 'moment';
import React, {useContext, useEffect, useState} from "react";
import {useIntl} from "react-intl";
import Messages from '../../Messages';
import {loadControlBoxesAndSettings} from '../../util/ApiUtils';
import {BoxEventValue} from '../Beds/BoxEvents';
import {Actions} from '../Store/Reducer';
import {StoreContext} from '../Store/Store';
import DataContext from "./DataContext";
import {
    getCurrentBoxEvents,
    subscribeToBoxEvents,
    getCurrentPressureData,
    subscribeToCurrentPressure
} from '../../DataAPI';
import AWSAppSyncClient, {AUTH_TYPE} from "aws-appsync";

// const BOX_EVENTS_PATH = '/sc/eventMonitorService'
// const RAW_EVENTS_PATH = '/sc/rawMonitorService'
// const WEBSOCKET_RECONNECTION_MS = 3600001;  // reload all sockets with fresh jwt just after it expires
// const DO_NOT_RESTART_CLOSE_CODE = 4000;  // custom application code meaning we're intentionally closing the socket
// const SUSTAINED_RETRY_MS = 30000;  // max duration between retry requests
// const INCREMENTAL_RETRY = [1000, 5000, 10000, 15000, 20000, SUSTAINED_RETRY_MS];  // miliseconds
// const UNIQUE_ID = uuidv4();  // Generated once per UI page load.
// const EVENT_SOCKET_PING_MS = 50000;  // reload every 50 seconds.


// keep a global handle so we never act on stale state. 
let eventsSubscription;
let pressureDataSubscription;

const DataProvider = (props) => {
    const intl = useIntl();
    const [store, dispatch] = useContext(StoreContext);
    const [reconnect, setReconnect] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const [graphqlClient, setGraphQLClient] = useState(null);
    // const [reloadBoxesAndSettings] = useDebouncedCallback(() => loadControlBoxesAndSettings({ store, dispatch, intl }), 1000);

    // let retryIndex;
    // let retrySeconds = 0;
    // retryIndex = retryCount >= INCREMENTAL_RETRY.length ? INCREMENTAL_RETRY.length - 1 : retryCount;
    // retrySeconds = INCREMENTAL_RETRY[retryIndex];

    useEffect(() => {
        if (store.user && store.scStation && !graphqlClient) {
            setGraphQLClient(new AWSAppSyncClient({
                url: store.vars.Data.APIEndpoint,
                region: store.vars.Meta.Region,
                auth: {
                    type: AUTH_TYPE.API_KEY,
                    apiKey: store.vars.Data.APIKey
                },
            }));
        }
    }, [store.scStation, store.user, store.vars]);

    // event data
    useEffect(() => {
        if (store.user && store.scStation && graphqlClient && !eventsSubscription) {
            (async () => {
                getCurrentBoxEvents({graphqlClient, dispatch, store});
                eventsSubscription = subscribeToBoxEvents({graphqlClient, dispatch, store});
            })();
        }
    }, [store.scStation, store.user, graphqlClient, eventsSubscription]);

    // pressure data
    useEffect(() => {
        if (store.user && store.scStation && graphqlClient && !pressureDataSubscription) {
            (async () => {
                getCurrentPressureData({graphqlClient, dispatch, store});
                pressureDataSubscription = subscribeToCurrentPressure({graphqlClient, dispatch, store});
            })();
        }
    }, [store.scStation, store.user, graphqlClient, pressureDataSubscription]);

    // Reconnect if the WS closes or errors, wait specified time and reconnect.
    // useEffect(() => {
    //     if (reconnect && store.user && store.scStation) {
    //         dispatch({ type: 'SetDisconnected', payload: true });
    //         if (store.user && store.scStation) {
    //             setTimeout(async () => await initSockets(), retrySeconds);
    //         }
    //     } else {
    //         dispatch({ type: 'SetDisconnected', payload: false });
    //         setRetryCount(0);
    //     }
    // }, [reconnect, retryCount]);

    // close sockets command
    useEffect(() => {
        if (store.cancelSubscriptions) {
            if (eventsSubscription) eventsSubscription.unsubscribe();
            if (pressureDataSubscription) pressureDataSubscription.unsubscribe();
            dispatch({type: 'SetCancelSubscriptions', payload: false});
        }
    }, [store.cancelSubscriptions]);

    // determine if we need to reload control boxes
    // useEffect(() => {
    //     if (!store.controlBoxes || !store.boxSettings) {
    //         reloadBoxesAndSettings();
    //         return;
    //     }
    //     for (let boxEvent of value.boxEvents) {
    //         if (!store.controlBoxIdToBox[boxEvent.BoxID]
    //             || !store.controlBoxIdToBox[boxEvent.BoxID].bedNo
    //             || (boxEvent.Value === BoxEventValue.NoCheckIn && store.controlBoxIdToBox[boxEvent.BoxID].checkInTime)
    //             || !store.controlBoxIdToSettings[boxEvent.BoxID]
    //             || (store.controlBoxIdToSettings[boxEvent.BoxID]
    //                 && store.controlBoxIdToSettings[boxEvent.BoxID].lastUpdatedDate
    //                 && boxEvent.SubEvents
    //                 && boxEvent.SubEvents.DeviceSetting
    //                 && boxEvent.SubEvents.DeviceSetting.Time
    //                 && moment(boxEvent.SubEvents.DeviceSetting.Time).valueOf() === store.controlBoxIdToSettings[boxEvent.BoxID].lastUpdatedDate
    //             )) {
    //             reloadBoxesAndSettings();
    //             return;
    //         }
    //     }
    // }, [value.boxEvents]);

    return (
        <DataContext.Provider client={graphqlClient}>
            {props.children}
            {/*<Modal*/}
            {/*visible={retryCount !== null && retryCount > 3 ? true : false}*/}
            {/*title={intl.formatMessage(Messages.Text_System_ErrorMessage_ConnectionTitle)}*/}
            {/*closable={false}*/}
            {/*footer={[]}>*/}
            {/*{intl.formatMessage(Messages.Text_System_ErrorMessage_ConnectionRetry).replace('XXX', `${retrySeconds / 1000} seconds`)}*/}
            {/*</Modal>*/}
        </DataContext.Provider>
    );


    // ************************************************************************
    // Helper functions
    // ************************************************************************

    // async function initSockets(isStationChanged) {
    //     const wsBase = `wss://${store.scStation.scstationhostname}:443`;
    //     let jwt;
    //     try {
    //         const session = await Auth.currentSession();
    //         jwt = session.getAccessToken().getJwtToken();
    //     } catch (error) {
    //         // token expiration
    //         dispatch({ type: Actions.Logout, payload: null });
    //     }
    //     if (!jwt) dispatch({ type: Actions.Logout, payload: null });
    //
    //     try {
    //         if (!eventDataSocket || eventDataSocket.readyState !== 1 || isStationChanged) initEventSocket({ wsBase, jwt });
    //         if (!rawDataSocket || rawDataSocket.readyState !== 1 || isStationChanged) initRawDataSocket({ wsBase, jwt });
    //     } catch (error) {
    //         setReconnect(true);
    //     }
    // };


    // function initEventSocket({ wsBase, jwt }) {
    //     if (eventDataSocket) eventDataSocket.close(DO_NOT_RESTART_CLOSE_CODE);
    //     eventDataSocket = new WebSocket(`${wsBase}${BOX_EVENTS_PATH}/2/${UNIQUE_ID}/${jwt}?scid=${store.scStation.scStationId}`);
    //
    //     // Box Events
    //     eventDataSocket.onopen = evt => {
    //         if (pingInterval) clearInterval(pingInterval); // cleanup old timer
    //         setPingInterval(setInterval(() => {
    //             if (eventDataSocket.readyState === 1 || eventDataSocket.readyState === 2) {
    //                 eventDataSocket.send('__ping__');
    //             }
    //         }, EVENT_SOCKET_PING_MS));
    //         setReconnect(false);
    //         socketEvents(setValue, 'boxEvents', evt);
    //     }
    //     eventDataSocket.onmessage = evt => {
    //         socketEvents(setValue, 'boxEvents', evt);
    //     }
    //     eventDataSocket.onerror = evt => {
    //         setReconnect(true);
    //         setRetryCount(retryCount + 1);
    //     }
    //
    //     eventDataSocket.onclose = evt => {
    //         if (evt.code !== DO_NOT_RESTART_CLOSE_CODE) setReconnect(true);
    //     };
    // }

    // function initRawDataSocket({ wsBase, jwt }) {
    //     if (rawDataSocket) rawDataSocket.close(DO_NOT_RESTART_CLOSE_CODE);
    //     rawDataSocket = new WebSocket(`${wsBase}${RAW_EVENTS_PATH}/${jwt}?scid=${store.scStation.scStationId}`);
    //     // Raw Data
    //     rawDataSocket.onopen = evt => {
    //         setReconnect(false);
    //         socketEvents(setValue, 'rawData', evt);
    //     }
    //     rawDataSocket.onmessage = evt => socketEvents(setValue, 'rawData', evt);
    //     rawDataSocket.onerror = evt => setReconnect(true);
    //     rawDataSocket.onclose = evt => {
    //         if (evt.code !== DO_NOT_RESTART_CLOSE_CODE) setReconnect(true);
    //     };
    // }

    // function socketEvents(setValue, key, evt) {
    //     try {
    //         const value = JSON.parse(evt.data);
    //         setValue(state => { return { ...state, [key]: value } });
    //     } catch (error) {
    //         // ignore malformed
    //     }
    // }
};

export default DataProvider;