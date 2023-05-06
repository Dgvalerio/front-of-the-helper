import { MutationTuple } from '@apollo/client';

export interface AppointmentSchema {
  appointments: {
    client?: { label: string; value: string };
    project?: { label: string; value: string };
    category?: { label: string; value: string };
    date: string;
    start: string;
    end: string;
    description: string;
  }[];
}

export namespace TimesheetAppointmentCreate {
  export interface Appointment {
    client: string;
    project: string;
    category: string;
    date: string;
    startTime: string;
    endTime: string;
    notMonetize?: boolean;
    commitLink?: string;
    description: string;
  }

  export interface Input {
    appointments: Appointment[];
  }

  export interface Output extends Appointment {
    success: boolean;
    errorMessage?: string;
  }

  export type Hook = () => MutationTuple<
    { createTimesheetAppointments: Output[] },
    { data: Input }
  >;
}
