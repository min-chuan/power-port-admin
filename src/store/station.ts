import type { ChargingStationItem } from '@/types/station';
import { defineStore } from 'pinia';

interface StationStore {
  formData: ChargingStationItem;
}
const initialState = (): StationStore => {
  return {
    formData: {
      name: '',
      id: '',
      city: '',
      fast: undefined,
      slow: undefined,
      status: 1,
      now: undefined,
      fault: undefined,
      person: '',
      tel: '',
    },
  };
};
const useStationStore = defineStore('station', {
  state: initialState,
  actions: {
    setFormData(data: ChargingStationItem) {
      this.formData = data;
    },
    resetFormData() {
      this.formData = { ...initialState().formData };
    },
  },
});

export default useStationStore;
