import React from "react";

interface TextInputProps {
	name: string;
	label: string;
    placeholder: string;
	registerOp: any;
    errors: any;
}

const TextInput: React.FC<TextInputProps> = ({
	name,
	label,
    placeholder,
	registerOp,
    errors
}) => {
	return (
		<div className="input-container">
			<label htmlFor={name}>{label}</label>
			<input
				type="text"
				id={name}
				placeholder={placeholder}
				{...registerOp}
			/>
			{errors[name] && typeof errors[name]?.message === "string" && (
				<span>{errors[name]?.message}</span>
			)}
		</div>
	);
};

export default TextInput;
