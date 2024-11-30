import { useState, useEffect } from "react";
import { fetchAllTasks } from "../services/allTasks";
import { Task } from "../types/Task";

function useAllTasks() {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});
	const token: string = localStorage.getItem("token") || "";

	useEffect(() => {
		const getTasks = async () => {
			try {
				const response = await fetchAllTasks(token);
				const data = await response.json();
				setTasks(data);
				setLoading(false);
			} catch (error) {
				if (error instanceof Response) {
					const response = await error.json();
                    setError(response);
					console.error(response);
				} else {
					console.error(error);
				}
			}
		};
		getTasks();
	}, []);

	return { tasks, loading, error };
}

export default {useAllTasks};
