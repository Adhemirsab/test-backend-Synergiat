import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Post } from '../models/post';
import { deletePost } from '../services/postService';

type PostsState = {
	posts: Post[];
	setPosts: (posts: Post[]) => void;
	deletePost: (id: string) => void;
};

export const usePostsStore = create<PostsState>()(
	persist(
		(set, get) => ({
			posts: [],
			setPosts: posts => set({ posts }),
			deletePost: async id => {
				const postToDelete = get().posts.find(post => post._id === id);

				if (!postToDelete) {
					console.error(`No post found with id ${id}`);
					return;
				}

				const newPosts = get().posts.filter(post => post._id !== id);
				set({ posts: newPosts });

				try {
					await deletePost(id);
				} catch (error) {
					console.error(`Failed to delete post with id ${id}: ${error}`);
					set({ posts: [...get().posts, postToDelete] });
				}
			},
		}),
		{
			name: 'posts-storage',
		},
	),
);
