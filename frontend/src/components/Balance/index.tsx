import React from "react";


type BalanceProps = {
  value: number;
}
export default function Balance(props: BalanceProps) {


  return (
    <div className="flex place-items-center place-content-center w-96 h-32 text-center  rounded-md  font-bold text-5xl p-2 text-black bg-white lg:place-content-start">
      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.value)}
    </div>
  )
}