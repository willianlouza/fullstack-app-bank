import TextField from "../Input/Text";
import PasswordField from "../Input/Password";
import Button from "../Button";
import { useEffect, useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import { setToken, setId, getToken, getId } from '../../utils/TokenStorage'
import Dialog from "../Dialog";
import React from "react";
import { useNavigate, useParams } from "react-router-dom"
type Props = {
  onSwitch: () => void;
}

export default function SignInCard(props: Props) {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  type DialogHandler = React.ElementRef<typeof Dialog>;
  const dialogRef = useRef<DialogHandler>(null);

  const handleSignIn = async () => {
    if (!username || !password) return dialogRef.current?.open('Preencha os campos!', 'error', 3000);
    await axios({
      method: 'post',
      url: 'http://localhost:8080/api/auth/login',
      data: {
        username: username,
        password: password
      }
    }).then(res => {
      setToken(res.data.token);
      setId(res.data.user.id);
      dialogRef.current?.open(`Bem vindo, ${res.data.user.username}!`, 'ok', 3000);

      setTimeout(() => {
        navigate(`/account/${res.data.user.id}`)
      }, 2000)
    }).catch(err => {
      dialogRef.current?.open(err.response.data.message, 'error', 5000);
    })
  }

  return (
    <div className='transition-all p-6 bg-black border-2 border-white m-auto rounded-lg w-96 h-1/2 flex flex-col '>
      <div>
        <h1 className='text-2xl'>Entrar</h1>
        <span className='text-sm'>Não possui uma conta ? <a onClick={() => props.onSwitch()}
          className='text-indigo-600 cursor-pointer hover:text-indigo-400 hover:underline'>Criar Conta</a></span>
      </div>

      <form onSubmit={e => e.preventDefault()} action="#" className='my-4 w-full h-full flex flex-col justify-evenly'>
        <TextField placeholder='Usuário' onChange={(value) => setUsername(value)} />
        <PasswordField placeholder='Senha' onChange={(value) => setPassword(value)} />
        <Button text='Entrar' onClick={() => handleSignIn()} className="mx-auto" negative />
      </form>

      <Dialog ref={dialogRef} />
    </div>
  )
}