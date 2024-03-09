import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import InputContextProvider from './hooks/useInput.jsx';
import MusicContextProvider from './hooks/useMusic.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<InputContextProvider>
			<MusicContextProvider>
				<App />
			</MusicContextProvider>
		</InputContextProvider>
	</React.StrictMode>
);
