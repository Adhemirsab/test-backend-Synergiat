import { Button, Container, TextField, Typography } from '@mui/material';
import { useState, type FC } from 'react';
import { useFormik } from 'formik';
import FormStatusMessage from '../FormStatusMessage/FormStatusMessage';
import { Post } from '../../models/post';
import { validationSchema } from '../../utilities/postValidators';
type RegisterPostProps = object;

const initialValues: Post = {
	title: '',
	body: '',
	image: null,
};
export const RegisterPost: FC<RegisterPostProps> = () => {
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const formik = useFormik({
		initialValues,
		validationSchema: validationSchema,
		onSubmit: async (values, { resetForm }) => {
			console.log(values);

			setIsSubmitting(true);
			try {
				// Crea un objeto FormData
				const formData = new FormData();

				formData.append('title', values.title);
				formData.append('body', values.body);

				if (values.image) {
					formData.append('image', values.image);
				}

				const response = await fetch('http://localhost:3002/api/post', {
					method: 'POST',

					body: formData,
				});
				if (!response.ok) {
					setIsError(true);
					throw new Error('Error al enviar el formulario');
				} else {
					setIsSuccess(true);
				}
				const data = await response.json();
				console.log(data);
			} catch (error) {
				console.log(error);
				setIsError(true);
			} finally {
				setIsSubmitting(false);
			}
			resetForm();
		},
	});
	return (
		<Container
			sx={{ margin: '2rem', border: '2px solid grey', borderRadius: '10px' }}
		>
			<Typography
				variant='h4'
				fontWeight='bold'
				sx={{ textAlign: 'center', margin: ' 1.5rem 0' }}
			>
				Crear un Post
			</Typography>
			<form
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '1rem',
					paddingBottom: '1rem',
				}}
				onSubmit={formik.handleSubmit}
			>
				<TextField
					fullWidth
					id='title'
					name='title'
					label='title'
					value={formik.values.title}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.title && Boolean(formik.errors.title)}
					helperText={formik.touched.title && formik.errors.title}
				/>
				<TextField
					fullWidth
					id='body'
					name='body'
					label='contenido'
					multiline
					rows={4}
					value={formik.values.body}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={formik.touched.body && Boolean(formik.errors.body)}
					helperText={formik.touched.body && formik.errors.body}
				/>
				<Button variant='contained' component='label'>
					Subir Imagen
					<input
						type='file'
						hidden
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							formik.setFieldValue(
								'image',
								event.currentTarget.files ? event.currentTarget.files[0] : null,
							);
						}}
						onBlur={formik.handleBlur}
					/>
				</Button>
				{formik.touched.image && formik.errors.image ? (
					<div>{formik.errors.image}</div>
				) : null}

				<FormStatusMessage
					isSubmitting={isSubmitting}
					isSuccess={isSuccess}
					isError={isError}
				/>
				<Button
					size='large'
					color='secondary'
					variant='contained'
					type='submit'
					sx={{ fontWeight: 'bold' }}
				>
					Crear Post
				</Button>
			</form>
		</Container>
	);
};
