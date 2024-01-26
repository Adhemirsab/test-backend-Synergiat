export interface Post {
	title: string;
	body: string;
	image: File | Blob | null;
	_id?: string;
	url?: string;
}
