import React from "react";
import { useEffect, useState } from "react"
import { currencyMask } from "../../../utils/CurrencyFormat";

type InputProps = {
  placeholder?: string | '',
  name?: string | '',
  className?: string | '',
  onChange: (value: string) => void;
}

export default function CurrencyField(props: InputProps) {
  const [value, setValue] = useState('0,00');
  const [focused, setFocus] = useState(false);

  const handleChange = (value: string) => {
    setValue(value);
    props.onChange(value)
  }

  return (
    <div className='relative'>
      <label htmlFor={props.name} className={`pointer-events-none absolute transition-all duration-200 px-3   ${value || focused ? '-top-3 left-4 text-white bg-black' : 'top-4 left-4 text-gray-400 bg-transparent'} `}>{props.placeholder}</label>
      <input onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} onChange={(e) => { handleChange(e.target.value) }}
        value={value} type="text" name={props.name}
        className={`${props.className} appearance-none outline-none transition-colors duration-200 px-4 py-3 w-full bg-transparent border-b-2 border-white
        focus:border-indigo-600 focus:border-2 focus:rounded-lg ${value ? 'rounded-lg border-2 border-indigo-600 ' : ''}`} />
    </div>
  )
}