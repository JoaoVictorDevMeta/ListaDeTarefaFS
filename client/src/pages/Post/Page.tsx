import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./style.scss";
import Button from "../../ui/components/buttons/Button";
import TextInput from "../../ui/components/inputs/textInput";
import DateInput from "../../ui/components/inputs/dateInput";
import Checkbox from "../../ui/components/inputs/checkBoxChange";

interface FormInputs {
	title: string;
	description: string;
	taskDate: string;
	taskHour: string;
}

function Page() {
	const [formType, setFormType] = useState(true);
	const [checkedDays, setCheckedDays] = useState<number[]>([]);
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormInputs>({
		mode: "onBlur",
	});
	const taskDate = watch("taskDate");

	const validateDate = (value: string) => {
		const selectedDate = new Date(value);
		const now = new Date();
		now.setHours(0, 0, 0, 0);

		const tenYearsFromNow = new Date();
		tenYearsFromNow.setFullYear(now.getFullYear() + 10);

		if (selectedDate <= now) {
			return "Essa data já passou, coloque uma data futura";
		}

		if (selectedDate > tenYearsFromNow) {
			return "A data de conclusão não pode ser mais de 10 anos após a data atual";
		}

		return true;
	};

	const onSubmit: SubmitHandler<FormInputs> = (data) => {
		console.log(data);
	};

	const handleCheckboxChange = (id: number, checked: boolean) => {
		setCheckedDays((prev) =>
		  checked ? [...prev, id] : prev.filter((dayId) => dayId !== id)
		);
	  };
	console.log(checkedDays);

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="post-container d-flex"
		>
			<div className="postzin">
				<h2>Nova Tarefa</h2>
				<p className="subtitle">
					Adicione uma nova tarefa ao seu calendário. Você esta
					criando uma tarefa{" "}
					<b>{formType ? "simples" : "repetitiva"}</b>.
				</p>
				<div className="switch-toggler">
					<button
						onClick={() => {
							setFormType(true);
						}}
						type="button"
						disabled={formType}
					>
						Simples
					</button>
					<button
						onClick={() => {
							setFormType(false);
						}}
						type="button"
						disabled={!formType}
					>
						Repetitiva
					</button>
				</div>
				<div>
					<TextInput
						name="title"
						label="Titulo"
						placeholder="Título"
						registerOp={register("title", {
							required: "Título é obrigatório",
							pattern: {
								value: /^[A-Za-z0-9 ]+$/,
								message:
									"O título da Task deve conter apenas letras, números e espaços",
							},
						})}
						errors={errors}
					/>
					<TextInput
						name="description"
						label="Descrição"
						placeholder="Descrição"
						registerOp={register("description", {
							required: "Descrição é obrigatória",
							pattern: {
								value: /^[A-Za-z0-9 .,!?'"()-]*$/,
								message:
									"O descrição da Task deve conter apenas letras, números e .,!?()'\"-",
							},
						})}
						errors={errors}
					/>
					<div className={`post-form ${formType ? "" : "hidden"}`}>
						<h4>Datas</h4>
						<div className="input-container date-container">
							{formType ? (
								<span
									className={`date-input ${
										taskDate ? "has-value" : ""
									}`}
								>
									<DateInput
										tipo="date"
										name="taskDate"
										label={<>Data de conclusão</>}
										registerOp={register("taskDate", {
											required: "Data é obrigatória",
											validate: validateDate,
										})}
										errors={errors}
									/>
									<DateInput
										tipo="time"
										name="taskHour"
										label={<>Hora</>}
										registerOp={register("taskHour", {
											required: "Hora é obrigatória",
										})}
										errors={errors}
									/>
								</span>
							) : null}
							<span className="date-input"></span>
						</div>
					</div>
					<div className={`post-form ${formType ? "hidden" : ""}`}>
						<div className="input-container">
							<label htmlFor="">Repetir</label>
							<div className="week-days">
								<Checkbox id={1} label="Dom" size={40} color="#2d528f" onChange={handleCheckboxChange} />
								<Checkbox id={2} label="Seg" size={40} color="#2d528f" onChange={handleCheckboxChange} />
								<Checkbox id={3} label="Ter" size={40} color="#2d528f" onChange={handleCheckboxChange} />
								<Checkbox id={4} label="Qua" size={40} color="#2d528f" onChange={handleCheckboxChange} />
								<Checkbox id={5} label="Qui" size={40} color="#2d528f" onChange={handleCheckboxChange} />
								<Checkbox id={6} label="Sex" size={40} color="#2d528f" onChange={handleCheckboxChange} />
								<Checkbox id={7} label="Sab" size={40} color="#2d528f" onChange={handleCheckboxChange} />
							</div>
						</div>
						<div className="input-container date-container">
							{!formType ? (
								<span
									className={`date-input ${
										taskDate ? "has-value" : ""
									}`}
								>
									<DateInput
										tipo="date"
										name="taskDate"
										label={<>Data Final</>}
										registerOp={register("taskDate", {
											required: "Data é obrigatória",
											validate: validateDate,
										})}
										errors={errors}
									/>
									<DateInput
										tipo="time"
										name="taskHour"
										label={<>Hora</>}
										registerOp={register("taskHour", {
											required: "Hora é obrigatória",
										})}
										errors={errors}
									/>
								</span>
							) : null}
							<span className="date-input"></span>
						</div>
					</div>
				</div>
			</div>
			<div className="other">
				<div className="input-container">
					<label htmlFor="">Notas</label>
					<textarea name="" id="notes"></textarea>
				</div>
				<Button label="Adicionar" type="fill" color="light" />
			</div>
		</form>
	);
}

export default Page;
