import { connect } from 'react-redux';

const flattenObjects = (prev, curr) => ({ ...prev, ...curr });

const apply = functions => arg =>
  Object.keys(functions)
    .map(f => ({
      [f]: functions[f](arg)
    }))
    .reduce(flattenObjects);

export default function(selectors, actions) {
  const mapStateToProps = selectors && apply(selectors);
  const mapDispatchToProps = actions && apply(actions);

  return component => connect(mapStateToProps, mapDispatchToProps)(component);
}
