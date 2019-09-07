import { useState } from 'react';
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
