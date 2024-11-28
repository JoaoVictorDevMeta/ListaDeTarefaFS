import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { LoginInputs } from "../types/loginType";
import { fetchLogin } from "../services/login";

//just for testing
import { sleep } from "../utils/sleep";

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
			localStorage.setItem("user", JSON.stringify(respData.user));
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

export default useLogin;
