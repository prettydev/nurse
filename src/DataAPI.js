import {gql} from '@apollo/client';
import Amplify, {API, graphqlOperation} from 'aws-amplify';
import AWSAppSyncClient, {AUTH_TYPE} from 'aws-appsync';
import {Actions} from "./components/Store/Reducer";

const queryListCurrentEvents = /* GraphQL */ `
  query GetCurrentEvents {
    getCurrentEvents(filter: {erpId: {eq: "default-erpid"}, careUnitId: {eq: "default-careunit"}})  {
      events {
        value
        type
        patientId
        erpId
        dateTime
        class
        careUnitId
        boxId
        bedNumber
      }
    }
  }
`;

// TODO: value?
const queryListCurrentPressure = /* GraphQL */ `
  query GetCurrentPressure {
    getCurrentPressure(filter: {erpId: {eq: "default-erpid"}, careUnitId: {eq: "default-careunit"}})  {
      pressureData {
        value
        type
        patientId
        expirationTime
        erpId
        dateTime
        class
        careUnitId
        boxId
        bedNumber
      }
    }
  }
`;

const subscriptionOnCreateCurrentEvent = /* GraphQL */ `
  subscription OnCreateCurrentEvent {
    onCreateCurrentEvent(erpId: "default-erpid", careUnitId: "default-careunit") {
      value
      type
      patientId
      erpId
      dateTime
      class
      careUnitId
      boxId
      bedNumber
    }
  }
`;

const subscriptionOnCreateCurrentPressure = /* GraphQL */ `
  subscription OnCreateCurrentPressure {
    onCreateCurrentPressure(erpId: "default-erpid", careUnitId: "default-careunit") {
      bedNumber
      boxId
      careUnitId
      class
      dateTime
      erpId
      expirationTime
      patientId
      type
      value
    }
  }
`;



export const getCurrentBoxEvents = async ({graphqlClient, dispatch, store}) => {
    graphqlClient.query({query: gql(queryListCurrentEvents)}).then(
        ({data, error}) => {
            if (data) {
                console.log(data);
                const events = data && data.getCurrentEvents && data.getCurrentEvents.events;
                    dispatch({type: Actions.SetBoxEvents, store, payload: events})
            }
        }
    );
};


export const subscribeToBoxEvents = async ({graphqlClient, dispatch, store}) => {
    let subscription;
    subscription = graphqlClient.subscribe({query: gql(subscriptionOnCreateCurrentEvent)}).subscribe({
        next: (data) => {
            const boxEvent = data && data.onCreateCurrentEvent && data.onCreateCurrentEvent.event;
                dispatch({type: Actions.SetBoxEvents, store, payload: boxEvent})
        },
        error: (error) => {
            if (error) console.log(error);
        }
    });

    return subscription;
};

export const getCurrentPressureData = async ({graphqlClient, dispatch, store}) => {
    graphqlClient.query({query: gql(queryListCurrentPressure)}).then(
        ({data, error}) => {
            if (data) {
                const pressureData = data && data.getCurrentPressure && data.getCurrentPressure.pressureData;
                console.log(data);
                dispatch({type: Actions.SetCurrentPressure, store, payload: pressureData})
            }
        }
    );
};

export const subscribeToCurrentPressure = async ({graphqlClient, dispatch, store}) => {
    let subscription;
    subscription = graphqlClient.subscribe({query: gql(subscriptionOnCreateCurrentPressure)}).subscribe({
        next: (data) => {
            const pressureData = data && data.data.onCreateCurrentPressure;
              dispatch({type: Actions.UpdateCurrentPressure, store, payload: pressureData})
        },
        error: (error) => {
            if (error) console.log(error);
        }
    });

    return subscription;
};
