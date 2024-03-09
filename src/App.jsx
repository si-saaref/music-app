import MusicPage from './pages/MusicPage.jsx';
import HomePage from './pages/HomePage.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
	return (
		<Router>
			<div className='lg:w-2/5 md:w-2/3 sm:w-full m-auto'>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/music/*' element={<MusicPage />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
