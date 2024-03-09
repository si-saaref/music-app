import { AiOutlineLoading } from 'react-icons/ai';

export default function CustomButton({ children, className, onClick, isLoading, loaderBlack }) {
	const loaderClass = `text-2xl animate-spin h-full ${loaderBlack ? 'text-black' : 'text-white'}`;
	return (
		<button className={className} onClick={onClick}>
			{isLoading ? <AiOutlineLoading className={loaderClass} /> : children}
		</button>
	);
}
