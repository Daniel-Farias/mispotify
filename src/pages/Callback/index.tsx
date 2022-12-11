import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export const Callback: React.FC = () => {
  const navigate = useNavigate();

  function getToken() {
    let params = window.location.hash;

    if(params) {
      // transform parans in an object json.
      params = params.replace('#', '');
      const token = JSON.parse('{"' + decodeURI(params).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
  
      window.localStorage.setItem('token', JSON.stringify(token));
      navigate("/", { state: 'success' });
    }
  }

  useEffect(() => {
    getToken();
  }, []);

  return <br />;
}