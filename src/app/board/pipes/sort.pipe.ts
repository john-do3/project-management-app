import { Pipe, PipeTransform } from '@angular/core';
import { ITaskState } from '../../redux/state-models';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  private compareFunction = (a:ITaskState, b:ITaskState): number => {
    // let first: string | number;
    // let second: string | number;
    // switch ((<SortParameter> this.sortParameter)) {
    //   case 'date':
    //     first = new Date(a.snippet.publishedAt).getTime();
    //     second = new Date(b.snippet.publishedAt).getTime();
    //     break;
    //   case 'views':
    //     first = a.statistics.viewCount;
    //     second = b.statistics.viewCount;
    //     break;
    //   default:
    //     first = new Date(a.snippet.publishedAt).getTime();
    //     second = new Date(b.snippet.publishedAt).getTime();
    //     break;
    // }
    return a.order - b.order;
  };

  transform(
    array: ITaskState[],
  ): ITaskState[] {


    return array.sort(this.compareFunction);
  }


}
