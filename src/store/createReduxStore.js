/**
 * http://react-redux-firebase.com/docs/v3-migration-guide.html
 */

import { createStore } from "redux";
import reducer from "./reducer";

const initialState = {};

export default () => {
  return createStore(
    reducer,
    initialState
    // applyMiddleware(...middleware) // to add other middleware
  );
};
