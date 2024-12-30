import Image from "next/image";
import { SnowOverlay } from 'react-snow-overlay';

export default function Home() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <SnowOverlay maxParticles={75} disabledOnSingleCpuDevices/>
        <h1 className='text-center font-bold text-4xl font-christmas'>Happy new year 2025</h1>
      </main>
    </div>
  );
}
