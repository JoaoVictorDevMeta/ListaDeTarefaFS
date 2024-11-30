import { fetchValidateAuth } from "../../data/services/validate-auth";
import { useNavigate } from "react-router";

export const isAuthenticated = async (
	navigate: ReturnType<typeof useNavigate>
) => {
	const token = localStorage.getItem("token");
	if (!token) return false;
	try {
		const response = await fetchValidateAuth(token);
		if (!response.ok) {
			localStorage.removeItem("token");
			navigate("/auth");
		}
	} catch (error) {
		console.error(error);
		localStorage.removeItem("token");
		navigate("/auth");
	}

	return true;
};
