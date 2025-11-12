import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: false
})
export class DurationPipe implements PipeTransform {
  transform(value: any): String {
    let position_list = value;

    if (position_list instanceof Array == false) {
      position_list = [position_list];
    }

    let duration = 0;
    position_list.forEach((position: any) => {
      let dateEnd = new Date().getTime()
      if (position.date.end) {
        dateEnd = position.date.end.getTime()
      }
      duration = duration + (dateEnd + 1000 * 60 * 60 * 24 - position.date.start.getTime());
    });

    // Display from duration in millisecond a string with x years and y months
    let years = Math.floor(duration / (1000 * 60 * 60 * 24 * 365));
    let months = Math.floor((duration % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));

    let duration_str = "";
    if (years > 0) {
      duration_str += years + " yr" + (years > 1 ? "s" : "");
    }
    if (months > 0) {
      duration_str += (years > 0 ? " " : "") + months + " mo" + (months > 1 ? "s" : "");
    }

    return duration_str;
  }
}
