import { getUserInfo } from "../../context/user/profile";
import "./style.scss";

import Tasks from "../../data/hooks/tasks";
import CardList from "../../ui/partials/home/CardList";

function Page() {
	const user = getUserInfo();
	const { tasks, loading, error } = Tasks.useAllTasks();
	console.log(tasks)

	return (
		<div className="p-3">
			<div className="dashboard-header">
				<h5>Olá, {user.name}!</h5>
				<h1>Dashboard</h1>
			</div>
			<div className="dashboard-content">
				<div className="dashboard-section flex-wrap">
					<div className="dashboard-card card-large">
						<h4>Próximas tarefas</h4>
						<CardList tasks={tasks} loading={loading}/>
					</div>
					<div className="dashboard-card card-large">
						<h4>Estatísticas</h4>
					</div>
				</div>
				<div className="dashboard-section overflow-x-auto">
					<div
						className="dashboard-card dashboard-colored-card card-medium"
						style={{ backgroundColor: "#FA8072" }}
					></div>
					<div
						className="dashboard-card dashboard-colored-card card-medium"
						style={{ backgroundColor: "#87CEEB" }}
					></div>
					<div
						className="dashboard-card dashboard-colored-card card-medium"
						style={{ backgroundColor: "#90EE90" }}
					></div>
				</div>
			</div>
		</div>
	);
}

export default Page;
