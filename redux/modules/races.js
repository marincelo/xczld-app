import expand from '../expand';
import raceList from '../../components/raceList';
import client from '../../utils/apiClient';
import noop from '../../utils/noop';

const initialState = {
  races: [],
  loadedAt: false
};

const { LOAD, LOAD_SUCCESS, LOAD_FAIL } = expand('races');

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
        races: action.result
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
  promise: client => client.get('races.json')
});

export function load(dispatch) {
  return () => dispatch(doLoad());
}
