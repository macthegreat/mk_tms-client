import { inject } from "@angular/core";

import {
  signalStore,
  withMethods,
  patchState,
} from "@ngrx/signals";

import {
  withEntities,
  setAllEntities,
  removeEntity,
} from "@ngrx/signals/entities";

import { catchError, EMPTY } from "rxjs";

import { CourseService } from "../services/course.service";

export const CourseStore = signalStore(
  { providedIn: "root" },

  withEntities<any>(),

  withMethods((store, svc = inject(CourseService)) => ({
    deleteCourse(id: number) {
      const previousSnapshot = store.entities();

      // Optimistically remove the course
      patchState(store, removeEntity(id));

      svc.delete(id).pipe(
        catchError((err) => {
          // Restore the course when the API returns an error
          patchState(store, setAllEntities(previousSnapshot));

          console.error(
            "Cannot delete course: active student enrollments exist.",
            err
          );

          return EMPTY;
        })
      ).subscribe();
    },
  }))
);