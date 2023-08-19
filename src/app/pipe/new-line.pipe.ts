import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newLine'
})
export class NewLinePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
