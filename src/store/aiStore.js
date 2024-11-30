import { create } from 'zustand';

export const useAIStore = create(
    (set) => ({
      selectedAI: 'ibm',
      toggleAI: () =>
        set((state) => ({
          selectedAI: state.selectedAI === 'ibm' ? 'gpt' : 'ibm',
        })),
    }),
);