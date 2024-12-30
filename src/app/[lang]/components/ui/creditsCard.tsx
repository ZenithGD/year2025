import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

type Props = {
  name: string,
  author: string,
  url: string,
  asset: string
}

function CreditsCard({name, author, url, asset}: Props) {
  return (
    <Link className="h-full lg:w-64 md:w-48 w-32 bg-green-400 rounded-lg filter shadow-lg hover:scale-105 transition duration-100" href={url} >
      <div className='w-full aspect-[3/2]'>
        <div className='relative w-full h-full'>
          <Image
            src={asset}
            alt={name + ", by " + author}
            layout="fill"
            className='rounded-t-lg border-green-300 object-cover'
          />
        </div>
      </div>
      <div className='flex w-full justify-between bg-gradient-to-r from-red-50 to-red-200 rounded-b items-center px-4 p-2'>
        <h2 className='text-lg text-red-600 font-bold'>{name}</h2>
        <p className='text-red-800'>{author}</p>
      </div>
    </Link>
  )
}

export default CreditsCard