import { categories } from './constants';

export const compareRacers = (a, b) => {
  if (this.state.race.ended_at) {
    // sort by finish_time
    if (a.racer.finish_time > b.racer.finish_time) {
      return 1;
    }
    else if (a.racer.finish_time <  b.racer.finish_time) {
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

export const getSectionsWithData = (racers) => {
  const sections = [];

  if (racers) {
    categories.forEach(category => {
      const data = racers
        .filter(racer => racer.category === category)
        .sort(compareRacers);

      sections.push({
        title: category.toUpperCase(),
        count: data.length,
        data: data
      });
    });
  }
  return sections;
};
