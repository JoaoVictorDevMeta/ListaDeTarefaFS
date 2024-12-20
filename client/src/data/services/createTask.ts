import { TaskInputs as Task } from "../types/Task"

export async function fetchCreateTask(token: string, data: Task) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    }
    const response = await fetch('http://localhost:3000/api/v1/task/create', options)
    return response
}