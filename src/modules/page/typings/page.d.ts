export interface Page {
  id: string;
  pathName: string;
  title: string;
  description: string;
}

export type ListPageResponse = Page[];

export type GetPageResponse = Page;

export type CreatePageResponse = Page;

export type UpdatePageResponse = Page;
