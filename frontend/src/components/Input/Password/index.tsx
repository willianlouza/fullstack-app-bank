import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useState } from "react";
import { validPassword } from "../../../utils/PasswordMask";

type InputProps = {
  placeholder?: string | '',
  useValidation?: boolean | false,
  name?: string | '',
  onChange: (value: string) => void;
}

export default function PasswordField(props: InputProps) {
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [valid, setValid] = useState(false);
  const [focused, setFocus] = useState(false);

  const verifyPassword = (password: string) => {
    if (validPassword(password)) {
      setValid(true);
    } else {
      setValid(false);
    }
    setValue(password);
    props.onChange(password);
  }

  return (
    <div className='relative'>
      <label htmlFor={props.name} className={`pointer-events-none absolute transition-all duration-200 px-3 rounded-lg ${value || focused ? '-top-3 left-4 text-white bg-black' : 'top-4 left-4 text-gray-400 bg-transparent'} `}>{props.placeholder}</label>
      <a href="#" className="" onClick={() => setVisible(!visible)}>
        {
          visible ?
            <EyeIcon color="white" className="absolute right-4 top-4 w-5" />
            :
            <EyeSlashIcon color="white" className="absolute right-4 top-4 w-5" />
        }
      </a>
      <input onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} onChange={(e) => { verifyPassword(e.target.value) }}
        value={value} type={visible ? 'text' : 'password'} name={props.name}
        className={`outline-none transition-colors duration-200 px-4 py-3 w-full bg-transparent border-b-2 border-white 
      focus:border-indigo-600 focus:border-2 focus:rounded-lg ${value ? `rounded-lg border-2  ${valid ? 'border-indigo-600' : props.useValidation ? 'border-red-500' : 'border-indigo-600'}` : ''}`} />

    </div>
  )
}