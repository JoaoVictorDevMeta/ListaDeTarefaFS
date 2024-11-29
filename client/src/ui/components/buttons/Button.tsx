import React from "react";
import "./button.scss";

interface ButtonProps {
	onClick?: () => void;
	label: string;
	disabled?: boolean;
	type: "fill" | "outline";
	color: "light" | "dark";
}

const Button: React.FC<ButtonProps> = ({
	onClick,
	label,
	disabled = false,
	type = "fill",
	color = "light",
}) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`btn-${type} btn-${color}`}
		>
			{label}
		</button>
	);
};

export default Button;
