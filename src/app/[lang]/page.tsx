import Image from "next/image";
import { SnowOverlay } from 'react-snow-overlay';
import { useDictionary } from "./context/i18n/dictionaryProvider";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default async function Home(props: {
  params: Promise<{ lang: Locale }>;
}) {

  const { lang } = await props.params;

  const dictionary = await getDictionary(lang);

  return (
    <div className="items-center justify-items-center min-h-screen">
      <main className="flex flex-col gap-8 items-center">
        <SnowOverlay maxParticles={75} disabledOnSingleCpuDevices/>
        <h1 className='text-center font-bold lg:text-4xl text-2xl font-christmas'>{dictionary.happyNewYear}</h1>
        <p className="text-center">
          {dictionary.introText}
        </p>
        <Link
          href="/puzzle"
          className='filter drop-shadow-md bg-gradient-to-t from-green-700 to-green-600 divide-x flex justify-between items-center p-1 bg-green-600 hover:from-green-600 hover:to-green-500 rounded-md'
        >
          <p className='self-center w-full text-green-100 font-bold flex-grow px-2'>{dictionary.goToPuzzles}</p>
          <FontAwesomeIcon className='text-green-100  aspect-square pl-3 p-2' icon={faArrowRight} />
        </Link>
      </main>
    </div>
  );
}
