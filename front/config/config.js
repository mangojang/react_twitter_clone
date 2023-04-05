const backURL = process.env.NODE_ENV === 'production'? process.env.BACK_URL: 'http://localhost:8000';
const frontURL = process.env.NODE_ENV === 'production'? process.env.FRONT_URL: 'http://localhost:3000';

export { backURL, frontURL };