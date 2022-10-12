import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
// pra ele passar a usar aquela classe de erros ao invés do server só dar console e n falar nada
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes/routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errors()); //se o celebrate der erro, vem por aqui

///Middleware de erros
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
	if (error instanceof AppError) {
		return response.status(error.statusCode).json({
			status: 'error',
			message: error.message,
		});
	}

	return response.status(500).json({
		status: 'error',
		message: 'Internal server error - ',
		error,
	});
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
	console.log('		--⭐--		');
	console.log('🚀 Server started on port ' + PORT + '  🚀🤑');
	console.log('		--⭐--		');
});
