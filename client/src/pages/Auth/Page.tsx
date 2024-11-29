import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation } from "react-router";

//data logic
import useAuth from "../../data/hooks/auth";
import { LoginInputs } from "../../data/types/loginType";
import { RegisterInputs } from "../../data/types/registerType";

//styles and components
import LoadingSpinner from "../../ui/components/loading/Loading";
import Button from "../../ui/components/buttons/Button";
import "./style.scss";


function Page() {
	const {
		register: registerLogin,
		handleSubmit: handleSubmitLogin,
		formState: { errors: loginErrors },
	} = useForm<LoginInputs>();
	const {
		register: registerRegister,
		handleSubmit: handleSubmitRegister,
		formState: { errors: registerErrors },
	} = useForm<RegisterInputs>();
	//form type auth
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const formType = queryParams.get("form") || "login";
	const [isLogin, setIsLogin] = useState(formType === "login");

	const { login, loading: loginLoading } = useAuth.useLogin();
	const { register, loading: registerLoading } = useAuth.useRegister();

	const onSubmitLogin: SubmitHandler<LoginInputs> = (data) => {
		login(data);
	};

	const onSubmitRegister: SubmitHandler<RegisterInputs> = (data) => {
		register(data);
	};

	return (
		<div className="back">
			<div
				className={`auth-container container-lg p-0 ${
					isLogin ? "register-active" : "login-active"
				}`}
			>
				{(loginLoading || registerLoading) && <LoadingSpinner />}
				<section className="login-form">
					<form onSubmit={handleSubmitLogin(onSubmitLogin)}>
						<h2>Login</h2>
						<div className="input-container">
							<label htmlFor="email-login">Email</label>
							<input
								type="text"
								id="email-login"
								{...registerLogin("email", { required: true })}
							/>
							{loginErrors.email && (
								<span>Email é obrigatório</span>
							)}
						</div>
						<div className="input-container">
							<label htmlFor="password-login">Senha</label>
							<input
								type="password"
								id="password-login"
								{...registerLogin("password", {
									required: true,
								})}
							/>
							{loginErrors.password && (
								<span>Senha é obrigatória</span>
							)}
						</div>
						<Button
							label="Login"
							type="fill"
							color="light"
							disabled={loginLoading}
						/>
						<p>
							Não tem conta ainda?{" "}
							<span
								onClick={() => {
									setIsLogin(false);
								}}
							>
								Registrar-se
							</span>
						</p>
					</form>
				</section>
				<section className="register-form">
					<form onSubmit={handleSubmitRegister(onSubmitRegister)}>
						<h2>Registro</h2>
						<div className="input-container">
							<label htmlFor="username-register">
								Nome de Usuario
							</label>
							<input
								type="text"
								id="username-register"
								{...registerRegister("username", {
									required: "Nome é obrigatório",
									pattern: {
										value: /^[A-Za-z0-9 ]+$/,
										message:
											"O nome deve conter apenas letras, números e espaços",
									},
								})}
							/>
							{registerErrors.username && (
								<span>{registerErrors.username.message}</span>
							)}
						</div>
						<div className="input-container">
							<label htmlFor="email-register">Email</label>
							<input
								type="text"
								id="email-register"
								{...registerRegister("email", {
									required: true,
								})}
							/>
							{registerErrors.email && (
								<span>Email é obrigatório</span>
							)}
						</div>
						<div className="input-container">
							<label htmlFor="password-register">Senha</label>
							<input
								type="password"
								id="password-register"
								{...registerRegister("password", {
									required: "Senha é obrigatória",
									pattern: {
										value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
										message:
											"A senha deve ter no mínimo 1 letra, 1 número, 1 caractere especial e 6 caracteres",
									},
								})}
							/>
							{registerErrors.password && (
								<span>{registerErrors.password.message}</span>
							)}
						</div>
						<Button
							label="Registrar"
							type="fill"
							color="light"
							disabled={registerLoading}
						/>
						<p>
							Ja possui uma conta?{" "}
							<span
								onClick={() => {
									setIsLogin(true);
								}}
							>
								Logar-se
							</span>
						</p>
					</form>
				</section>
				<aside className="aside-background"></aside>
			</div>
		</div>
	);
}

export default Page;
