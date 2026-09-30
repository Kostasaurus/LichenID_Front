import {useEffect, useMemo, useState} from "react"
import {userContext} from "./contextProvider.js"


export const UserProvider = ({ children }) => {
		const [userData, setUserData] = useState(() => {
			const saved = sessionStorage.getItem('userData');
			return saved ? JSON.parse(saved) : null;
		});
	
	useEffect(() => {
	}, [userData]);
	
	useEffect(() => {
		sessionStorage.setItem('userData', JSON.stringify(userData));
	}, [userData]);
	
	
	
	const value = useMemo(() => ({ userData, setUserData }), [userData]);
	
	return (
		<userContext.Provider
			
			value={value}>
			{children}
		</userContext.Provider>
	)
}