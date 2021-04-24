import { Redirect, Route } from 'react-router-dom';
import React, { useContext } from 'react';
import { StoreContext } from '../components/Store/Store';
import { Groups } from './Groups';
import Unauthorized from '../pages/Unauthorized';
import FullScreenLayout from '../layouts/FullScreenLayout';



// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, requireStation, restrictTo, ...rest }) {
    const [store, dispatch] = useContext(StoreContext);
    const isAuthenticated = store.user;

    return (
        <Route
            {...rest}
            render={({ location }) => {
                const redirectHome = <Redirect
                    to={{
                        pathname: "/",
                        state: { from: location }
                    }} />

                if (isAuthenticated) {
                    if (requireStation && (!store.scStation || !store.scStation.scStationId)) {
                        // If no SCStation defined, go to select station page
                        return redirectHome;
                    }

                    // protect routes with RBAC                   
                    if (restrictTo) {
                        if (store.permissions.includes(restrictTo)) {
                            // user authorized
                        } else {
                            return (
                                <FullScreenLayout>
                                    <Unauthorized />
                                </FullScreenLayout>
                            );
                        }
                    }

                    return children;
                } else {
                    // If not logged in, go to login page
                    return <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                }
            }}
        />
    );
}

export default PrivateRoute;