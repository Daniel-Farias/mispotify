import React, { useState, useEffect} from 'react';
import { useLocation } from "react-router-dom";
import MiBand from '../../utils/miband';
import { initServer } from '../../utils/functions';
import LogoSpotify from '../../assets/spotify.png';
import MiBandLogo from '../../assets/band.png';
import * as S from './styles';

export const Home: React.FC = () => {
  const [spotifyStatus, setSpotifyStatus] = useState('connect');
  const [miBandStatus, setMiBandStatus] = useState('connect');
  const [loginBtn, setLoginBtn] = useState(true);
  const [scanBtn, setScanBtn] = useState(false);
  const location = useLocation();
  const image = document.querySelector("img") as HTMLImageElement;

  async function scan() {
    try {
      setMiBandStatus('searching');
      image.src = MiBandLogo;

      const device = await navigator.bluetooth.requestDevice({
        filters: [
          { services: [MiBand.advertisementService] }
        ],
        optionalServices: MiBand.optionalServices
      });

      device.addEventListener('gattserverdisconnected', () => {
        setMiBandStatus('device disconnected');
        setScanBtn(true);
      });

      device.gatt?.disconnect();

      setMiBandStatus('connecting to the device...');
      const server = await device.gatt?.connect();
      
      setMiBandStatus('loading functions');
      setScanBtn(false);
      await initServer(server);
      
      setMiBandStatus('connected');
      image.src = LogoSpotify;
    } catch (error) {
      throw new Error(error as string);
    }
  }
  
  function login() {
    const state = (Math.random() + 1).toString(36).substring(17);
    const scope = 'user-read-playback-state user-modify-playback-state';
    let url = 'https://accounts.spotify.com/authorize';
    
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(process.env.REACT_APP_CLIENT_ID as string);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(process.env.REACT_APP_REDIRECT_URI as string);
    url += '&state=' + encodeURIComponent(state);
    
    window.location.href = url;
  }

  useEffect(() => {
    if(location.state === 'success') {
      setSpotifyStatus('connected');
      setLoginBtn(false);
      setScanBtn(true);
    }
  }, []);

  return (
    <S.Container>
      <S.Content>
        <S.SonarWrapper>
          <S.SonarEmitter>
            <img src={LogoSpotify} alt="Logo" />
            <S.SonarWave />
          </S.SonarEmitter>
        </S.SonarWrapper>

        <S.Text>Spotify: <p>{spotifyStatus}</p></S.Text>
        <S.Text>MiBand: <p>{miBandStatus}</p></S.Text>

        <S.ButtonsContainer>
          <S.Button onClick={login} disabled={!loginBtn}>Login</S.Button>
          <S.Button onClick={scan} disabled={!scanBtn}>Search MiBand</S.Button>
        </S.ButtonsContainer>
      </S.Content>
    </S.Container>
  );
}