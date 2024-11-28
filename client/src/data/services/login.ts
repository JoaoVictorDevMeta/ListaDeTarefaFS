export async function fetchLogin (email: string, password: string) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    }
    const response = await fetch('http://localhost:3000/api/v1/auth/login', options)
    return await response;
}