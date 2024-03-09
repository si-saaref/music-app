import { AiOutlineDollarCircle } from 'react-icons/ai';
import { FaRegCirclePlay } from 'react-icons/fa6';

export default function Card({ music }) {
	return (
		<div className='card rounded-xl flex gap-3 bg-white w-full shadow-lg p-5 max-[400px]:flex-col'>
			<div className='img min-w-40 min-h-40 rounded-xl relative'>
				<img src={music?.artworkUrl100} alt='' className='w-full rounded-xl' />
				<FaRegCirclePlay className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-4xl' />
			</div>
			<div className='text flex flex-col justify-between w-full gap-4'>
				<div className='text-[#334155]'>
					<h2 className='singer text-xl'>{music?.artistName}</h2>
					<h1 className='title font-bold text-2xl'>{music?.trackName}</h1>
				</div>
				<div className='detail flex justify-between items-center w-full'>
					<h3 className='genre bg-[#10b981] py-1 px-3 min-w-20 rounded-full text-white text-center text-lg'>
						{music?.primaryGenreName}
					</h3>
					<div className='price flex gap-1 items-center text-[#f5b014]'>
						<AiOutlineDollarCircle className='text-2xl font-bold' />
						<h1 className='font-bold'>{music?.trackPrice}</h1>
					</div>
				</div>
			</div>
		</div>
	);
}
