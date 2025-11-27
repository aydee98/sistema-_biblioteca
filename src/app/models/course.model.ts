import { Course } from '../interfaces/course.interface';

export class CourseModel implements Course {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public duration: number,
    public instructor: string,
    public price?: number
  ) {}
}