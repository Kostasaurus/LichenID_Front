import Field from '../elements/Field.jsx'
import PasswordField from "../elements/PasswordField.jsx"

export function AuthForm (props) {
	const {
		isRegistr,
		setIsRegistr,
		error,
		handleInputChange,
		handleSubmit,
		handleCancel,
		loginForm,
	} = props
	
	
	const handleRegistrLinkClick = (event) => {
		event.preventDefault()
		setIsRegistr(true)
		
	}
	
	
	return (
		<div>
			<div className="sticky z-50 top-0 p-5 flex justify-between items-center mb-6 bg-primary-50/80 dark:bg-primary-900/80 backdrop-blur-md border-b border-gray-200 dark:border-mystic-900">
				<h3 className="text-3xl font-bold text-gradient pr-2">{isRegistr ? 'Регистрация' : 'Вход'}</h3>
				<button
					onClick={handleCancel}
					className="rounded-full"
				>
					<i className="fas fa-times text-3xl mr-3
					text-primary-500     hover:text-primary-700
					dark:text-primary-400   dark:hover:text-accent-300 transition-colors
					
					"></i>
				</button>
			</div>
			
			<form onSubmit={handleSubmit} autoComplete="off">
				<div className="grid grid-cols-1 gap-6 md:mx-40 mb-10 px-3 md:p-4">
					
					
					
					<div>
						<label className="block text-md font-medium mb-3 text-red-600 text-center">
							<p>
								{error?.type === 'auth' ? error?.msg : ''}
							</p>
						</label>
						<label className="block text-sm font-medium mb-2">
							Email
						</label>
						<Field
							required={true}
							type="text"
							name="email"
							value={loginForm.email}
							onChange={handleInputChange}
							placeholder={'sosiska228@gmail.com'}
							colorIfNotEmpty={true}
							error={error?.type === 'email'}
							additionalClasses={`rounded-md!`}
						/>
						<label className="block text-sm font-medium mt-2 text-red-600">
							{error?.type === 'email' ? error?.msg : ''}
						</label>
					
					</div>
					
					<div>
						<label className="block text-sm font-medium mb-2">
							Password
						</label>
						<PasswordField
							name="password"
							value={loginForm.password}
							onChange={handleInputChange}
							placeholder={'good_password'}
							additionalClasses="rounded-md!"
							error={error?.type === 'password'}
							colorIfNotEmpty={true}>
						</PasswordField>
						<label className="block text-sm font-medium mt-2 text-red-600">
							{error?.type === 'password' ? error?.msg : ''}
						</label>
						
					</div>
					
					{!isRegistr && <div className="flex items-center justify-center">
						<p>Нет аккаунта?
							<button
								onClick={(event) => handleRegistrLinkClick(event)}
								type="button"
								className="pl-2 text-forest-spirit hover:text-forest-moss dark:hover:text-glow-700 underline dark:text-glow-500 dark:text-shadow-accent-700 dark:text-shadow-[0_1px_10px] ">
								Зарегистрироваться
							</button>
						</p>
					
					</div>}
					
					
				
					
					
				</div>
				
				<div className="flex justify-center space-x-5 pr-5 pb-5">
					
					<button
						type="submit"
						className="px-6 py-3 rounded-lg  modal-submit-button"
						onClick={handleSubmit}
					>
						{isRegistr ? 'Зарегистрироваться' : 'Войти'}
					</button>
				</div>
			</form>
		</div>
	
	
	
	
	
	
	)
	
	
	
	
	
	
	
}