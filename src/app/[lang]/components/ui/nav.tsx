"use client"

import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { MAX_MOBILE_WIDTH, MAX_TABLET_WIDTH } from '@/src/utils/misc'
import { useMediaQuery } from 'react-responsive'
import { faAward, faBars, faPuzzlePiece, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'motion/react'

type Props = {}

function Nav({ }: Props) {

  return (
    <nav className='fixed flex justify-between gap-2 top-0 w-screen h-16 bg-green-800 z-50 shadow-md items-center px-8'>
      <Link className='text-2xl flex gap-1 items-center' href="/">
        <p>Year 2025</p>
        <Image src="/images/star.png" alt="Star icon" width={50} height={50}></Image>
      </Link>
      {
      // conditional media query flags mess up hydration
      /* {
        isMobile
          ? (
            <MobileNavMenu />
            ) 
          : (
            <div className='flex gap-2 items-center'>
              <Link href="/puzzle" className="px-4">
                <p>Puzzles</p>
              </Link>
              <Link href="/credits" className="px-4">
                <p>Credits</p>
              </Link>
            </div>
          )
      } */}
      <MobileNavMenu />
    </nav>
  )
}

function MobileNavMenu() {

  const [open, setOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {

    const handleClickOutside = (event: MouseEvent) => {
      if (!event || !event.target) return;

      // check if click is outside of the dropdown
      const target = event.target as Node;
      if (
        dropdownRef.current && !dropdownRef.current.contains(target) &&
        buttonRef.current && !buttonRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative'>
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className='bg-gradient-to-t from-green-600 to-green-500 filter drop-shadow-md p-2 px-3 gap-2 rounded-md flex justify-center items-center'
      >

        <FontAwesomeIcon icon={faBars} />
        <p>Menú</p>
      </button>
      <AnimatePresence>
        {open &&
          <motion.div
            className="flex flex-col w-48 bg-gradient-to-t from-green-600 to-green-500 rounded-md absolute top-full right-0 mt-2 gap-2 items-center p-1"
            ref={dropdownRef}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <Link href="/puzzle" className="p-2 flex items-center gap-1 w-full hover:bg-green-100/40 rounded-md">
              <FontAwesomeIcon className="w-6" icon={faPuzzlePiece} />
              <p>Puzzles</p>
            </Link>
            <Link href="/credits" className="p-2 flex items-center gap-1 w-full hover:bg-green-100/40 rounded-md">

              <FontAwesomeIcon className="w-6" icon={faUser} />
              <p>Credits</p>
            </Link>
            <Link href="/stats" className="p-2 flex items-center gap-1 w-full hover:bg-green-100/40 rounded-md">
              <FontAwesomeIcon className="w-6" icon={faAward} />
              <p>Stats</p>
            </Link>
          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}

export default Nav