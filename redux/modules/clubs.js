import expand from '../expand';

const initialState = {
  clubs: [],
  loadedAt: false,
  loading: false
};

const { LOAD, LOAD_SUCCESS, LOAD_FAIL } = expand('clubs');

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loadedAt: Date.now(),
        clubs: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loadedAt: false,
        error: action.error
      };
    default:
      return state;
  }
}

const doLoad = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: client => client.get('clubs.json')
});

export function load(dispatch) {
  return () => dispatch(doLoad());
}
