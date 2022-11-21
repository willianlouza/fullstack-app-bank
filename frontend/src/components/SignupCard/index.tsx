import Button from "../Button";
import TextField from "../Input/Text";
import PasswordField from "../Input/Password";
import { useRef, useState } from "react";
import Dialog from "../Dialog";
import axios, { AxiosError } from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { setToken, setId } from "../../utils/TokenStorage";

type Props = {
  onSwitch: () => void;
}
export default function SignUpCard(props: Props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  type DialogHandler = React.ElementRef<typeof Dialog>;
  const dialogRef = useRef<DialogHandler>(null);

  const handleSignUp = async () => {
    await axios({
      method: 'post',
      url: 'http://localhost:8080/api/auth/register',
      data: {
        username: username,
        password: password,
        confirmPassword: confirmPassword,
      }
    }).then(res => {
      dialogRef.current?.open(`Conta criada, ${res.data.body.user.username}!`, 'ok', 5000);
      setTimeout(async () => {
        props.onSwitch()
      }, 1000)
    }).catch(err => {
      dialogRef.current?.open(err.response.data.message, 'error', 5000);
    })

  }

  return (
    <div className='transition-all p-6 bg-black border-2 border-white m-auto rounded-lg w-96 h-2/4 flex flex-col'>
      <div>
        <h1 className='text-2xl'>Abrir Conta</h1>
        <span className='text-sm'>Já possui uma conta ? <a onClick={() => props.onSwitch()} className='text-indigo-600 cursor-pointer hover:text-indigo-400 hover:underline'>Entrar</a></span>
      </div>

      <form onSubmit={e => e.preventDefault()} action="#" className='mt-4 w-full h-full flex flex-col justify-around'>
        <TextField placeholder='Usuário' onChange={(value) => setUsername(value)} />
        <PasswordField placeholder='Senha' useValidation onChange={(value) => setPassword(value)} />
        <PasswordField placeholder='Confirmar Senha' useValidation onChange={(value) => setConfirmPassword(value)} />
        <Button text='Abrir Conta' onClick={() => handleSignUp()} className="mx-auto" negative />
      </form>

      <Dialog ref={dialogRef} />
    </div>
  )
}