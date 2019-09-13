import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kudoJsonArray'
})
export class KudoJsonArrayPipe implements PipeTransform {

  transform(value: string, divider: string = '', pattern: string = '$', mapField: string = '-'): any {
    let result = value;
    try {
      let arr = JSON.parse(value);
      if (mapField !== '-') {
        arr = arr.map((e: any) => e[mapField]);
      }
      if (arr && Array.isArray(arr)) {
        result = arr.map(e => pattern.split('$').join(e)).join(divider);
      }
    } catch (e) {
    }
    return result;
  }

}
