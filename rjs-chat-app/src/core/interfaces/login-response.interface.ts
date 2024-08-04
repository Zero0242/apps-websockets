export interface ILoginResponse {
	usuario: Usuario;
	token: string;
}

export interface Usuario {
	id: number;
	email: string;
	name: string;
	avatar: string;
	online: boolean;
}
