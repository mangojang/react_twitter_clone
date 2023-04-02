const backURL = process.env.NODE_ENV === 'production'? 'http://api.mangotwitter.site:8080': 'http://localhost:8000';
const frontURL = process.env.NODE_ENV === 'production'? 'http://mangotwitter.site': 'http://localhost:3000';

export { backURL, frontURL };