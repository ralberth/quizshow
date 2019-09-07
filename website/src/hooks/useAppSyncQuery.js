import { useState } from 'react';
import { print as gqlToString } from 'graphql/language';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { AppSyncError } from './AppSyncError';
import { appSyncClient } from '../config/configureAppSync';

const useAppSyncQuery = (query, variables) => {
  const [request, setRequest] = useState({
    loading: true,
    error: false,
    data: {}
  });

  const appSyncQuery = async (query, variables={}) => {
    const queryString = gqlToString(query);
    try {
      const { data: response } = await appSyncClient.query({
        query: query,
        variables: variables
      });

      const keys = Object.keys(response);
      if (keys.length === 1 &&  response[keys[0]] !== null) {
        setRequest({
          loading: false,
          data: response,
          error: false
        });
      } else if (response[keys[0]] === null) {
        setRequest({
          loading: false,
          error: new AppSyncError(queryString, variables, 'AppSync query could not resolve variables!'),
          data: {}
        });
      } else {
        setRequest({
          loading: false,
          error: new AppSyncError(queryString, variables, 'AppSync query returned more than one object!'),
          data: {}
        });
      }
    }  catch (error) {
      setRequest({
        loading: false,
        error: new AppSyncError(queryString, variables, 'AppSync Query Failed!'),
        data: {}
      });
    }
  };

  useDeepCompareEffect(() => {
    appSyncQuery(query, variables);
  }, [query, variables]);

  return request;
};

export default useAppSyncQuery;
