import { useState, useEffect } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import appSyncClient from "./AppSyncClient";
import { print as gqlToString } from 'graphql/language';

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


const oneLineQueryStr = (gql) => gqlToString(gql).replace(/\n/g, " ");


// TODO: this re-subscribes every render.  Find out how to get true componentDidMount() behavior
export const useAppSyncSubs = (query, variables={}) => {
    const [notification, setNotification] = useState(null);

    const handleNotification = (msg) => {
        console.log("Notification received", msg);
        setNotification(msg);
    }

    useEffect(() => {
        console.log(`Subscribing to "${oneLineQueryStr(query)}"`);
        const subscription = appSyncClient.subscribe(query, variables, (data) => handleNotification(data));
        return () => {
          console.log(`Unsubscribed from "${oneLineQueryStr(query)}"`);
          subscription.unsubscribe();
        }
    }, [query, variables]);

    return notification;
};
