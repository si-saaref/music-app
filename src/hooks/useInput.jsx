import { createContext, useContext, useState } from 'react';

const InputContext = createContext();

// eslint-disable-next-line react/prop-types
export default function InputContextProvider({ children }) {
	const [inputMusic, setInputMusic] = useState('');

	return (
		<InputContext.Provider value={{ inputMusic, setInputMusic }}>{children}</InputContext.Provider>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export const useInput = () => useContext(InputContext);
