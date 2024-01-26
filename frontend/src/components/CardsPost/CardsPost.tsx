import type { FC } from 'react';
import { Grid } from '@mui/material';
import { CardPost } from '../CardPost/CardPost';
import { usePostsStore } from '../../store/usePostsStore';

type CardsPostProps = object;

export const CardsPost: FC<CardsPostProps> = () => {
	const posts = usePostsStore(state => state.posts);
	console.log(posts);

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
