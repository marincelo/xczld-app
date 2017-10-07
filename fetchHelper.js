import { serverUrl } from './constants';

export const load = (type) => function () {
  this.setState({refreshing: true});

  fetch(`${serverUrl}/${type}.json`)
  .then(response => response.json())
  .then(json => this.setState({[type]: json, refreshing: false}))
  .catch(error => console.log(error));
},
loadResource = (type, resourceId) => function () {
  fetch(`${serverUrl}/${type}s/${resourceId}.json`)
  .then(response => response.json())
  .then(json => this.setState({[type]: json}))
  .catch(error => console.log(error));
};
