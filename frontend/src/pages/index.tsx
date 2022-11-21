import SignInCard from '../components/SigninCard'
import SignUpCard from '../components/SignupCard'
import { useState } from 'react'
import React from "react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className='min-h-screen w-screen flex place-content-center text-white'>
      <main className='w-full bg-black flex'>
        <img src='./logo.svg' width={72} height={32} className="fixed top-6 left-4" />
        {
          isLogin ?
            <SignInCard onSwitch={() => setIsLogin(!isLogin)} />
            :
            <SignUpCard onSwitch={() => setIsLogin(!isLogin)} />
        }
      </main >
    </div >
  )
}
