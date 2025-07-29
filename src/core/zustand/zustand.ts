import { create } from 'zustand';
import { PostItem } from '@/types';

type State = {
  post: PostItem[];
};

type Action = {
  add: (post: PostItem[]) => void;
  update: (post: PostItem) => void;
  delete: (id: number) => void;
  setAll: (post: PostItem[]) => void;
};

const usePostStore = create<State & Action>((set) => ({
  post: [],
  add: (post) => set((s) => ({ post: [...s.post, ...post] })),
  update: (post) => set((s) => ({
    post: s.post.map((p) => (p.id === post.id ? { ...p, ...post } : p)),
  })),
  delete: (id) => set((s) => ({
    post: s.post.filter((p) => p.id !== id),
  })),
  setAll: (post) => set(() => ({ post: [...post] })),
}));

export default usePostStore;
