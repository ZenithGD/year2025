import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react'
import { SnowOverlay } from 'react-snow-overlay';

type Props = {
  params: Promise<{ lang: Locale }>;
}

async function HowTo(props: Props) {
  const { lang } = await props.params;

  const dictionary = await getDictionary(lang);

  return (
    <div className="items-center justify-items-center">
      <main className="flex flex-col gap-6 items-center">
        <SnowOverlay maxParticles={75} disabledOnSingleCpuDevices/>
        <h1 className='text-center font-bold lg:text-4xl text-2xl font-christmas'>{dictionary.menu.howto}</h1>
        {selectLocaleContent(lang)}
      </main>
    </div>
  );
}

function selectLocaleContent(lang: Locale)
{
  switch (lang)
  {
    case "es":
      return <ESHowTo />
    case "en":
      return <ENHowTo />
    case "fr":
      return <FRHowTo />
  }
}

function ESHowTo({})
{
  return <p>En desarrollo...</p>
}

function FRHowTo({})
{
  return <p>en développement...</p>
}

function ENHowTo({})
{
  return <p>In development...</p>
}

export default HowTo