import React, { ReactNode} from 'react'
import './inputs.scss'

interface TextInputProps {
	label: ReactNode;
  name: string;
  tipo: string;
	registerOp: any;
    errors: any;
}


const dateInput: React.FC<TextInputProps> = ({
	label,
  tipo,
  name,
	registerOp,
    errors
}) => {
  return (
    <div>
        <label htmlFor="">{label}</label>
        <input type={tipo} {...registerOp}/>
        {errors[name] && typeof errors[name]?.message === "string" && (
            <span>{errors[name]?.message}</span>
        )}
    </div>
  )
}

export default dateInput