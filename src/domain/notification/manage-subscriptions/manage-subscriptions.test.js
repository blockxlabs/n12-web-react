import React from 'react'
import { configureStore } from "@reduxjs/toolkit";
import { render, fireEvent, screen, cleanup, wait, prettyDOM } from '../../../test-utils';
import '@testing-library/jest-dom/extend-expect';
import { v4 as uuid } from 'uuid';
import { Route } from 'react-router-dom';

import ManageSubscriptions from '../manage-subscriptions';
import { GET_SUBSCRIPTIONS } from '../../../graphql/queries/getSubscriptions';
import { UNSUBSCRIBE_NOTIFICATIONS } from '../../../graphql/mutations/unsubscribeNotifications';
import snackbarReducer, { openSnackbar } from "../../../components/snackbar/snackbar.slice";

// test data set up
const userUuid = uuid().toString();
const queryMock = {
  request: {
    query: GET_SUBSCRIPTIONS,
    variables: { userUuid },
  },
  result: {
    data: { UserSubscriptions: [] },
  },
};
const subscriptions = [
  {
    "uuid": "bf9374ea-17ca-4f6a-8d1d-1713afe9fcbb",
    "dAppUuid": "4c4c510c-f12c-4c62-b824-c511490f3a80",
    "userUuid": userUuid,
    "Notification": {
      "uuid": "00000002-2c32-4564-8d54-e00d4001b744",
      "name": "test name",
      "shortDescription": "Short Description 2",
      "longDescription": "Long Long Long  Long  Long  Long  Long  Long  Long  Long  Long  Long  Long  Long  Long  Long  Long  Long Description 2"
    },
    "DApp": {
      "uuid": "4c4c510c-f12c-4c62-b824-c511490f3a80",
      "name": "Uniswap",
      "logoUrl": 'none'
    },
    "User": {
      "email": "test@apigarage.com"
    }
  }
];

test('should render loading screen', async() => {
  render(
    <Route path="/manage-subscriptions/:userUuid"><ManageSubscriptions /></Route>,
    { route: `/manage-subscriptions/${userUuid}`, apolloClient: [queryMock] }
  );
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  await wait();
});

test('should render No Active Subscription screen', async () => {
  const store = configureStore({ reducer: { snackbar: snackbarReducer } });
  render(
    <Route path="/manage-subscriptions/:userUuid"><ManageSubscriptions /></Route>,
    { store, route: `/manage-subscriptions/${userUuid}`, apolloClient: [queryMock] }
  );
  await wait();
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  expect(screen.queryByText('No Active Subscription')).toBeInTheDocument();
  expect(store.getState().snackbar.isOpen).toEqual(true);
  expect(store.getState().snackbar.message).toEqual('No Active Subscription');
});

test('should render render each subscriptions', async () => {
  queryMock.result.data.UserSubscriptions = subscriptions;
  render(
    <Route path="/manage-subscriptions/:userUuid"><ManageSubscriptions /></Route>,
    { route: `/manage-subscriptions/${userUuid}`, apolloClient: [queryMock] }
  );
  await wait();
  expect(screen.queryByText(subscriptions[0].User.email)).toBeInTheDocument();
  subscriptions.forEach(sub => {
    expect(screen.queryByText(`${sub.DApp.name} ${sub.Notification.name}`)).toBeInTheDocument();
  });
});

test('should submit the unsub request', async () => {

  let deleteMutationCalled = false;

  const mutationMock = {
    request: {
      query: UNSUBSCRIBE_NOTIFICATIONS,
      variables: { userNotifications: [subscriptions[0].uuid] }
    },
    result: () => {
      deleteMutationCalled = true;
      return { data: true }
    }
  };

  const store = configureStore({ reducer: { snackbar: snackbarReducer } });
  queryMock.result.data.UserSubscriptions = subscriptions;
  render(
    <Route path="/manage-subscriptions/:userUuid"><ManageSubscriptions /></Route>,
    { store, route: `/manage-subscriptions/${userUuid}`, apolloClient: [queryMock, mutationMock] }
  );
  await wait();
  //select switch element by test id
  fireEvent.click(screen.queryByTestId(`testId${subscriptions[0].Notification.uuid}`));
  fireEvent.click(screen.queryByText(`UnSubscribe`));
  await wait();
  expect(store.getState().snackbar.isOpen).toEqual(true);
  expect(store.getState().snackbar.message).toEqual('Succeeded. Notification Unsubscribed.');
  expect(deleteMutationCalled).toEqual(true);
});