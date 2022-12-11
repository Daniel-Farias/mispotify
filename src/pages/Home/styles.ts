import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
	background: #000;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SonarWrapper = styled.div`
  position: relative;
  z-index: 0;
`;

export const SonarEmitter = styled.div`
  position: relative;
  margin: 32px auto;
  width: 100px;
  height: 100px;
  border-radius: 50%;

  img {
    width: 100px;
    height: 100px;
  }
`;

export const SonarWave = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #ffffff;
  opacity: 0;
  z-index: -1;
  pointer-events: none;
  animation: sonarWave 2s linear infinite;

  @keyframes sonarWave {
    from {
      opacity: 0.4;
    }
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;

export const Text = styled.span`
  display: flex;
  margin-top: 12px;
  font-size: 18px;

  p {
    text-transform: capitalize;
    margin-left: 5px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;

export const Button = styled.button`
  margin: 2px;
  width: 100%;
  border: 0;
  padding: 15px;
  border-radius: 5px;
  color: #fff;
  background: #5cb181;

  &:focus {
    outline: 0;
  }

  &:disabled {
    background: #c6c6c6;
    cursor: not-allowed;
  }
`;