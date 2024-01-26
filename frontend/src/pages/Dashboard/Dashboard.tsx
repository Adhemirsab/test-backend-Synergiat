import type { FC } from 'react';
import { CardsPost } from '../../components/CardsPost/CardsPost';

type DashboardProps = object;

export const Dashboard: FC<DashboardProps> = () => {
	return (
		<div>
			<CardsPost />
		</div>
	);
};
