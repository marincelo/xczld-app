import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import store from './store';

export default function(selectors, actions) {
  const mapStateToProps = state =>
    Object.keys(selectors)
      .map(selector => ({
        [selector]: selectors[selector](state)
      }))
      .reduce((previous, current) => ({ ...previous, ...current }));

  const mapDispatchToProps = dispatch =>
    Object.keys(actions)
      .map(action => ({
        [action]: actions[action](dispatch)
      }))
      .reduce((previous, current) => ({ ...previous, ...current }));

  return component => connect(mapStateToProps, mapDispatchToProps)(component);
}
