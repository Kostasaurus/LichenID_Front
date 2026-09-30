import {useContext, useEffect, useState} from 'react'
import api from "../api/apiClient.jsx"
import {userContext} from "../contexts/contextProvider.js"


export const useSettings = () => {
	const [isModalSettingsOpen, setIsModalSettingsOpen] = useState(false)
	
	const [isEmail, setIsEmail] = useState(null)
	
	const emptyEmailForm = {
		new_email: "",
		password: ""
	}
	const emptyPasswordForm =  {
		new_password: "",
		old_password: ""
}


	

	const {
		userData,
		setUserData
	} = useContext(userContext)
	
	const [settingsForm, setSettingsForm] = useState(isEmail ? { ...emptyEmailForm } : {...emptyPasswordForm})
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	
	useEffect(() => {
		if (isEmail === true) {
			setSettingsForm({ ...emptyEmailForm });
		} else if (isEmail === false) {
			setSettingsForm({ ...emptyPasswordForm });
		}
	}, [isEmail]);
	
	const logout = async () => {
		try {
			await api.logout()
			setUserData(null)
			sessionStorage.removeItem("userData")
			
		} catch (err) {
			console.error("Auth error:", err)
		}
	}
	
	
	useEffect(() => {
		if (isModalSettingsOpen) {
			document.body.style.overflow = 'hidden'
			document.body.style.height = '100vh'
		} else {
			document.body.style.overflow = ''
			document.body.style.height = ''
		}
		
		return () => {
			document.body.style.overflow = ''
			document.body.style.height = ''
		}
	}, [isModalSettingsOpen])
	
	const isValidEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailRegex.test(email)
	}
	
	const handleInputChange = (e) => {
		const { name, value } = e.target
		
		setSettingsForm({ ...settingsForm, [name]: value })
		if (error?.type === name) {setError(null)}
		
	}
	
	const handleSubmit = async (e) => {
		e.preventDefault()
		
		setError(null)
		if (isEmail) {
			
			if (!isValidEmail(settingsForm.new_email)) {
				setError({msg: "Некорректный email адрес", type: "new_email"})
				return
			}
		}
		else {
			if (!settingsForm.new_password || settingsForm.new_password.length < 6) {
				setError({msg: "Пароль должен содержать минимум 6 символов", type: "new_password"})
				return
			}
		}
		
		setLoading(true)
		
		try {
				isEmail
				? await api.changeEmail(settingsForm)
				: await api.changePassword(settingsForm)
			
			setIsModalSettingsOpen(false)
			setSettingsForm(isEmail ? { ...emptyEmailForm } : { ...emptyPasswordForm })
			
		} catch (err) {
			console.error("Auth error:", err)
			
			if (err.response) {
				const status = err.response.status
				
				if (status === 401) {
					setError({msg: "Неверный пароль", type: "password"})
				} else if (status === 400 && isEmail) {
					setError({msg: "Пользователь с таким email уже существует", type: "new_email"})
				} else if (status === 400) {
					setError({msg: "Cессия устарела. Попробуйте перезайти", type: 'session'})
				} else {
					setError(`Ошибка сервера (${status})`)
				}
			} else {
				setError("Ошибка соединения с сервером")
			}
		} finally {
			setLoading(false)
		}
	}
	
	const handleCancel = () => {
		setIsModalSettingsOpen(false)
		setSettingsForm(isEmail ? { ...emptyEmailForm } : { ...emptyPasswordForm })
		setIsEmail(null)
		setError(null)
	}
	
	return {
		isEmail,
		setIsEmail,
		error,
		setIsModalSettingsOpen,
		isModalSettingsOpen,
		handleInputChange,
		handleSubmit,
		handleCancel,
		settingsForm,
		userData,
		setUserData,
		logout
		
		
	}
}