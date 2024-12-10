import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { fetchLogin } from "../services/login";
import { fetchRegister } from "../services/register";

//types
import { LoginInputs } from "../types/loginType";
import { RegisterInputs } from "../types/registerType";

function useLogin() {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const login = async (data: LoginInputs) => {
		setLoading(true);
		try {
			const response = await fetchLogin(data.email, data.password);
			const respData = await response.json();
			if (!response.ok) {
				throw new Error(respData.message);
			}
			localStorage.setItem("token", respData.token);
			localStorage.setItem("user", JSON.stringify(respData.validUser));
			Swal.fire({
				icon: "success",
				title: "Login efetuado com sucesso",
				showConfirmButton: false,
				timer: 1500,
			}).then(() => {
				navigate("/");
			});
		} catch (err: any) {
			Swal.fire({
				icon: "error",
				title: err.message,
				confirmButtonText: "Tentar novamente",
				confirmButtonColor: "#ff0000",
			});
		} finally {
			setLoading(false);
		}
	};

	return { login, loading };
}

function useRegister() {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const register = async (data: RegisterInputs) => {
		setLoading(true);
		try {
			const response = await fetchRegister(
				data.email,
				data.password,
				data.username
			);
			const respData = await response.json();
			if (!response.ok) {
				throw new Error(respData.message);
			}
			Swal.fire({
				icon: "success",
				title: "Cadastro efetuado com sucesso",
				showConfirmButton: false,
				timer: 1500,
			}).then(() => {
				navigate("/auth");
			});
		} catch (err: any) {
			Swal.fire({
				icon: "error",
				title: err.message,
				confirmButtonText: "Tentar novamente",
				confirmButtonColor: "#ff0000",
			});
		} finally {
			setLoading(false);
		}
	};
	
	return { register, loading };
}

export default {useLogin, useRegister};
