import React from "react"

type ButtonProps = {
  text: string,
  negative?: boolean | false
  rounded?: boolean | false,
  className?: string | '',
  size?: 'sm' | 'md' | 'lg',
  onClick: (props: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}
export default function Button(props: ButtonProps) {
  const size = props.size || 'md';
  return (
    <div className={`relative group w-52 h-16 ${size === 'sm' ? 'w-36 h-14 text-lg' : size === 'md' ? 'w-52 h-16 text-xl' : 'w-72 h-20 text-3xl'} ${props.className}`}>
      <button onClick={(event) => props.onClick(event)}
        className={`${props.negative ? 'bg-white text-black border-black ' : 'bg-black text-white border-white'}
        ${props.rounded ? 'rounded-full' : 'rounded-md'} 
        font-bold w-full h-full border-2 absolute -top-1 -left-1
       group-hover:text-indigo-600 group-active:left-0 group-active:top-0 transition-all duration-75 z-10`}>
        {props.text}
      </button>
      <span className={`${props.negative ? 'border-white bg-black ' : 'border-black bg-white '}
       ${props.rounded ? 'rounded-full' : 'rounded-md'}
        top-0 left-0 border-2  absolute w-full h-full transform-none`}></span>
    </div>
  )
}