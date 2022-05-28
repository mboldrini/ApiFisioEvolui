declare namespace Express {
	export interface Request {
		user: {
			user_code: string;
			email: string;
		};
	}
}
