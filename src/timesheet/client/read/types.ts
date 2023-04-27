import { OperationVariables } from '@apollo/client';

export namespace TimesheetClientRead {
  export interface Category {
    id: number;
    name: string;
  }

  export interface Project {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    categories: Category[];
  }

  export interface Client {
    id: string;
    title: string;
    projects: Project[];
  }

  export type Options = OperationVariables;

  export interface Query {
    getAllTimesheetClient: Client[];
  }
}
