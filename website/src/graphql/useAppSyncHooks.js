import { useState, useCallback } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import _ from 'lodash';
import appSyncClient from "./AppSyncClient";

export const useAppSyncQuery = (query, variables) => {
    const [result, setResult] = useState({
        loading: true,
        data: null
    });

    const appSyncInvoke = async (query, vars) => {
        const ret = await appSyncClient.query(query, vars);
        setResult({
            loading: false,
            data: ret
        });
    }

    useDeepCompareEffect(() => {
        appSyncInvoke(query, variables);
    }, [query, variables]);

    return result;
};


// TODO: this re-subscribes every render.  Find out how to get true componentDidMount() behavior
export const useAppSyncSubs = (initialQuery, initialVars) => {
    const [query] = useState(initialQuery)
    const [vars] = useState(initialVars)
    const [subscription, setSubscription] = useState(initialVars)
    const [notification, setNotification] = useState({});

    const unsubscribe = useCallback(() => {
      if (!_.isUndefined(subscription)) {
        subscription.unsubscribe();
        setSubscription(undefined);
      }
    }, [subscription]);

    useDeepCompareEffect(() => {
      const fetchSubscription = async () => {
        setSubscription(await appSyncClient.subscribe(query, vars, (msg) => setNotification(msg)));
      }
      fetchSubscription();
      return () => {
        unsubscribe();
      };
    }, [query, vars]);

    return notification;
};
