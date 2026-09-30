import {useCallback, useEffect} from "react";

export default function useClickOutside(elementRef, callback) {
	const handleClick = useCallback((event) => {
		if (elementRef.current && !elementRef.current.contains(event.target)) {
			callback();
		}
	}, [elementRef, callback]);
	
	useEffect(() => {
		document.addEventListener('click', handleClick)
		return () => {
			document.removeEventListener('click', handleClick)
		};
	}, [handleClick]);
}