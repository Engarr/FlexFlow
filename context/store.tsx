import { formatDateTime } from '@/utils/date-transform';
import { create } from 'zustand';

type StoreType = {
  selectedDate: Date;
  actualDay: {
    date: string;
    time: string;
    dayOfTheWeek: string;
  };
  changeDay: (newDate: Date) => void;
};

const useStore = create<StoreType>((set) => {
  const selectedDate = new Date();
  return {
    selectedDate,
    actualDay: formatDateTime(selectedDate),
    changeDay: (newDate: Date) =>
      set(() => ({
        selectedDate: newDate,
        actualDay: formatDateTime(newDate),
      })),
  };
});

export default useStore;
