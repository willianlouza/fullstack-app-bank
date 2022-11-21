import { useEffect, useState } from "react";
import Button from "../Button";
import { removeId, removeToken } from "../../utils/TokenStorage";
import React from "react";
import { useNavigate } from "react-router-dom";

type NavProps = {
  hiddenOption?: boolean | false;
  className?: string | '';
}
export default function Navbar(props: NavProps) {
  const [mount, setMounted] = useState(false)
  const navigate = useNavigate();

  useEffect(() => setMounted(true), [])
  if (!mount) return null

  const quit = () => {
    removeId();
    removeToken();
    navigate("/");
  }

  return (
    <div className={`${props.className} fixed top-0 left-0 flex justify-between items-center w-full p-4 bg-white dark:bg-black z-50`}>
      <div>
        <img src='/logo.svg' alt="" width={72} height={32} />
      </div>
      {props.hiddenOption ?
        ''
        :
        <div className="flex">
          <Button text="sair" onClick={() => quit()} rounded size='sm' />
        </div>
      }

    </div>
  )
}
