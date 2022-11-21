import React, { useRef, useState } from "react";
import { currencyMask } from "../../utils/CurrencyFormat";
import Button from "../Button";
import Dialog from "../Dialog";
import axios from "axios";

type Props = {
  onSubmit: (name: string, value: number) => void,
  onCancel: () => void,
}
export default function TransactionPanel(props: Props) {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  type DialogHandler = React.ElementRef<typeof Dialog>;
  const dialogRef = useRef<DialogHandler>(null);

  const handleValue = (value: string) => {
    const mask = currencyMask(value);
    setValue(mask);
  }
  const handleName = (value: string) => {
    setName(value);
  }
  const submit = () => {
    if (!name || !value) {
      dialogRef.current?.open('Precisa preencher todos os campos!', 'error', 2000)
      return;
    }
    let val = value.split(' ')[1];
    let val2 = val.split('.').join('');
    let num = val2.split(',').join('.');
    props.onSubmit(name, parseFloat(num));
  }
  return (
    <div className="fixed flex top-0 left-0  w-full h-full bg-black bg-opacity-40 z-100" >
      <div className="relative w-96 h-96 rounded-lg bg-black text-white shadow-md shadow-neutral-600 border-2 m-auto flex flex-col justify-between items-center">
        <div className="absolute w-8 h-8 border-2 border-white top-3 left-3 flex rounded-full  cursor-pointer hover:scale-105" onClick={() => props.onCancel()}>
          <span className="m-auto text-lg font-bold">X</span>
        </div>
        <div className="w-2/3 mt-12">
          <input type="text" placeholder="Destinatário" className="p-5 bg-neutral-900 rounded-sm my-4" value={name} onChange={(e) => handleName(e.target.value)} />
          <input type="text" placeholder="Valor" className="p-5 bg-neutral-900 rounded-sm my-4" value={value} onChange={(e) => handleValue(e.target.value)} />
        </div>
        <div className="flex flex-col justify-between p-2">
          <Button text="transferir" negative className='my-4' onClick={() => submit()} />
        </div>
      </div>

      <Dialog ref={dialogRef} />
    </div>
  )
}