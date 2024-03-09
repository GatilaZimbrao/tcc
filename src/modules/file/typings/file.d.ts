export interface File {
  id: string;
  name: string;
  type: string;
  file_name: string;
}

export type ListFileResponse = File[];

export type GetFileResponse = File;

export type CreateFileResponse = File;
