import expand from '../expand';
import raceList from '../../components/raceList';
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

const request = () => ({
  type: LOAD
});

const receive = result => ({
  type: LOAD_SUCCESS,
  result
});

const fail = error => ({
  type: LOAD_FAIL,
  error
});

export const load = dispatch => () => {
  dispatch(request());

  return fetch('http://xczld.herokuapp.com/races.json')
    .then(response => response.json())
    .then(json => dispatch(receive(json)))
    .catch(err => dispatch(fail(err)));
};
