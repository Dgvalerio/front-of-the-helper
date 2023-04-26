import { TimesheetStoreTypes } from '@store/timesheet/types';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTimesheetStore = create<TimesheetStoreTypes>()(
  persist(
    (set) => ({
      dayTimes: [],

      setDayTimes(dayTimes): void {
        set({ dayTimes });
      },
    }),
    { name: 'the-helper:timesheet-storage' }
  )
);

export default useTimesheetStore;
