import { TimesheetStoreTypes } from '@store/timesheet/types';

import { TimesheetClientRead } from '@/timesheet/client/read/types';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTimesheetStore = create<TimesheetStoreTypes>()(
  persist(
    (set) => ({
      dayTimes: [],

      setDayTimes(dayTimes): void {
        set({ dayTimes });
      },

      clients: [],

      setClients(clients: TimesheetClientRead.Client[]): void {
        set({ clients });
      },
    }),
    { name: 'the-helper:timesheet-storage' }
  )
);

export default useTimesheetStore;
