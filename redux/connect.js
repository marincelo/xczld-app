import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import store from './store';

const flattenObjects = (prev, curr) => ({ ...prev, ...curr });

const apply = functions => arg =>
  Object.keys(functions)
    .map(f => ({
      [f]: functions[f](arg)
    }))
    .reduce(flattenObjects);

export default function(selectors, actions) {
  // If component doesn't use state,
  // it doesn't need to know about redux
  if (!selectors) {
    const boundActions = bindActionCreators(actions, store.dispatch);

    return component => props =>
      React.createElement(component, {
        dispatch: store.dispatch,
        ...props,
        ...boundActions
      });
  }

  const mapStateToProps = apply(selectors);

  return component => connect(mapStateToProps, actions)(component);
}
