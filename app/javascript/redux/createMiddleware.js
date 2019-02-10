import agent from "../agent";
import {
  ASYNC_START,
  ASYNC_END,
  LOGIN,
  LOGOUT
} from "../constants/actionTypes";

const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    store.dispatch({ type: ASYNC_START, subtype: action.type });

    const currentView = store.getState().viewChangeCounter;
    const skipTracking = action.skipTracking;

    action.payload.then(
      res => {
        const currentState = store.getState();
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return;
        }
        console.log("RESULT", res);
        action.payload = res;
        store.dispatch({ type: ASYNC_END, promise: action.payload });
        store.dispatch(action);
      },
      error => {
        const currentState = store.getState();
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return;
        }
        console.log("ERROR", error);
        action.error = true;
        action.payload = error.message;
        if (!action.skipTracking) {
          store.dispatch({ type: ASYNC_END, promise: action.payload });
        }
        store.dispatch(action);
      }
    );

    return;
  }

  next(action);
};

const localStorageMiddleware = store => next => action => {
  if (action.type === LOGIN) {
    if (!action.error) {
      const auth = {
        accessToken: action.payload.auth["access-token"],
        client: action.payload.auth["client"],
        uid: action.payload.auth["uid"],
        expiry: action.payload.auth["expiry"]
      };
      window.localStorage.setItem("maihoum.accessToken", auth.accessToken);
      window.localStorage.setItem("maihoum.client", auth.client);
      window.localStorage.setItem("maihoum.uid", auth.uid);
      window.localStorage.setItem("maihoum.expiry", auth.expiry);
      agent.setAuth(auth);
    }
  } else if (action.type === LOGOUT) {
    window.localStorage.setItem("maihoum.accessToken", "");
    window.localStorage.setItem("maihoum.client", "");
    window.localStorage.setItem("maihoum.uid", "");
    window.localStorage.setItem("maihoum.expiry", "");
    agent.setAuth(null);
  }

  next(action);
};

function isPromise(v) {
  return v && typeof v.then === "function";
}

export { promiseMiddleware, localStorageMiddleware };
