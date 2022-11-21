import React from "react";


type DropdownProps = {
  label: string,
  children: React.ReactNode;
  onChange: (value: string) => void
}

export default function Dropdown(props: DropdownProps) {

  return (
    <div className="relative w-full lg:max-w-sm ">
      <span className="font-bold text-gray-600">{props.label}</span>
      <select onChange={(e) => props.onChange(e.target.value)} className="w-full p-2.5 text-gray-500 cursor-pointer bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
        {props.children}
      </select>
    </div>
  )
}