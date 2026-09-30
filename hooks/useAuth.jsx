import {useContext, useEffect, useState} from 'react';
import api from "../api/apiClient.jsx";
import {userContext} from "../contexts/contextProvider.js";


export const useAuth = () => {
	const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
	const [isRegistr, setIsRegistr] = useState(false);
	
	const emptyForm = {
		email: "",
		password: ""
	};
	
	const {
		userData,
		setUserData
	} = useContext(userContext);
	
	const [loginForm, setLoginForm] = useState({ ...emptyForm });
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	
	
	
	useEffect(() => {
		if (isModalLoginOpen) {
			document.body.style.overflow = 'hidden'
			document.body.style.height = '100vh'
		} else {
			document.body.style.overflow = ''
			document.body.style.height = ''
		}
		
		return () => {
			document.body.style.overflow = ''
			document.body.style.height = ''
		};
	}, [isModalLoginOpen]);
	
	const isValidEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailRegex.test(email)
	};
	
	const handleInputChange = (e) => {
			const { name, value } = e.target
		
		setLoginForm({ ...loginForm, [name]: value })
		if (error?.type === name) {setError(null)}
		
	};
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		
		setError(null);
		
		if (!isValidEmail(loginForm.email)) {
			setError({ msg: "Некорректный email адрес", type: "email"});
			return;
		}
		
		if (!loginForm.password || loginForm.password.length < 6) {
			setError({msg: "Пароль должен содержать минимум 6 символов", type: "password"});
			return
		}
		
		setLoading(true)
		
		try {
			const result = isRegistr
				? await api.register(loginForm)
				: await api.login(loginForm);
			
			setUserData(result);
			
			setIsModalLoginOpen(false);
			setLoginForm({ ...emptyForm });
			
		} catch (err) {
			console.error("Auth error:", err);
			
			if (err.response) {
				const status = err.response.status;
				
				if (status === 401) {
					setError({msg: "Неверный email или пароль", type: "auth"});
				} else if (status === 400 && isRegistr) {
					setError({msg: "Пользователь с таким email уже существует", type: "email"});
				} else if (status === 400) {
					setError({msg: "Cессия устарела. Попробуйте перезайти", type: 'session'});
				} else {
					setError(`Ошибка сервера (${status})`);
				}
			} else {
				setError("Ошибка соединения с сервером");
			}
		} finally {
			setLoading(false);
		}
	}
	
	const handleCancel = () => {
		setIsModalLoginOpen(false);
		setLoginForm({ ...emptyForm });
		setIsRegistr(false);
	};
	
	return {
		isRegistr,
		setIsRegistr,
		error,
		setIsModalLoginOpen,
		isModalLoginOpen,
		handleInputChange,
		handleSubmit,
		handleCancel,
		loginForm,
		userData,
		setUserData
		
		
	}
};