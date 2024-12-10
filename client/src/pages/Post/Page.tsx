import { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import "./style.scss";

//components
import Button from "../../ui/components/buttons/Button";
import TextInput from "../../ui/components/inputs/textInput";
import DateInput from "../../ui/components/inputs/dateInput";
import Checkbox from "../../ui/components/inputs/checkBoxChange";
import category from "../../data/hooks/category";
import Loading from "../../ui/components/loading/Loading";
import Select from "react-select";

// form input types
interface FormInputs {
	title: string;
	description: string;
	taskDate: string;
	taskHour: string;
	notes: string;
	category: { value: string; label: string };
	days: number[];
}

function Page() {
	const { categories, loading } = category.useCategory();
	const [formType, setFormType] = useState(true);
	const [repFinalDate, setRepFinalDate] = useState<boolean>(true);
	const [checkedDays, setCheckedDays] = useState<number[]>([]);
	const {
		register,
		handleSubmit,
		watch,
		control,
		setValue,
		formState: { errors },
	} = useForm<FormInputs>({
		mode: "onBlur",
	});
	const taskDate = watch("taskDate");

	useEffect(() => {
		setValue("days", checkedDays);
	}, [checkedDays]);

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
		setCheckedDays((prev) => {
            return checked ? [...prev, id] : prev.filter((dayId) => dayId !== id);
        });
	};

	if (loading) {
		return <Loading/>;
	}

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
								{[1, 2, 3, 4, 5, 6, 7].map((day) => (
                                    <Controller
                                        key={day}
                                        name="days"
                                        control={control}
										rules={{
                                            validate: () => !formType ? (checkedDays?.length > 0 || "Selecione pelo menos um dia") : undefined,
                                        }}
                                        render={({}) => (
                                            <Checkbox
                                                id={day}
                                                label={["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"][day - 1]}
                                                size={40}
                                                color="#2d528f"
                                                onChange={(day, checked) => handleCheckboxChange(day, checked)}
                                            />
                                        )}
                                    />
                                ))}
							</div>
							{errors.days && (
								<span className="error">{errors.days.message}</span>
							)}
						</div>
						<h4>Datas</h4>
						<div className="form-check form-switch switch-date">
							<input
								className="form-check-input"
								type="checkbox"
								role="switch"
								id="flexSwitchCheckDefault"
								onChange={() => setRepFinalDate(!repFinalDate)}
							></input>
							<label
								className="form-check-label"
								htmlFor="flexSwitchCheckDefault"
							>
								Até eu desativar
							</label>
						</div>
						<div className="input-container date-container">
							{!formType && repFinalDate ? (
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
					<textarea
						id="notes"
						{...register("notes", {
							pattern: {
								value: /^[A-Za-z0-9 .,!?'"()-]*$/,
								message:
									"As notas da Task deve conter apenas letras, números e .,!?()'\"-",
							},
						})}
					></textarea>
					{errors.notes && (
						<span className="error">{errors.notes.message}</span>
					)}
				</div>
				<div className="input-container input-select">
					<label htmlFor="">Categoria</label>
					<Controller
                        name="category"
                        control={control}
                        rules={{ required: "Categoria é obrigatória" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={categories.map((category) => ({
                                    value: category.name,
                                    label: category.name,
                                }))}
                            />
                        )}
                    />
                    {errors.category && (
                        <span className="error">{errors.category.message}</span>
                    )}
				</div>
				<Button label="Adicionar" type="fill" color="light" />
			</div>
		</form>
	);
}

export default Page;
