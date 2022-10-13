export default {
	jwt: {
		secret: process.env.APP_SECRET || 'safasfasffas',
		expiresIn: '1d',
	},
};
