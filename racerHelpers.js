import { categories } from './constants';
import React from 'react';
import { ListItem } from 'react-native-elements';


const compareRacers = (a, b) => {
  // sort by points
  if (a.total_points < b.total_points) {
    return 1;
  }
  else if (a.total_points >  b.total_points) {
    return -1;
  }
  else {
    return 0;
  }
};

const compareRaceResults = (race) => (a, b) => {
  if (race.ended_at) {
    // sort by finish_time
    if (a.finish_time > b.finish_time) {
      return 1;
    }
    else if (a.finish_time <  b.finish_time) {
      return -1;
    }
    else {
      return 0;
    }
  }
  else {
    // sort by start_number
    if (a.racer.start_number.value > b.racer.start_number.value) {
      return 1;
    }
    else if (a.racer.start_number.value <  b.racer.start_number.value) {
      return -1;
    }
    else {
      return 0;
    }
  }
};

export const getSectionsWithData = (items, race) => {
  const sections = [];

  if (items && items.length > 0) {
    categories.forEach(category => {
      if (items[0].racer_id) { // race results
        var data = items.filter(({ racer }) => racer.category === category);

        const finished = data.filter( raceResult => raceResult.status === 3 ).sort(compareRaceResults(race));
        const unfinished = data.filter( raceResult => raceResult.status !== 3 ).sort(compareRaceResults(race));


        data = finished.concat(unfinished);
      }
      else { // racers
        var data = items
        .filter(racer => racer.category === category)
        .sort(compareRacers);
      }

      sections.push({
        title: category.toUpperCase(),
        count: data.length,
        data: data
      });
    });
  }
  return sections;
};

export const renderSectionHeader = ({section}) => (<ListItem
  titleStyle={{ fontWeight: 'bold', fontSize: 22 }}
  title={section.title}
  subtitle={`${section.count} natjecatelja`}
  hideChevron={true}
/>);
