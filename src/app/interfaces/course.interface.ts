export interface Course {
  id: number;
  name: string;
  description: string;
  duration: number;
  instructor: string;
  price?: number;
  createdAt?: Date;
}