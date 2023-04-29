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
