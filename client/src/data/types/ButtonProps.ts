export interface ButtonProps {
	onClick?: () => void;
	label: string;
	disabled?: boolean;
	type: "fill" | "outline";
	color: "light" | "dark";
    width?: string;
    minWidth?: string;
}