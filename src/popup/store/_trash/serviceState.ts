import { create } from "zustand";
import { ServiceStateApi } from "../../../api/serviceState";

export const ServiceStateStore = create<{
  loaded: boolean;
  serviceState: ServiceState;
  fetchData: () => void;
}>((set, get) => ({
  loaded: false,
  serviceState: {
    widgetState: false
  },

  fetchData: async () => {
    const { loaded } = get();
    if (loaded) return;

    ServiceStateApi.get().then((res) => {
      set({
        loaded: true,
        serviceState: res
      });
    });
  },

  handleWidgetState: () => {
    set((state) => ({
      serviceState: {
        ...state.serviceState,
        widgetState: !state.serviceState.widgetState
      }
    }));
  }
}));

export interface ServiceState {
  widgetState: boolean;
}
