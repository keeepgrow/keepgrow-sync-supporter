import { create } from "zustand";
import { AuthApi } from "../../api/auth";

interface User {
  client: string;
  exp: number;
  iat: number;
  nbf: number;
  project_id: string;
  project_idx: number;
  role: string[];
  sub: string;
}

interface UserStore {
  user: User | null;
  fetchUser: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  fetchUser: async () => {
    const res = await AuthApi.getUserData();
    if (res) {
      set({ user: res });
    }
  }
}));
