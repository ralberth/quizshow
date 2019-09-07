class AppSyncError extends Error {
  constructor(query='', vars={}, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppSyncError);
    }

    this.name = 'AppSyncQueryError';
    this.query = query;
    this.vars = vars;
  }
}

class SubscriptionReducerError extends Error {
  constructor(state, type, payload, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppSyncError);
    }

    this.name = 'SubscriptionReducerError';
    this.state = state;
    this.type = type;
    this.payload = payload;
  }
}

export {
  AppSyncError,
  SubscriptionReducerError,
};
