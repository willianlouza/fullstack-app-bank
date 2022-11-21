import Navbar from '../components/Navbar';
import Balance from '../components/Balance';
import Button from '../components/Button';
import TransactionHistory from '../components/TransactionHistory';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { getId, getToken, removeId } from '../utils/TokenStorage';
import { useParams } from 'react-router-dom';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import TransactionPanel from '../components/TransactionPanel';
import Dialog from '../components/Dialog';

export default function Account() {
  const [accountID, setAccountID] = useState(0);
  const [mount, setMounted] = useState(false);
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(0);
  const [panelOpen, setPanelOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  type DialogHandler = React.ElementRef<typeof Dialog>;
  const dialogRef = useRef<DialogHandler>(null);

  useEffect(() => {
    if (!id) return;
    loadAccount().then(() => {
      setMounted(true);
    }).catch(() => {
      removeId();
      navigate('/')
    });
  }, [])

  const loadAccount = async () => {
    const token = getToken();
    const res = await axios({
      method: 'get',
      url: `http://localhost:8080/api/account/${id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setName(res.data.user.username)
    setBalance(res.data.balance);
    setAccountID(res.data.user.accountID);
  }

  const makeTransaction = async (name, value) => {
    const token = getToken();
    await axios({
      method: 'post',
      url: `http://localhost:8080/api/transaction/${id}`,
      params: {
        to: name,
        value: value
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      dialogRef.current?.open('Transação concluída!', 'ok', 1000);
      window.location.reload();
    }).catch(err => {
      dialogRef.current?.open(err.response.data.message, 'error', 1000);
    })
  }

  if (!mount) return null;

  return (
    <div className='min-h-screen w-full flex place-content-center'>
      {panelOpen ? <TransactionPanel onSubmit={(name, value) => makeTransaction(name, value)} onCancel={() => { setPanelOpen(false) }} /> : ''}

      <header>
        <Navbar className='transition-color duration-500' />
      </header>

      <main className='w-full bg-white transition-color duration-500'>
        <div className='pt-28 pb-24 p-4 lg:px-16 bg-black flex flex-col relative overflow-hidden transition-color duration-500'>
          <div className='w-full flex flex-col-reverse place-items-center text-left lg:flex-row lg:justify-between lg:text-right'>
            <Balance value={balance} />
            <h1 className='font-bold text-4xl mb-12 text-white lg:mb-0'>Olá, <br />{name}</h1>
          </div>
          <div className='w-full flex justify-center lg:justify-start'>
            <Button text='transferir' onClick={() => setPanelOpen(true)} className='mt-6' negative />
          </div>
          <div>
            <div className='absolute wave animate-wave-0 bottom-0 left-0 bg-white transition-color duration-500'></div>
            <div className='wave animate-wave-1 absolute bottom-0 left-0 bg-white transition-color duration-500'></div>
            <div className='wave animate-wave-2 absolute bottom-0 left-0 bg-white transition-color duration-500'></div>
          </div>
        </div>

        <div className='w-full lg:px-16 pt-4 px-4 bg-black dark:bg-white transition-color duration-500'>

          <TransactionHistory accountID={accountID} />

        </div>

      </main >
      <Dialog ref={dialogRef} />
    </div >
  )
}
