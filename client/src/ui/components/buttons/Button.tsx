import React from "react";
import "./button.scss";
import { ButtonProps } from "../../../data/types/ButtonProps";

const Button: React.FC<ButtonProps> = ({
	onClick,
	label,
	disabled = false,
	type = "fill",
	color = "light",
    width = "70%",
    minWidth = "225px",
}) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`btn-${type} btn-${color}`}
            style={{ width, minWidth }}
		>
			{label}
		</button>
	);
};

export default Button;
