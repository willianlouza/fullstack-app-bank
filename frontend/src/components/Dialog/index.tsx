import React, { ForwardedRef, forwardRef, useImperativeHandle, useState } from "react"

type Props = {}
type DialogHandler = {
  close: () => void
  open: (message: string, status: string, duration: number) => void

}
const Dialog: React.ForwardRefRenderFunction<DialogHandler, Props> = ((props: Props, ref) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('none');

  useImperativeHandle(ref, () => ({
    close() {
      setVisible(false)
    },
    open(message: string, status: string, duration: number) {
      setVisible(true);
      setMessage(message);
      setStatus(status);
      setTimeout(() => setVisible(false), duration);
    }
  }));

  return (
    <div className={`
      ${visible ? 'bottom-0' : ' -bottom-16 opacity-0'}
      ${status === 'error' ? 'bg-rose-600' : status === 'ok' ? 'bg-emerald-600' : 'bg-white'}
      w-full h-16 fixed left-0 rounded-t-3xl flex place-content-center place-items-center transition-all duration-300
    `}>
      <span>
        {message}
      </span>
    </div>
  )
})


export default React.forwardRef(Dialog);