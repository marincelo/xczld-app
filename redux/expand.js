const codes = {
  0: 'START',
  1: 'SUCCESS',
  '-1': 'FAIL',
  2: 'COMPLETE',
};

export const action = (name, prefix, code) => `${name}/${prefix}_${codes[code]}`;

export const actions = name => [action(name, 0), action(name, 1), action(name, -1)];

export default (expand = (name, prefix = 'LOAD') => ({
  [prefix]: action(name, prefix, 0),
  [`${prefix}_SUCCESS`]: action(name, prefix, 1),
  [`${prefix}_FAIL`]: action(name, prefix, -1),
  [`${prefix}_COMPLETE`]: action(name, prefix, 2)
}));
