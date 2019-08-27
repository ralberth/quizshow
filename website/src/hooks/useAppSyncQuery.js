import { useState } from 'react';
import API, { graphqlOperation } from '@aws-amplify/api';
import { print as gqlToString } from 'graphql/language'; // https://github.com/aws-amplify/amplify-js/issues/1237
import useDeepCompareEffect from 'use-deep-compare-effect';

const useAppSyncQuery = (query, variables) => {
  const [request, setRequest] = useState({
    loading: true,
    error: false,
    data: {}
  });

  const appSyncQuery = async (query, variables={}) => {
    try {
      const queryString = gqlToString(query);
      const { data } = await API.graphql(
        graphqlOperation(queryString, variables)
      );
      const keys = Object.keys(data);
      if (keys.length === 1) {
        setRequest({
          loading: false,
          data: data
        });
      }
      else {
        setRequest({
          loading: false,
          error: new Error('AppSync query returned more than one object!', data)
        });
      }
    } catch ({ errors }) {
      setRequest({
        loading: false,
        error: errors
      });
    }
  };

  useDeepCompareEffect(() => {
    appSyncQuery(query, variables);
  }, [query, variables]);

  return request;
};

export default useAppSyncQuery;
