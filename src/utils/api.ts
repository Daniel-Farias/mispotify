import axios from 'axios';
const token = JSON.parse(window.localStorage.getItem('token') as string);

const api = axios.create({
	baseURL: 'https://api.spotify.com/',
	headers: {
		Authorization: `Bearer ${token ? token.access_token : ''}`
	}
});

export default api;