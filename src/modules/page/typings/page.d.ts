export interface Page {
  id: string;
  pathName: string;
  title: string;
  description: string;
  additionalParams: { [key: string]: any };
}

export type ListPageResponse = Page[];

export type GetPageResponse = Page;

export type CreatePageResponse = Page;

export type UpdatePageResponse = Page;
