import { useState, useEffect } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
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
export const useAppSyncSubs = (query, variables={}) => {
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const subscription = appSyncClient.subscribe(query, variables, (msg) => setNotification(msg));
        return () => subscription.unsubscribe();
    }, [query, variables]);

    return notification;
};
