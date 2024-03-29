import { RxHamburgerMenu, RxMagnifyingGlass } from 'react-icons/rx';
import { TbDatabaseX } from 'react-icons/tb';
import Card from '../components/organisms/Card';
import { useNavigate } from 'react-router';
import { useInput } from '../hooks/useInput';
import { useMusic } from '../hooks/useMusic';
import Modal from '../components/organisms/Modal';
import { useEffect, useState } from 'react';
import { ListPopularArtists } from '../utils/Data';
import ArtistTag from '../components/molecules/ArtistTag';
import CustomButton from '../components/molecules/Button';

export default function MusicPage() {
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { inputMusic } = useInput();
	const { musicData, setMusicData } = useMusic();

	const navigate = useNavigate();

	useEffect(() => {
		if (musicData.length === 0) {
			navigate('/music', { replace: true });
		}
	}, [musicData, navigate]);

	const loadMoreMusic = async () => {
		setIsLoading((prevVal) => !prevVal);
		const inputText = inputMusic.replace(/\s/g, '+');
		const resp = await fetch(
			`https://itunes.apple.com/search?term=${inputText}&media=music&limit=${(musicData.length += 3)}`
		);
		if (resp.status === 200) {
			const { results } = await resp.json();
			setIsLoading((prevVal) => !prevVal);
			setMusicData(results);
		} else {
			alert('Cannot load more music');
		}
	};

	const searchNewSong = () => {
		setIsOpenModal(true);
	};

	return (
		<>
			<div className='main-page-wrapper relative bg-[rgb(248,250,252)] h-screen  overflow-x-hidden'>
				<div className='header-wrapper flex justify-between items-center h-14 bg-gradient-to-r from-[#7b34dd] to-[#a45deb] p-2'>
					<div className='drawer'>
						<RxHamburgerMenu className='text-white text-2xl cursor-pointer' />
					</div>
					<div
						className='title text-white text-xl font-bold cursor-pointer'
						onClick={() => navigate('/')}
					>
						<svg xmlns='http://www.w3.org/2000/svg' width='73' height='16' viewBox='0 0 73 16'>
							<g fill='none' fillRule='evenodd'>
								<g fill='#FFF' fillRule='nonzero'>
									<path
										d='M140.57 34.6c.522 0 .936-.432.936-.954v-4.302c0-2.034-1.674-3.744-3.762-3.744-.702 0-1.368.216-1.908.558-.162-.342-.504-.558-.882-.558-.54 0-.954.432-.954.954v7.092c0 .522.414.954.954.954.468 0 .864-.342.954-.774.036-.072.036-.126.036-.18v-4.302c0-1.008.792-1.818 1.8-1.818 1.026 0 1.872.81 1.872 1.818v4.302c0 .522.45.954.954.954zm8.19 3.222c2.394 0 4.32-1.962 4.32-4.32v-6.948c0-.522-.414-.954-.954-.954-.468 0-.864.324-.954.756-.648-.468-1.476-.756-2.412-.756-1.188 0-2.286.522-3.06 1.332-.774.846-1.26 1.962-1.26 3.204 0 1.26.486 2.376 1.26 3.168.774.846 1.872 1.368 3.06 1.368.882 0 1.71-.27 2.358-.72-.234 1.098-1.188 1.926-2.358 1.926-.378 0-.72-.09-1.026-.252-.504-.216-1.062-.036-1.296.45-.252.486-.036 1.08.432 1.296.558.288 1.224.45 1.89.45zm0-5.094c-.63 0-1.224-.252-1.656-.738-.432-.414-.72-1.098-.72-1.854 0-.72.288-1.404.72-1.836.432-.504 1.026-.774 1.656-.774.684 0 1.242.27 1.71.774.396.432.684 1.116.684 1.836 0 .756-.288 1.44-.684 1.854-.468.486-1.026.738-1.71.738zM169.1 34.6c.522 0 .954-.432.954-.954V29.38c0-2.088-1.674-3.78-3.744-3.78-1.134 0-2.16.468-2.826 1.242-.684-.774-1.692-1.242-2.826-1.242-.684 0-1.35.198-1.926.54-.144-.342-.486-.54-.864-.54-.522 0-.954.414-.954.972v7.074c0 .468.342.828.774.936.054 0 .108.018.18.018.378 0 .738-.252.9-.576v-.09c.036-.036.036-.072.054-.108v-.054c0-.036.018-.09.018-.126V29.38c0-1.026.828-1.854 1.818-1.854 1.008 0 1.836.81 1.854 1.8v4.32c0 .485.404.892.865.948l.107.006c.522 0 .954-.432.954-.954v-4.32c.036-.99.846-1.8 1.872-1.8.99 0 1.818.828 1.818 1.854v4.266c0 .522.45.954.972.954zm8.496 0c2.07 0 3.798-1.692 3.798-3.744v-4.302c0-.504-.468-.954-.972-.954-.54 0-.936.45-.936.954v4.302c-.018 1.026-.846 1.836-1.89 1.836-1.026 0-1.836-.81-1.836-1.836v-4.302c0-.504-.414-.954-.954-.954-.522 0-.954.45-.954.954v4.302c0 2.052 1.692 3.744 3.744 3.744zm10.368 0c.882 0 1.692-.27 2.34-.72.648-.468 1.134-1.206 1.134-2.088 0-.414-.126-.828-.342-1.188-.306-.504-.792-.846-1.278-1.062-.522-.252-1.08-.414-1.674-.522h-.018l-.018-.018c-.612-.108-1.08-.27-1.314-.432-.126-.072-.18-.144-.198-.18-.036-.054-.036-.072-.036-.144 0-.09.054-.252.288-.414.234-.18.63-.324 1.08-.324.576 0 1.08.288 1.656.666.45.306 1.044.18 1.332-.252.25-.415.161-.953-.194-1.26l-.094-.072c-.576-.396-1.458-.99-2.7-.99-.828 0-1.584.234-2.214.666-.594.45-1.062 1.152-1.062 1.98 0 .414.108.81.306 1.134.324.486.756.81 1.242 1.044.468.216 1.008.36 1.566.468h.018c.648.126 1.188.324 1.44.504.144.09.216.162.234.216.036.054.054.09.054.18 0 .144-.072.324-.324.54-.288.18-.738.342-1.224.342-.702.018-1.512-.396-1.98-.792-.396-.342-1.026-.288-1.35.144-.324.396-.27 1.008.126 1.332.72.576 1.8 1.224 3.204 1.242zm6.948-10.26c.558 0 .972-.45.972-.99v-.378c0-.54-.414-.972-.972-.972-.54 0-.972.432-.972.972v.378c0 .54.432.99.972.99zm0 10.26c.558 0 .972-.432.972-.972v-7.02c0-.576-.414-.99-.972-.99-.54 0-.972.414-.972.99v7.02c0 .54.432.972.972.972zm8.01 0c1.08 0 2.088-.396 2.862-.954.414-.36.486-.936.198-1.332-.36-.432-.954-.504-1.35-.198-.468.342-1.062.576-1.71.576-1.458 0-2.664-1.188-2.664-2.574s1.206-2.592 2.664-2.592c.666 0 1.242.234 1.71.576.414.324.99.252 1.35-.18.288-.396.216-1.008-.198-1.332-.774-.594-1.782-.99-2.862-.99-2.484.018-4.572 2.016-4.572 4.518 0 2.466 2.088 4.482 4.572 4.482z'
										transform='translate(-134.000000, -22.000000)'
									/>
								</g>
							</g>
						</svg>
					</div>
					<div className='action'>
						<RxMagnifyingGlass
							className='text-white text-2xl cursor-pointer'
							onClick={searchNewSong}
						/>
					</div>
				</div>
				<div className='content flex flex-col items-center px-5 py-10 gap-10'>
					<div className='description-wrapper flex gap-2 h-28 items-center max-[400px]:flex-col'>
						<p className='text-xl text-[#334155] font-roboto'>
							{inputMusic.length === 0 ? 'Find trending music' : 'Search result for : '}
						</p>
						<p className='text-xl text-[#7b34dd] font-bold font-roboto'>{inputMusic}</p>
					</div>
					<div className='list-item-wrapper flex flex-col items-center justify-center gap-5 w-full'>
						{inputMusic.length === 0 ? (
							<div className='flex gap-2 flex-wrap justify-center'>
								{ListPopularArtists.map((name, idx) => (
									<ArtistTag name={name} key={idx} />
								))}
							</div>
						) : musicData.length === 0 ? (
							<div className='flex justify-center flex-col items-center'>
								<TbDatabaseX className='text-9xl text-gray-400' />
								<h1 className='font-roboto'>There is no song found</h1>
							</div>
						) : (
							musicData.map((music, idx) => <Card music={music} key={idx} />)
						)}
					</div>
					<div className='action-button-wrapper'>
						{musicData.length >= 4 && (
							<CustomButton
								className='rounded-full bg-[#e2e8f0] text-lg text-[#64748b] py-3 px-10 font-bold font-roboto'
								onClick={loadMoreMusic}
								isLoading={isLoading}
								loaderBlack
							>
								Load More
							</CustomButton>
						)}
					</div>
				</div>
			</div>
			{isOpenModal && <Modal handleClose={() => setIsOpenModal(false)} />}
		</>
	);
}
