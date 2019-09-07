import { useCallback, useEffect, useReducer, useState } from 'react';
import {Enum} from 'enumify';
import _ from 'lodash';
import Observable from 'zen-observable';
import { AppSyncError, SubscriptionReducerError } from './AppSyncError';
import { appSyncClient } from '../config/configureAppSync';


class ActionType extends Enum {};
ActionType.initEnum(["update", "create", "remove"]);

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ActionType.update:
      return { ...state, ...payload };
    default:
      throw new SubscriptionReducerError(state, type, payload, 'Unexpected action type!');
  }
}

const useAppSyncSubscription = (query, variables={}) => {
  const [state, dispatch] = useReducer(reducer, {});
  const [error, setError] = useState(false);
  const [complete, setComplete] = useState(false);
  const [subscription, setSubscription] = useState(undefined);

  const nextCallback = useCallback(({ value: { data: { [variables]: update } } }) => {
    try {
      dispatch({ type: ActionType.update, payload: update });
    } catch (error) {
      setError(new AppSyncError(query, variables, 'AppSync subscription error on next!'))
    }
  }, [query, variables]);

  const errorCallback = useCallback(error => {
    setError(new AppSyncError(query, variables, 'AppSync subscription error on next!'));
  }, [query, variables]);

  const completeCallback = useCallback(() => {
    setComplete(true);
  }, []);

  const unsubscribe = useCallback(() => {
    if (!_.isUndefined(subscription)) {
      subscription.unsubscribe();
      setSubscription(undefined);
    }
  }, [subscription]);

  useEffect(() => {
      const observable = appSyncClient.subscribe({ subscription: query });
      if (observable instanceof Observable) {
        setSubscription(observable.subscribe({
          next: nextCallback,
          error: errorCallback,
          complete: completeCallback
        }));
        return () => {
          unsubscribe();
        };
      }
  }, [query, unsubscribe, nextCallback, errorCallback, completeCallback]);

  return {
    state,
    error,
    complete,
    unsubscribe
  };
};

export default useAppSyncSubscription;
