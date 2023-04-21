export namespace TimesheetInfosRead {
  export interface Output {
    id: string;
    login: string;
    iv: string;
    content: string;
    userId: string;
  }

  export interface Query {
    getOneTimesheetInfos: Output;
  }
}
