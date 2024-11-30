import { TaskSmall } from "../../components/task/TaskSmall";
import { Task } from "../../../data/types/Task";

interface CardListProps {
	tasks?: Task[];
	loading?: boolean;
}

const CardList = ({ tasks, loading }: CardListProps) => {
	if (loading) {
		return <p>Loading...</p>;
	}

	const filteredTasks = tasks
		?.filter((task) => !task.status) // Filter completed tasks
		.sort(
			(a, b) =>
				new Date(a.nextDate).getTime() - new Date(b.nextDate).getTime()
		) // Sort by nextDate
		.slice(0, 5);

	return (
		<ul className="task-list pt-3">
			{filteredTasks?.length ? filteredTasks?.map((task) => (
				<TaskSmall
					key={task.id}
					taskId={task.id}
					title={task.title}
					nextDate={task.nextDate}
					status={task.status}
				/>
			)) : <p>Nenhuma tarefa próxima</p>}
		</ul>
	);
};

export default CardList;
