import { Teacher } from "../../teacher/typings/teacher";

export interface TeacherExtension {
  teacherId: string;
  extensionId: string;
  teacher: Teacher;
}
