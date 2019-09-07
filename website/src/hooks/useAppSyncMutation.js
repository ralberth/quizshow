import { useState, useEffect } from 'react';
import { print as gqlToString } from 'graphql/language';
import { AppSyncError } from './AppSyncError';
import { appSyncClient } from '../config/configureAppSync';

const useAppSyncMutation = (query, variables) => {
  const [mutation, setMutation] = useState({
    working: true,
    error: false,
    data: {}
  })

  const appSyncMutation = async (query, variables={}) => {
    const queryString = gqlToString(query);
    try {
      const { data: response } = await appSyncClient.mutate({
        mutation: query,
        variables: {
          input: variables
        }
      });
      const keys = Object.keys(response);
      if (keys.length === 1 &&  response[keys[0]] !== null) {
        setMutation({
          loading: false,
          data: response,
          error: false
        });
      } else if (response[keys[0]] === null) {
        setMutation({
          loading: false,
          error: new AppSyncError(queryString, variables, 'AppSync mutation could not resolve variables!'),
          data: {}
        });
      } else {
        setMutation({
          loading: false,
          error: new AppSyncError(queryString, variables, 'AppSync mutation returned more than one object!'),
          data: {}
        });
      }
    }  catch (error) {
      setMutation({
        loading: false,
        error: new AppSyncError(queryString, variables, 'AppSync mutation Failed!'),
        data: {}
      });
    }
  }

  useEffect(() => {
    appSyncMutation(query, variables)
  }, [query, variables]);

  return mutation;
};

export default useAppSyncMutation;
