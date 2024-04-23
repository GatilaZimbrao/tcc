export interface Extension {
  id: string;
  name: string;
  abstract: string;
  email: string;
  site: string;
  type: string;
  teacherId: number;
  teacher: Teacher;
}

export type ListExtensionResponse = Extension[];

export type GetExtensionResponse = Extension;

export type CreateExtensionResponse = Extension;

export type UpdateExtensionResponse = Extension;
