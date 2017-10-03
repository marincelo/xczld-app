import expand from '../expand';
import { dataRetentionThreshold } from '../../config';

const initialState = {
  races: [],
  loadedAt: false,
  loading: false
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

const isLoaded = ({ races }) =>
  races && races.loaded && Date.now() - races.loaded > dataRetentionThreshold;

export const load = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: client => client.get('races.json')
});

export const initialLoad = () => (dispatch, getState) =>
  !isLoaded(getState()) && dispatch(load());
