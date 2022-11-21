import TransactionFilter from "../TransactionFilter";
import TransactionTable from "../TransactionTable";
import axios from "axios"
import { useEffect, useState } from "react";
import React from "react";
import { getToken } from "../../utils/TokenStorage";
import { useParams } from "react-router-dom";
import DateFormat from "../../utils/DateFormat";

type Props = {
  accountID: number;
}
export default function TransactionHistory(props: Props) {
  const [rows, setRows] = useState<React.ReactNode[]>([])
  const { id } = useParams();

  useEffect(() => {
    loadAll();
  }, []);
  const handlerDateFilter = (value: string) => {
    console.log(value);
  }
  const handlerTransactionFilter = async (value: string) => {
    switch (value) {
      case '0':
        await loadAll();
        break;
      case '1':
        await loadEntries();
        break;
      case '2':
        await loadDebits();
        break;
      default:
        break;
    }
  }

  const loadAll = async () => {
    const res = await axios({
      method: 'get',
      url: `http://localhost:8080/api/transaction/find/${id}`,
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    let rows: React.ReactNode[] = [];
    const transactions = res.data.transactions;
    let color = props.accountID === transactions.creditedAccountId ? 'green' : 'red';
    transactions.forEach((t: any, key: number) => {
      rows.push(createRow(t.createdAt, t.value, key, color))
    })
    setRows(rows);

  }
  const loadEntries = async () => {
    const res = await axios({
      method: 'get',
      url: `http://localhost:8080/api/transaction/find/${id}`,
      params: {
        type: 'credit'
      },
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    let rows: React.ReactNode[] = [];
    const transactions = res.data.credits;
    let color = props.accountID === transactions.creditedAccountId ? 'green' : 'red';
    transactions.forEach((t: any, key: number) => {
      rows.push(createRow(t.createdAt, t.value, key, color))
    })
    setRows(rows);
  }
  const loadDebits = async () => {
    const res = await axios({
      method: 'get',
      url: `http://localhost:8080/api/transaction/find/${id}`,
      params: {
        type: 'debit'
      },
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    let rows: React.ReactNode[] = [];
    const transactions = res.data.debits;
    let color = props.accountID === transactions.creditedAccountId ? 'green' : 'red';
    transactions.forEach((t: any, key: number) => {
      rows.push(createRow(t.createdAt, t.value, key, color))
    })
    setRows(rows);
  }
  const createRow = (date: string, value: number, key: number, color: string): React.ReactNode => {
    return (
      <tr className="border-b" key={key}>
        <td className="text-md font-bold px-6 py-4 whitespace-nowrap">
          {DateFormat(date)}
        </td>
        <td className={`text-md font-bold px-6 py-4 whitespace-nowrap ${color === 'red' ? 'text-red-400' : color === 'green' ? 'text-emerald-400' : 'text-white'}`}>
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)}
        </td>
      </tr>
    )
  }

  return (
    <div className="w-full">
      <TransactionFilter onChangeDate={(value) => handlerDateFilter(value)} onChangeTransaction={(value) => handlerTransactionFilter(value)} />

      <TransactionTable>
        {rows}
      </TransactionTable>


    </div >
  )
}