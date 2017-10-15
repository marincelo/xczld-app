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
