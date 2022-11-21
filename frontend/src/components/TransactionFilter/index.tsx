import React from "react";
import Dropdown from "../Dropdown";


type FilterProps = {
  onChangeDate: (value: string) => void;
  onChangeTransaction: (value: string) => void;
}
export default function TransactionFilter(props: FilterProps) {
  return (
    <div className="flex flex-col justify-around h-40 lg:h-auto lg:flex-row lg:justify-between">
      <Dropdown label="Data" onChange={(value) => props.onChangeDate(value)}>
        <option value="0">Tudo</option>
        <option value="3">Últimos 3 dias</option>
        <option value="7">Últimos 7 dias</option>
        <option value="15">Últimos 15 dias</option>
        <option value="30">Últimos 30 dias</option>
      </Dropdown>

      <Dropdown label="Transação" onChange={(value) => props.onChangeTransaction(value)}>
        <option value="0">Todas</option>
        <option value="1">Entrada</option>
        <option value="2">Saída</option>
      </Dropdown>
    </div>
  )
}