import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import Link from 'next/link'
import React from 'react'

function Footer({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  }) {

  return (
    <div className="lg:flex-row flex-col items-center bg-green-600 lg:p-8 p-6 flex justify-center">
        <div className='flex-1'>
            {dictionary.madeBy} <Link className="font-bold transition duration-200 hover:text-green-300" href="https://github.com/ZenithGD">
                Darío Marcos Casalé
            </Link> - 2025
        </div>
        <div>
            <Link className="font-bold transition duration-200 hover:text-green-300" href="/credits">
                {dictionary.credits}
            </Link>
        </div>
    </div>
  )
}

export default Footer