import { TeacherExtension } from "./teacher_extension";

export interface Extension {
  id: string;
  name: string;
  abstract: string;
  email: string;
  isActive: boolean;
  site: string;
  type: string;
  teachers: TeacherExtension[];
}

export type ListExtensionResponse = Extension[];

export type GetExtensionResponse = Extension;

export type CreateExtensionResponse = Extension;

export type UpdateExtensionResponse = Extension;
