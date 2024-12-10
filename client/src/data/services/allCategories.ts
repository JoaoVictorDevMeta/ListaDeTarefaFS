export async function fetchAllCategories(token: string) {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await fetch('http://localhost:3000/api/v1/category/all', options)
    return response
}