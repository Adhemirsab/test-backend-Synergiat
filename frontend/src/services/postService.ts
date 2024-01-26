import { Post } from '../models/post';

export const getPosts = async (): Promise<Post[]> => {
	try {
		const response = await fetch('http://localhost:3002/api/post');
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const users = await response.json();
		return users;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const deletePost = async (id: string): Promise<void> => {
	try {
		const response = await fetch(`http://localhost:3002/api/post/${id}`, {
			method: 'DELETE',
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
	} catch (error) {
		console.error(`Failed to delete post with id ${id}: ${error}`);
	}
};
