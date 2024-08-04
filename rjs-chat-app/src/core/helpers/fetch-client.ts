interface ClientConfig {
	headerInterceptor?: () => HeaderMap;
	debugMode?: boolean;
}

interface Options {
	headers?: HeaderMap;
}

interface FetchOptions {
	body?: BodyInit;
	headers?: HeaderMap;
}

type HeaderMap = Record<string, string>;

type HttpMethods = "GET" | "POST" | "PUT" | "DELETE";

export class FetchClient {
	constructor(
		private readonly baseURL: string,
		private options: ClientConfig = {}
	) {}

	get debugMode(): boolean {
		return this.options.debugMode ?? false;
	}

	private async handler(
		method: HttpMethods,
		endpoint: string,
		{ body, headers }: FetchOptions = {}
	) {
		// * Construccion del url
		const url = this.baseURL + endpoint;

		// * Generador de header
		let base: HeaderMap = {};
		if (this.options.headerInterceptor) {
			base = this.options.headerInterceptor();
		}

		// * Handler principal
		const resp = await fetch(url, {
			method,
			body,
			headers: { ...base, ...headers },
		});
		// * Para emitir un log
		if (this.debugMode)
			console.log(`[ ${method} ]: ${resp.status} ${endpoint}`);

		return resp;
	}

	get(endpoint: string, options: Options = {}): Promise<Response> {
		return this.handler("GET", endpoint, options);
	}
	post(endpoint: string, options: FetchOptions = {}): Promise<Response> {
		return this.handler("POST", endpoint, options);
	}
	put(endpoint: string, options: FetchOptions = {}): Promise<Response> {
		return this.handler("PUT", endpoint, options);
	}
	delete(endpoint: string, options: FetchOptions = {}): Promise<Response> {
		return this.handler("DELETE", endpoint, options);
	}
}
