import tasks from "../../data/hooks/tasks";
import { convertDate, dateDistance, dateHour } from "../../data/utils/convertDate";
import "./style.scss";

function Page() {
	const { task, loading } = tasks.useTask();
	const weekDaysMap: { [key: number]: string } = {
		1: "Domingo",
		2: "Segunda",
		3: "Terça",
		4: "Quarta",
		5: "Quinta",
		6: "Sexta",
		7: "Sábado",
	};
	const translateDays = (days: string): string[] => {
		return days.split(" ").map((day) => weekDaysMap[parseInt(day)]);
	};

	return (
		<div className="p-3 task-c">
			<div className="task-header item-box placeholder-glow">
				{loading ? (
					<>
						<h1 className="placeholder col-7"></h1>
						<ul className="small-infos">
							<li className="d-flex flex-column">
								<span>Tempo Limite</span>
								<p className="placeholder col-2"></p>
							</li>
						</ul>
						<p className="progress-box">
							<span className="placeholder col-2"></span>
						</p>
					</>
				) : ( 
					<> 
						<h1>{task?.title}</h1>
						<ul className="small-infos d-flex">
							<li>
								<span>Tempo Limite</span>	
								<p>{dateDistance(task?.nextDate || "", Date.now() || "")}</p>
							</li>
							{task?.repeatTimes ? (
								<li>
									<span>Semanas Restantes</span>
									<p>{task?.repeatTimes} semanas</p>
								</li>
							) : null}
							{!task?.status && task?.nextInterval ? (
								<li>
									<span>Proximo Dia</span>
									<p>{weekDaysMap[task?.nextInterval]}</p>
								</li>
							) : null}
						</ul>
						<p className="progress-box">
							<span>
								{task?.status
									? "concluida"
									: "A ser concluída..."}
							</span>
						</p>
					</>
				)}
			</div>

			<div className="task-container d-flex">
				<div className="left-side">
					<h4>Categoria</h4>
					<div className="category-box">
						<span>{loading ? "..." : task?.Category.name}</span>
					</div>
					<h4>Detalhes</h4>
					<div className="description item-box">
						<div className="box-title">
							<h2>Descrição</h2>
						</div>
						<span>
							<p className="placeholder-glow">
								{loading ? (
									<>
										<span className="placeholder col-2 me-2"></span>
										<span className="placeholder col-5 me-2"></span>
										<span className="placeholder col-3 me-2"></span>
										<span className="placeholder col-6 me-2"></span>
										<span className="placeholder col-1 me-2"></span>
										<span className="placeholder col-4 me-2"></span>
										<span className="placeholder col-7 me-2"></span>
										<span className="placeholder col-2 me-2"></span>
										<span className="placeholder col-5 me-2"></span>
										<span className="placeholder col-3 me-2"></span>
										<span className="placeholder col-3 me-2"></span>
										<span className="placeholder col-6 me-2"></span>
									</>
								) : (
									task?.description
								)}
							</p>
						</span>
					</div>
					<div className="date-hour item-box">
						<div className="box-title">
							<h2>Data para conclusão</h2>
						</div>
						<span className="d-flex">
							<div className="item-info">
								<p>Data</p>
								<p>Hora</p>
							</div>
							<div className="item">
								<h3>
									{loading
										? ""
										: convertDate(task?.nextDate || "")}
								</h3>
								<h3>{loading ? "" : 
										dateHour(task?.nextDate || "")
									}</h3>
							</div>
						</span>
					</div>

					<div className="additional item-box">
						<div className="box-title">
							<h2>Detalhes adicionais</h2>
						</div>
						<span className="d-flex">
							<div className=" item-info">
								<p>Criado em</p>
								{task?.createdAt === task?.updatedAt ? null : (
									<p>Atualizado em</p>
								)}
							</div>
							<div className=" item">
								<h3>
									{loading
										? ""
										: convertDate(task?.createdAt || "")}
								</h3>
								<h3>
									{loading
										? ""
										: task?.createdAt === task?.updatedAt
										? null
										: convertDate(task?.updatedAt || "")}
								</h3>
							</div>
						</span>
					</div>
				</div>

				<div className="right-side">
					<h4>Notas</h4>
					<div className="notes item-box">
						<span>
							<p className="placeholder-glow">
								{loading ? (
									<>
										<span className="placeholder col-2 me-2"></span>
										<span className="placeholder col-5 me-2"></span>
										<span className="placeholder col-3 me-2"></span>
										<span className="placeholder col-6 me-2"></span>
										<span className="placeholder col-1 me-2"></span>
										<span className="placeholder col-4 me-2"></span>
										<span className="placeholder col-7 me-2"></span>
										<span className="placeholder col-2 me-2"></span>
										<span className="placeholder col-5 me-2"></span>
										<span className="placeholder col-3 me-2"></span>
										<span className="placeholder col-3 me-2"></span>
										<span className="placeholder col-6 me-2"></span>
									</>
								) : task?.notes ? (
									task?.notes
								) : (
									"nenhuma nota adicionada"
								)}
							</p>
						</span>
					</div>
					{task?.days ? (
						<>
							<h4>Repetição</h4>
							<div className="days item-box">
								<div className="box-title">
									<h2>Dias da Semana</h2>
								</div>
								<span>
									<p className="placeholder-glow">
										{loading ? (
											<>
												<span className="placeholder col-2 me-2"></span>
												<span className="placeholder col-5 me-2"></span>
												<span className="placeholder col-3 me-2"></span>
												<span className="placeholder col-6 me-2"></span>
												<span className="placeholder col-1 me-2"></span>
												<span className="placeholder col-4 me-2"></span>
												<span className="placeholder col-7 me-2"></span>
												<span className="placeholder col-2 me-2"></span>
												<span className="placeholder col-5 me-2"></span>
												<span className="placeholder col-3 me-2"></span>
												<span className="placeholder col-3 me-2"></span>
												<span className="placeholder col-6 me-2"></span>
											</>
										) : task?.days ? (
											<div className="week-days">
												{translateDays(task.days).map(
													(day, index) => (
														<span key={index}>
															{day.slice(0, 3)}
														</span>
													)
												)}
											</div>
										) : (
											"nenhum dia adicionado"
										)}
									</p>
								</span>
							</div>
						</>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default Page;
