import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface ITokenPayload {
	uid: string;
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

		const { uid, email } = decodeToken as ITokenPayload;

		request.user = {
			uid,
			email,
		};

		//	response.locals.token = decodeToken;

		return next();
	} catch {
		throw new AppError('Invalid JWT token');
	}
}
