import React from 'react';

type Props = { message: string };

function LoadingScreen({ message }: Props) {
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-lg text-green-100">{message}</p>
    </div>
  );
}

export default LoadingScreen;