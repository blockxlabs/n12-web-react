import React from 'react'
import { configureStore } from "@reduxjs/toolkit";

// We're using our own custom render function and not RTL's render
// our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, fireEvent, screen } from '../../test-utils'
import '@testing-library/jest-dom/extend-expect'
import SnackBar from '../snackbar'
import snackbarReducer, { openSnackbar } from "./snackbar.slice";

test('can open snack bar with given message from redux', async () => {
  const message = 'Test Succeeded';
  const store = configureStore({ reducer: { snackbar: snackbarReducer } });
  render(<SnackBar />, { store });
  await store.dispatch(openSnackbar({ message, type: "success" }));
  const element = screen.getByText(message);
  expect(element).toBeInTheDocument();
});

test('can close snack bar with click on close', async () => {
  const message = 'Test Succeeded';
  const store = configureStore({ reducer: { snackbar: snackbarReducer } });
  render(<SnackBar />, { store });
  await store.dispatch(openSnackbar({ message, type: "success" }));
  expect(screen.getByText(message)).toBeInTheDocument();
  fireEvent.click(screen.getByLabelText('Close'));
  expect(screen.queryByText(message)).not.toBeInTheDocument();
  expect(store.getState().snackbar.isOpen).toEqual(false);
});