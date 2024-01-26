import type { FC } from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

import { Post } from '../../models/post';

type CardPostProps = {
	post: Post;
};

export const CardPost: FC<CardPostProps> = ({ post }) => {
	return (
		<Card sx={{ minWidth: 500, maxWidth: 500 }}>
			<CardMedia
				component='img'
				height='200'
				image={post.url}
				alt={post.title}
			/>
			<CardContent>
				<Typography variant='h5' component='div'>
					{post.title}
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					{post.body}
				</Typography>
			</CardContent>
		</Card>
	);
};
