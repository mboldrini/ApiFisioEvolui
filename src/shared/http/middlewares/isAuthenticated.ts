import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface ITokenPayload {
	user_code: string;
	email: string;
}

export default function isAuthenticated(request: Request, response: Response, next: NextFunction): void {
	const authHeader = request.headers.authorization;

	if (!authHeader) {
		throw new AppError('JWT Token is missing');
	}

	const [, token] = authHeader.split(' ');

	try {
		const decodeToken = verify(token, authConfig.jwt.secret);

		const { user_code, email } = decodeToken as ITokenPayload;

		request.user = {
			user_code,
			email,
		};

		return next();
	} catch {
		throw new AppError('Invalid JWT token');
	}
}
