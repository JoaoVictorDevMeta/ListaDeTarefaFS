export async function fetchValidateAuth(token:string) {
	const options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await fetch(
		"http://localhost:3000/api/v1/auth/validate-auth",
		options
	);
	return response;
}
