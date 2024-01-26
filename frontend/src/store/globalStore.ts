import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type GlobalState = {
	mode: 'dark' | 'light';
	toggleMode: () => void;
};

export const useStore = create<GlobalState>()(
	devtools(
		persist(
			set => ({
				mode: 'dark',
				toggleMode: () =>
					set(state => ({
						mode: state.mode === 'light' ? 'dark' : 'light',
					})),
			}),
			{
				name: 'my-app-storage',
				getStorage: () => localStorage,
			},
		),
	),
);
