import api from './api';

export class SpotifyActions {
	private async getDeviceActive() {
		const response = await api.get('/v1/me/player/devices');
		return response.data.devices[0].id;
	}

	async play() {
		const device = await this.getDeviceActive();
		api.put('/v1/me/player/play', {
			device_id: device
		});
	
		console.log('Play Track');
	}
	
	async pause() {
		const device = await this.getDeviceActive();
		api.put('/v1/me/player/pause', {
			device_id: device
		});
	
		console.log('Pause Track');
	}

	async changePlayerState() {
		const { data } = await api.get('https://api.spotify.com/v1/me/player');
		data.is_playing ? this.pause() : this.play();
	}
	
	async nextTrack() {
		const device = await this.getDeviceActive();
		api.post('/v1/me/player/next', {
			device_id: device
		});
	
		console.log('Next Track');
	}
	
	async previousTrack() {
		const device = await this.getDeviceActive();
		api.post('/v1/me/player/previous', {
			device_id: device
		});
	
		console.log('Previous Track');
	}
}