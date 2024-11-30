import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import "./checkbox.scss";

interface CheckboxProps {
  size?: number;
  color?: string;
  checked?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  size = 30,
  color = "#000",
  checked = false,
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
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
          borderRadius: "50%",
          position: "relative",
          transition: "background-color 0.3s",
        }}
      >
        {isChecked && (
          <FaCheck
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#fff",
            }}
          />
        )}
      </span>
    </label>
  );
};

export default Checkbox;