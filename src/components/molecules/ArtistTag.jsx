import { useNavigate } from 'react-router-dom';
import { useMusic } from '../../hooks/useMusic';
import { useInput } from '../../hooks/useInput';

export default function ArtistTag({ name }) {
	const { setInputMusic } = useInput();
	const { setMusicData } = useMusic();

	const navigate = useNavigate();

	const searchMusic = async () => {
		const inputText = name.replace(/\s/g, '+');
		const resp = await fetch(
			`https://itunes.apple.com/search?term=${inputText}&media=music&limit=4`
		);
		if (resp.status === 200) {
			const { results } = await resp.json();
			setInputMusic(name);
			setMusicData(results);
			navigate(`/music/${inputText.toLowerCase()}`, { replace: true });
		} else {
			alert('GAGAL WOI');
		}
	};

	return (
		<button
			className='bg-gradient-to-r from-[#7b34dd] to-[#a45deb] py-1 px-4 rounded-full text-white'
			onClick={searchMusic}
		>
			{name}
		</button>
	);
}
