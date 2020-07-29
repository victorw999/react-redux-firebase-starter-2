import React from "react";
import ReactDOM from "react-dom";

// SCSS
import "./scss/base.scss";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import { Provider, useSelector } from "react-redux";
import thunk from "redux-thunk";

/** no longer needed in (react-redux-firebase v3) */
// import { reduxFirestore, getFirestore } from "redux-firestore";
// import { reactReduxFirebase } from "react-redux-firebase";

/** new for v3 */
import {
  ReactReduxFirebaseProvider,
  getFirebase,
  isLoaded,
} from "react-redux-firebase";
import {
  createFirestoreInstance,
  getFirestore,
  firestoreReducer,
} from "redux-firestore"; // <- needed if using firestore
// import createReduxStore from "./store/createReduxStore";

// import fbConfig from "./config/fbConfig";
import firebase from "./config/fbConfig";

// const fbConfig = { } // object containing Firebase config

/** v2 syntax */
// const store = createStore(
//   rootReducer,
//   compose(
//     applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))
//     // reactReduxFirebase(fbConfig), // redux binding for firebase
//     // reduxFirestore(fbConfig) // redux bindings for firestore
//   )
// );
import { composeWithDevTools } from "redux-devtools-extension";

const composeEnhancers = composeWithDevTools({
  realtime: true,
  // options like actionSanitizer, stateSanitizer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const rrfConfig = {
  userProfile: "users",
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

//https://react-redux-firebase.com/docs/recipes/auth#loading
function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth)) return <div>{/* <div>splash screen...</div> */}</div>;
  return children;
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
        <App />
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
