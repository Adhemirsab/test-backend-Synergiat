import * as Yup from 'yup';

export const validationSchema = Yup.object({
	title: Yup.string()
		.required('El título es requerido')
		.min(2, 'El título debe tener al menos 2 caracteres.')
		.max(50, 'El título no debe exceder los 50 caracteres'),
	body: Yup.string()
		.required('El contenido es requerido')
		.min(10, 'El contenido debe tener al menos 10 caracteres.'),
	image: Yup.mixed()
		.required('La imagen es requerida')
		.test(
			'fileSize',
			'El tamaño del archivo es demasiado grande',
			value => value instanceof File && value.size <= 4048576, // 1MB
		)
		.test(
			'fileType',
			'Formato no soportado',
			value =>
				value instanceof File &&
				['image/jpg', 'image/jpeg', 'image/png'].includes(value.type),
		),
});
