import React, { useState } from "react";
import "./checkbox.scss";

interface CheckboxProps {
  id: number;
  size?: number;
  color?: string;
  checked?: boolean;
  label: string;
  onChange: (id: number, checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  size = 30,
  color = "#000",
  checked = false,
  label,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    onChange(id, newChecked);
  };

  return (
    <label style={{ display: "inline-block", cursor: "pointer" }} className="checkbox-input">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        style={{ display: "none" }}
      />
      <span
        className={`checkbox-span ${isAnimating ? "bubble-pop" : ""}`}
        style={{
          width: size,
          height: size,
          backgroundColor: isChecked ? color : "transparent",
          border: `2px solid ${color}`,
          borderRadius: "5px",
          color: isChecked ? "#fff" : color,
          position: "relative",
          transition: "background-color 0.3s",
        }}
      >
        {label}
      </span>
    </label>
  );
};

export default Checkbox;