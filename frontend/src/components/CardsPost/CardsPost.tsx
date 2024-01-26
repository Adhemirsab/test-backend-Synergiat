import { useEffect, type FC } from 'react';
import { Grid } from '@mui/material';
import { CardPost } from '../CardPost/CardPost';
import { usePostsStore } from '../../store/usePostsStore';
import { getPosts } from '../../services/postService';

type CardsPostProps = object;

export const CardsPost: FC<CardsPostProps> = () => {
	const { posts, setPosts } = usePostsStore();
	useEffect(() => {
		const loadPosts = async () => {
			const postsFromDb = await getPosts();
			setPosts(postsFromDb);
		};

		loadPosts();
	}, []);

	return (
		<Grid container spacing={3} sx={{ padding: 2 }}>
			{posts.map((post, index) => (
				<Grid item key={index}>
					<CardPost post={post} />
				</Grid>
			))}
		</Grid>
	);
};
