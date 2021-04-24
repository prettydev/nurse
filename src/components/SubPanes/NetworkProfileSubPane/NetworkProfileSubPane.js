import { Alert, Button, Descriptions, Divider, notification } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from "react-intl";
import '../../../App.scss';
import { boxConfigDeleteNetworkProfiles, boxConfigGetNetworkProfile, boxConfigGetNetworkProfiles } from '../../../BoxConfigAPI';
import Messages from '../../../Messages';
import { StoreContext } from '../../Store/Store';
import Loading from '../../../components/Loading/Loading';
import moment from 'moment';
import { Colors } from '../../../util/Colors';
import { Actions } from '../../Store/Reducer';

const ProfileTypes = {
    WiFi: 'WiFi'
}
if (Object.freeze) Object.freeze(ProfileTypes);

function NetworkProfileSubPane({ profileId, onComplete }) {
    const intl = useIntl();
    const [store, dispatch] = useContext(StoreContext);
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(null);
    const [deleteError, setDeleteError] = useState(null);

    useEffect(() => {
        (async () => setProfile(await boxConfigGetNetworkProfile({ profileId, store, dispatch, intl, setIsLoading, setError })))();
    }, [profileId]);

    let profileDetails = null;
    if (profile) {
        if (profile.NetworkProfile && profile.NetworkProfile.ProfileType === ProfileTypes.WiFi) {
            profileDetails = getWifiDisplay(profile);
        }
    }

    async function deleteProfile() {
        const success = await boxConfigDeleteNetworkProfiles({ networkProfileIds: [profileId], store, dispatch, intl, setIsLoading: setDeleteLoading, setError: setDeleteError })
        if (success) {
            notification.open({
                message: intl.formatMessage(Messages.Text_Common_Success),
                description: intl.formatMessage(Messages.Text_BoxConfig_Text_DeleteProfileSuccess),
                icon: <CheckCircleFilled style={{ color: Colors.Good }} />,
                duration: 10,
            });
            onComplete();
            dispatch({ type: Actions.SetNetworkProfiles, payload: await boxConfigGetNetworkProfiles({ store, dispatch, intl }) });
        }
    }

    return (
        <div className="drawer-mt">
            <div className="subpane">
                <h2 className="subpane-title">{intl.formatMessage(Messages.Text_BoxConfig_Text_NetworkProfileDetails)}</h2>
                {profile && (<>
                    <h3 className="subpane-sec-title">{profile.NetworkProfile.ProfileName}</h3>
                    <div><FormattedMessage {...Messages.Text_BoxConfig_Text_CreatedAt} />: {moment(profile.NetworkProfile.CreatedAt).format("YYYY-MM-DD HH:mm:ss")}</div>
                </>)}
                {isLoading && (<div style={{ marginTop: '300px' }}><Loading isCentered size="large" style={{ marginTop: '64px' }} /></div>)}
                {profileDetails}
                {error && (<Alert message={error} type='error' showIcon />)}
                <Divider className="mt-divider-horizontal" />
                <Button type="primary" onClick={deleteProfile} disabled={deleteLoading}>
                    <FormattedMessage {...Messages.Text_Button_Delete} />
                </Button>
                {deleteError && (<Alert message={deleteError} type='error' showIcon />)}
            </div>
        </div>
    );

    function getWifiDisplay(profile) {
        return (
            <Descriptions title={intl.formatMessage(Messages.Text_BoxConfig_Text_Wifi)} column={1} size="small">
                <Descriptions.Item label={intl.formatMessage(Messages.Text_BoxConfig_Text_SSID)}>{profile.NetworkProfile.WiFi.SSID}</Descriptions.Item>
                <Descriptions.Item label={intl.formatMessage(Messages.Text_BoxConfig_Text_Encryption)}>{profile.NetworkProfile.WiFi.Encryption}</Descriptions.Item>
                <Descriptions.Item label={intl.formatMessage(Messages.Text_BoxConfig_Text_Band)}>{profile.NetworkProfile.WiFi.Band}</Descriptions.Item>
                <Descriptions.Item label={intl.formatMessage(Messages.Text_BoxConfig_Text_DataRate)}>{profile.NetworkProfile.WiFi.Datarate}</Descriptions.Item>
                <Descriptions.Item label={intl.formatMessage(Messages.Text_BoxConfig_Text_Country)}>{profile.NetworkProfile.WiFi.Country}</Descriptions.Item>
                <Descriptions.Item label={intl.formatMessage(Messages.Text_BoxConfig_Text_Identity)}>{profile.NetworkProfile.WiFi.Identity}</Descriptions.Item>
                <Descriptions.Item label={intl.formatMessage(Messages.Text_BoxConfig_Text_Password)}>{profile.NetworkProfile.WiFi.Password}</Descriptions.Item>
            </Descriptions>
        );
    }

};

NetworkProfileSubPane.propTypes = {
    profileId: PropTypes.string.isRequired,
    onComplete: PropTypes.func.isRequired,
};

export default NetworkProfileSubPane;