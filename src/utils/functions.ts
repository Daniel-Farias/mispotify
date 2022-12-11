import MiBand from './miband';
import { SpotifyActions } from './actions';
const spotifyActions = new SpotifyActions();

export async function button(miband: any) {
	console.log(
		'- 1 Tap => Pause/Play Current Track','\n',
		'- 2 Taps => Next track','\n',
		'- 3 Taps => Previous track',
	);

	let taps = 0;
	miband.on('button', () => taps++);
	setInterval(function () {
		switch (taps) {
			case 1:
				spotifyActions.changePlayerState();
				break;
			case 2:
				spotifyActions.nextTrack();
				break;
			case 3:
				spotifyActions.previousTrack();
				break;
			default:
				break;
		}

		taps = 0;
	}, 2000);
}

export async function initServer(server: any) {
	const miband = new MiBand(server);
	await miband.init();

	// Init functions
	await button(miband);
}