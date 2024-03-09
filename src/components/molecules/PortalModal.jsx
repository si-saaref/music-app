import ReactDOM from 'react-dom';

export default function PortalModal({ children }) {
	const modalRoot = document.getElementById('portal-root');
	return ReactDOM.createPortal(<div className='modal'>{children}</div>, modalRoot);
}
