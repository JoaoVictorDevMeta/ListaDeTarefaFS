export async function fetchRegister(email: string, password: string, name: string) {
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password, name }),
	};

	const response = await fetch(
		"http://localhost:3000/api/v1/auth/register",
		options
	);

	return response;
}
