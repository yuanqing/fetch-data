import hoistStatics from 'hoist-non-react-statics';
import React, { Component } from 'react';

export default function fetchData(callback) {
  return (WrappedComponent) => {
    class FetchData extends Component {
      render() {
        return <WrappedComponent {...this.props} />;
      }
    }
    FetchData.fetchData = callback;
    return hoistStatics(FetchData, WrappedComponent);
  };
}

export function fetchAllData(components, getState, dispatch) {
  return Promise.all(
    components.filter((component) => component && component.fetchData)
      .map((component) => component.fetchData)
      .map(fetchData => fetchData(getState, dispatch))
  );
};
