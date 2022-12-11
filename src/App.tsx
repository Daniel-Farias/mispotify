import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from './styles/global';
import { Home } from './pages/Home';
import { Callback } from './pages/Callback';

const App: React.FC = () => (
	<Router>
		<GlobalStyle />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/callback" element={<Callback />} />
		</Routes>
	</Router>
);

export default App;