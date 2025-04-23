'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
  const router = useRouter();
  return (
    <h1 className="relative cursor-pointer" onClick={() => router.push('/')}>
      <Image src="/logo.svg" alt="Logo" width={55} height={20} priority />
    </h1>
  );
};

export default Logo;
