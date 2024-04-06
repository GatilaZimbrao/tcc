export interface Teacher {
  id: string;
  name: string;
  image: string;
  education: string;
  linkLattes: string;
  type: string;
}

export type ListTeacherResponse = Teacher[];

export type GetTeacherResponse = Teacher;

export type CreateTeacherResponse = Teacher;

export type UpdateTeacherResponse = Teacher;
