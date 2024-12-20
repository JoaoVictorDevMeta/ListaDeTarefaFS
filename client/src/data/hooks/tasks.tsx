import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { fetchAllTasks } from "../services/allTasks";
import { fetchCreateTask } from "../services/createTask";
import { fetchSingleTask } from "../services/singletask";
import { Task, TaskInputs } from "../types/Task";
import Swal from "sweetalert2";

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

function useCreateTask() {
	const [loading, setLoading] = useState(false);
	const token: string = localStorage.getItem("token") ||	"";
	
	const createTask = async (data: TaskInputs) => {
		setLoading(true);
		try {
			const response = await fetchCreateTask(token, data);
			const respData = await response.json();
			if (!response.ok) {
				console.log(respData)
				throw new Error(respData);
			}
			Swal.fire({
				icon: "success",
				title: "Tarefa criada com sucesso",
				showConfirmButton: false,
				timer: 1500,
			})
		} catch (err: any) {
			console.log(err)
			Swal.fire({
				icon: "error",
				title: err.message,
				confirmButtonText: "Tentar novamente",
				confirmButtonColor: "#ff0000",
			});
		} finally {
			setLoading(false);
		}
	}

	return { createTask, loading };
}

function useTask() {
	const [task, setTask] = useState<Task>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState({});
	const token: string = localStorage.getItem("token") || "";
	const taskId = useParams<{ id: string }>().id || "";

	useEffect(() => {
		const getTask = async () => {
			try {
				const response = await fetchSingleTask(token, taskId);
				const data = await response.json();
				setTask(data);
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
		getTask();
	}, []);

	return { task, loading, error };
}

export default {useAllTasks , useCreateTask, useTask};
