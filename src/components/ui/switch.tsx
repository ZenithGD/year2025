import { cn } from '@/src/utils/misc'
import { AnimatePresence, motion, useAnimate } from 'motion/react'
import React from 'react'


type Props = {
  value: boolean,
  toggleValue: () => void
}

function Switch({ value, toggleValue }: Props) {
  
  const [scope, animate] = useAnimate()

  return (
    <button
      className='flex items-center bg-green-950/60 rounded-sm h-5 w-10 p-1'
      style={{
        justifyContent: value ? "flex-end" : "flex-start"
      }}
      onClick={toggleValue}
    >
      <motion.div
        ref={scope}
        className='rounded-md h-4 w-4 bg-green-100 flex-end'
        animate
      />
    </button>
  )
}

export default Switch