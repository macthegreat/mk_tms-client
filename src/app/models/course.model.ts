export interface Course { id: number;
code: string;
title: string; maxCapacity: number; enrollmentCount: number;
}
/** Envelope for `GET /api/courses` — TMS API contract list shape (`Pag edResponse<T>`). */
export interface PagedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}
 

export interface CourseLink {
  href: string;
  rel: string;
  method: string;
}


/** Detail payload — mirrors `CourseDetailDto` (list rows do not includ e `links`). */



export interface CourseDetail extends Course {
links: readonly CourseLink[]; }