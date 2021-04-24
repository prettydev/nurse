import { Alert, Card, Col, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { useContext, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import stationImg from '../assets/careUnit.png';
import Loading from '../components/Loading/Loading';
import { StoreContext } from '../components/Store/Store';
import TopBarSelectStation from '../components/TopBar/TopBarSelectStation';
import { listStations, setSCStation } from '../SCStationAPI';
import { useHistory, useLocation } from 'react-router-dom';
import { Actions } from '../components/Store/Reducer';
import Messages from '../Messages';

function sortSCStation(station1, station2) {
    if (station1.scStationName < station2.scStationName) return -1;
    if (station1.scStationName > station2.scStationName) return 1;
    return 0;
}

function StationSelection() {
    const intl = useIntl();
    const [store, dispatch] = useContext(StoreContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [stations, setStations] = useState([]);
    const history = useHistory();
    const location = useLocation();
    useEffect(() => {
        (async () => {
            let SCStations = await listStations({ erpId: store.vars.Meta.Deployment, store, dispatch, intl, setIsLoading, setError });
            if (store.vars.Auth.RoleSet === "default") {
                setStations(SCStations);
            } else {
                // save sorted SCStations to store
                SCStations.sort(sortSCStation);
                dispatch({type: Actions.SetSCStations, payload: SCStations});

                // filter SCStations by careUnits
                let filteredStations = SCStations.slice();
                SCStations.forEach((station) => {
                    if (!store.careUnits.includes(station.scStationId)) filteredStations.splice(filteredStations.indexOf(station), 1);
                });
                setStations(filteredStations);
            }
        })();
    }, []);

    const selectStation = (station, isImmediate) => {
        // set SCStation
        setSCStation({ scId: station.scStationId, store, dispatch, intl, setIsLoading, setError })

        // redirect to previous state or dashboard for the Station
        const { from } = location.state || { from: { pathname: `/dashboard` } };
        dispatch({
            type: Actions.SetSCStation,
            payload: {
                station: station,
                onActionComplete: () => {
                    // start websockets for new station

                    // redirect 
                    isImmediate ? history.replace(from) : history.push(from);
                },
            }
        });
    };

    // If only one Station, go there immediately
    const singleStation = stations && stations.length === 1;
    useEffect(() => {
        if (singleStation) {
            selectStation(stations[0], true);
        }
    }, [stations]);

    const cards = stations ? stations.map(station => {
        return (
            <Col key={`station${station.scStationId}`}>
                <Card
                    onClick={() => selectStation(station, false)}
                    style={{ width: 300, margin: '32px', cursor: 'pointer' }}
                    cover={<img src={stationImg} alt='Station' />}>
                    <Meta
                        title={station.scStationName}
                        description={station.nurseStationName} />
                </Card>
            </Col>
        );
    }) : null;

    if (singleStation) {
        return <div className="mt-content"></div>
    } else {
        return (
            <div>
                <TopBarSelectStation
                    className="mt-header"
                    title={'Select Station'} />
                <div className="mt-content">
                    <Row>
                        {cards}
                    </Row>
                    <Row align="center">
                        <Col>
                            {isLoading ? <div style={{ marginTop: '300px' }}><Loading isCentered size="large" style={{ marginTop: '64px' }} /></div> : null}
                            {error ? <Alert message={intl.formatMessage(Messages.Text_ErrorMessage)} type='error' showIcon style={{ marginTop: '24px' }} /> : null}
                        </Col>
                    </Row>
                </div>
            </div>

        );
    }
}

export default StationSelection;

