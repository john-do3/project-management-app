import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TasksService } from '../../board/services/tasks.service';

@Injectable()
export class MovieEffects {
  loadMovies$ = createEffect(() => { return this.actions$.pipe(
        ofType('[Column Component] Load Tasks'),
        mergeMap(() => this.tasksService.getTasks()
          .pipe(
            map(tasks => (
              { type: '[Tasks API] Tasks Loaded Success', payload: tasks }
            )),
            catchError(() => of({ type: '[Tasks API] Tasks Loaded Error' }))
          ),
        ),
  ) }
  );

  constructor(
    private actions$: Actions,
    private tasksService: TasksService,
  ) {
  }
}
