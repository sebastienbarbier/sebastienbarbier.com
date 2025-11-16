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

    // Find minimum start date and maximum end date
    let minStart: Date | null = null;
    let maxEnd: Date | null = null;

    position_list.forEach((position: any) => {
      const startDate = position.date.start;
      const endDate = position.date.end || new Date();

      if (minStart === null || startDate < minStart) {
        minStart = startDate;
      }

      if (maxEnd === null || endDate > maxEnd) {
        maxEnd = endDate;
      }
    });

    if (minStart === null || maxEnd === null) {
      return "";
    }

    // Calculate duration between min start and max end
    const duration = (maxEnd as Date).getTime() + 1000 * 60 * 60 * 24 - (minStart as Date).getTime();

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
