import type { FC } from 'react';
import { RegisterPost } from '../../components/RegisterPost/RegisterPost';

type CreatePostProps = object;

export const CreatePost: FC<CreatePostProps> = () => {
	return (
		<div>
			<RegisterPost />
		</div>
	);
};
