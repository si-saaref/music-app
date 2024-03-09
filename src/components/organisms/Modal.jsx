import { IoClose } from 'react-icons/io5';

import { useEffect, useState } from 'react';
import { useInput } from '../../hooks/useInput';
import { useMusic } from '../../hooks/useMusic';
// import { createPortal } from 'react-dom';
import PortalModal from '../molecules/PortalModal';
import CustomButton from '../molecules/Button';
import { useNavigate } from 'react-router-dom';

export default function Modal({ handleClose }) {
	const [inputSearch, setInputSearch] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { setInputMusic } = useInput();
	const { setMusicData } = useMusic();

	const navigate = useNavigate();

	useEffect(() => {
		const closeOnEscapeKey = (e) => (e.key === 'Escape' ? handleClose() : null);
		document.body.addEventListener('keydown', closeOnEscapeKey);
		return () => {
			document.body.removeEventListener('keydown', closeOnEscapeKey);
		};
	}, [handleClose]);

	const searchMusic = async () => {
		if (inputSearch.trim().length === 0) {
			alert('Please fill name first to find songs');
			return;
		}
		setIsLoading((prevVal) => !prevVal);
		const inputText = inputSearch.replace(/\s/g, '+');
		const resp = await fetch(
			`https://itunes.apple.com/search?term=${inputText}&media=music&limit=4`
		);
		if (resp.status === 200) {
			const { results } = await resp.json();
			setInputMusic(inputSearch);
			setMusicData(results);
			setInputSearch('');
			setIsLoading((prevVal) => !prevVal);
			navigate(`/music/${inputText.toLowerCase()}`, { replace: true });
			handleClose();
		} else {
			alert('Cannot find the music');
		}
	};

	return (
		<PortalModal>
			<div className='w-screen h-screen bg-[#1c1c2de6] lg:w-2/5 md:w-2/3 sm:w-full m-auto left-1/2 -translate-x-1/2 absolute top-0 flex flex-col justify-center items-center'>
				<div className='action-button self-end p-3'>
					<IoClose className='text-white text-5xl cursor-pointer' onClick={handleClose} />
				</div>
				<div className='action-button-wrapper bottom-5 flex flex-col gap-3 w-full px-14 max-[320px]:px-2 flex-1 items-center justify-center'>
					<div className='relative w-full'>
						<input
							className='bg-white w-full py-3 rounded-full text-[#64748b] font-bold px-4 font-roboto'
							id='searchInputMusic'
							value={inputSearch}
							onChange={(e) => setInputSearch(e.target.value)}
							autoComplete='off'
						/>
						{inputSearch?.length === 0 && (
							<label
								className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-roboto text-[#64748b] font-bold whitespace-nowrap'
								htmlFor='searchInputMusic'
							>
								Artist / Album / Title
							</label>
						)}
					</div>
					<CustomButton
						className='w-full py-3 rounded-full bg-dark-glass text-white font-bold font-roboto bg-gradient-to-r from-[#7b34dd] to-[#a45deb] flex justify-center items-center'
						onClick={searchMusic}
						isLoading={isLoading}
					>
						Search
					</CustomButton>
				</div>
			</div>
		</PortalModal>
	);
}
