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
  const mapStateToProps = apply(selectors);
  const mapDispatchToProps = apply(actions);

  return component => connect(mapStateToProps, mapDispatchToProps)(component);
}
