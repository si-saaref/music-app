import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInput } from '../hooks/useInput';
import { useMusic } from '../hooks/useMusic';
import CustomButton from '../components/molecules/Button';

export default function HomePage() {
	const [inputSearch, setInputSearch] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { setInputMusic } = useInput();
	const { setMusicData } = useMusic();

	const navigate = useNavigate();

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
		} else {
			alert('Cannot find the music');
		}
	};

	return (
		<div className='home-page-wrapper gradient-bottom h-screen overflow-hidden flex items-center relative flex-col justify-between py-14'>
			<div className='logo flex flex-col items-center justify-center flex-1'>
				<svg xmlns='http://www.w3.org/2000/svg' width='73' height='85' viewBox='0 0 73 85'>
					<g fill='none' fillRule='evenodd'>
						<g>
							<g>
								<path
									fill='#FFF'
									fillRule='nonzero'
									d='M6.57 80.6c.522 0 .936-.432.936-.954v-4.302c0-2.034-1.674-3.744-3.762-3.744-.702 0-1.368.216-1.908.558-.162-.342-.504-.558-.882-.558-.54 0-.954.432-.954.954v7.092c0 .522.414.954.954.954.468 0 .864-.342.954-.774.036-.072.036-.126.036-.18v-4.302c0-1.008.792-1.818 1.8-1.818 1.026 0 1.872.81 1.872 1.818v4.302c0 .522.45.954.954.954zm8.19 3.222c2.394 0 4.32-1.962 4.32-4.32v-6.948c0-.522-.414-.954-.954-.954-.468 0-.864.324-.954.756-.648-.468-1.476-.756-2.412-.756-1.188 0-2.286.522-3.06 1.332-.774.846-1.26 1.962-1.26 3.204 0 1.26.486 2.376 1.26 3.168.774.846 1.872 1.368 3.06 1.368.882 0 1.71-.27 2.358-.72-.234 1.098-1.188 1.926-2.358 1.926-.378 0-.72-.09-1.026-.252-.504-.216-1.062-.036-1.296.45-.252.486-.036 1.08.432 1.296.558.288 1.224.45 1.89.45zm0-5.094c-.63 0-1.224-.252-1.656-.738-.432-.414-.72-1.098-.72-1.854 0-.72.288-1.404.72-1.836.432-.504 1.026-.774 1.656-.774.684 0 1.242.27 1.71.774.396.432.684 1.116.684 1.836 0 .756-.288 1.44-.684 1.854-.468.486-1.026.738-1.71.738zM35.1 80.6c.522 0 .954-.432.954-.954V75.38c0-2.088-1.674-3.78-3.744-3.78-1.134 0-2.16.468-2.826 1.242-.684-.774-1.692-1.242-2.826-1.242-.684 0-1.35.198-1.926.54-.144-.342-.486-.54-.864-.54-.522 0-.954.414-.954.972v7.074c0 .468.342.828.774.936.054 0 .108.018.18.018.378 0 .738-.252.9-.576v-.09c.036-.036.036-.072.054-.108v-.054c0-.036.018-.09.018-.126V75.38c0-1.026.828-1.854 1.818-1.854 1.008 0 1.836.81 1.854 1.8v4.32c0 .485.404.892.865.948l.107.006c.522 0 .954-.432.954-.954v-4.32c.036-.99.846-1.8 1.872-1.8.99 0 1.818.828 1.818 1.854v4.266c0 .522.45.954.972.954zm8.496 0c2.07 0 3.798-1.692 3.798-3.744v-4.302c0-.504-.468-.954-.972-.954-.54 0-.936.45-.936.954v4.302c-.018 1.026-.846 1.836-1.89 1.836-1.026 0-1.836-.81-1.836-1.836v-4.302c0-.504-.414-.954-.954-.954-.522 0-.954.45-.954.954v4.302c0 2.052 1.692 3.744 3.744 3.744zm10.368 0c.882 0 1.692-.27 2.34-.72.648-.468 1.134-1.206 1.134-2.088 0-.414-.126-.828-.342-1.188-.306-.504-.792-.846-1.278-1.062-.522-.252-1.08-.414-1.674-.522h-.018l-.018-.018c-.612-.108-1.08-.27-1.314-.432-.126-.072-.18-.144-.198-.18-.036-.054-.036-.072-.036-.144 0-.09.054-.252.288-.414.234-.18.63-.324 1.08-.324.576 0 1.08.288 1.656.666.45.306 1.044.18 1.332-.252.25-.415.161-.953-.194-1.26l-.094-.072c-.576-.396-1.458-.99-2.7-.99-.828 0-1.584.234-2.214.666-.594.45-1.062 1.152-1.062 1.98 0 .414.108.81.306 1.134.324.486.756.81 1.242 1.044.468.216 1.008.36 1.566.468h.018c.648.126 1.188.324 1.44.504.144.09.216.162.234.216.036.054.054.09.054.18 0 .144-.072.324-.324.54-.288.18-.738.342-1.224.342-.702.018-1.512-.396-1.98-.792-.396-.342-1.026-.288-1.35.144-.324.396-.27 1.008.126 1.332.72.576 1.8 1.224 3.204 1.242zm6.948-10.26c.558 0 .972-.45.972-.99v-.378c0-.54-.414-.972-.972-.972-.54 0-.972.432-.972.972v.378c0 .54.432.99.972.99zm0 10.26c.558 0 .972-.432.972-.972v-7.02c0-.576-.414-.99-.972-.99-.54 0-.972.414-.972.99v7.02c0 .54.432.972.972.972zm8.01 0c1.08 0 2.088-.396 2.862-.954.414-.36.486-.936.198-1.332-.36-.432-.954-.504-1.35-.198-.468.342-1.062.576-1.71.576-1.458 0-2.664-1.188-2.664-2.574s1.206-2.592 2.664-2.592c.666 0 1.242.234 1.71.576.414.324.99.252 1.35-.18.288-.396.216-1.008-.198-1.332-.774-.594-1.782-.99-2.862-.99-2.484.018-4.572 2.016-4.572 4.518 0 2.466 2.088 4.482 4.572 4.482z'
									transform='translate(-134.000000, -255.000000) translate(134.000000, 256.000000)'
								/>
								<g stroke='#FFF' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'>
									<path
										d='M20 53.333V10L60 0v43.333m-40 10C20 57.017 15.523 60 10 60S0 57.017 0 53.333c0-3.683 4.477-6.666 10-6.666s10 2.983 10 6.666zm40-10C60 47.017 55.523 50 50 50s-10-2.983-10-6.667c0-3.683 4.477-6.666 10-6.666s10 2.983 10 6.666zm-40-20l40-10'
										transform='translate(-134.000000, -255.000000) translate(134.000000, 256.000000) translate(6.000000, 0.000000)'
									/>
								</g>
							</g>
						</g>
					</g>
				</svg>
			</div>
			<div className='action-button-wrapper bottom-5 flex flex-col gap-3 w-full px-14 max-[320px]:px-2'>
				<div className='relative w-full'>
					<input
						className='bg-white w-full py-3 rounded-full text-[#64748b] font-bold px-4 font-roboto'
						id='searchInputMusic'
						value={inputSearch}
						onChange={(e) => setInputSearch(e.target.value)}
						autoComplete='off'
					/>
					{inputSearch.length === 0 && (
						<label
							className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-roboto text-[#64748b] font-bold whitespace-nowrap'
							htmlFor='searchInputMusic'
						>
							Artist / Album / Title
						</label>
					)}
				</div>
				<CustomButton
					className='w-full py-3 rounded-full bg-dark-glass text-white font-bold font-roboto flex justify-center items-center'
					onClick={searchMusic}
					isLoading={isLoading}
				>
					Search
				</CustomButton>
			</div>
		</div>
	);
}
