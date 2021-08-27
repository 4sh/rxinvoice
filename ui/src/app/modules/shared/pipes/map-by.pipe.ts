import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'mapBy'})
export class MapByPipe implements PipeTransform {

    transform (input: any[], key: string): any {
        return input.map(value => value[key]);
    }
}
