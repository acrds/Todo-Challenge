import { create } from 'zustand';

export const useProjectStore = create(
    (set) => ({
    globalProject: [],
    setGlobalProject: (project) => set({ globalProject: project }),
    resetGlobalProject: () => set({ globalProject: [] }),
}));
