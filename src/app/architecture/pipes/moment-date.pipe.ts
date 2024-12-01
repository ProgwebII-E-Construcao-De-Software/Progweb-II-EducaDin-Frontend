import { Pipe, PipeTransform } from '@angular/core';
import moment from "moment";

@Pipe({
  name: 'momentDate'
})
export class MomentDatePipe implements PipeTransform {

  transform(value: string | Date, format: string = 'DD/MM/YYYY'): string {
    if (!value) return '';
    return moment(value).format(format);
  }

}
