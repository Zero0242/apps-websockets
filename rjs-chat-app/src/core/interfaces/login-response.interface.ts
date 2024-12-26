export interface ILoginResponse {
	user: Usuario;
	token: string;
}

export interface Usuario {
	id: string;
	email: string;
	name: string;
	avatar: string;
	online: boolean;
}
