import { createContext, useContext, useState } from 'react';

const MusicContext = createContext();

// eslint-disable-next-line react/prop-types
export default function MusicContextProvider({ children }) {
	const [musicData, setMusicData] = useState([]);

	return (
		<MusicContext.Provider value={{ musicData, setMusicData }}>{children}</MusicContext.Provider>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export const useMusic = () => useContext(MusicContext);
