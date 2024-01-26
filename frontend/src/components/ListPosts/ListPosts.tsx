import { useEffect, type FC } from 'react';
import { usePostsStore } from '../../store/usePostsStore';
import { getPosts } from '../../services/postService';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';
type ListPostsProps = object;

const columns: GridColDef[] = [
	{
		field: 'title',
		headerName: 'Titulo',
		width: 150,
		editable: true,
	},
	{
		field: 'body',
		headerName: 'Contenido',
		width: 250,
		editable: true,
	},
	{
		field: 'url',
		headerName: 'Link imagen',
		width: 250,
		editable: true,
	},
	{
		field: 'delete',
		headerName: 'Eliminar',
		width: 150,
		renderCell: params => (
			<Button
				variant='contained'
				color='secondary'
				onClick={() => {
					usePostsStore.getState().deletePost(params.row.id);
				}}
			>
				Eliminar
			</Button>
		),
	},
];

export const ListPosts: FC<ListPostsProps> = () => {
	const { posts, setPosts } = usePostsStore();
	useEffect(() => {
		const loadPosts = async () => {
			const postsFromDb = await getPosts();
			setPosts(postsFromDb);
		};

		loadPosts();
	}, []);
	const transformedPosts = posts.map(post => ({
		id: post._id,
		title: post.title,
		body: post.body,
		url: post.url,
	}));
	console.log(posts);

	return (
		<Box sx={{ margin: '2rem' }}>
			<Typography
				variant='h4'
				fontWeight='bold'
				sx={{ textAlign: 'center', margin: ' 1.5rem 0' }}
			>
				Lista de Posts
			</Typography>
			<DataGrid
				rows={transformedPosts}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 5,
						},
					},
				}}
				pageSizeOptions={[5]}
			/>
		</Box>
	);
};
