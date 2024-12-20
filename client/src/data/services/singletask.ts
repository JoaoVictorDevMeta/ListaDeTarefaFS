export async function fetchSingleTask(token:string, id: string) {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(
        `http://localhost:3000/api/v1/task/select/${id}`,
        options
    );

    return response;
}