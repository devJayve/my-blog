'use client';
import { clsx } from 'clsx';
import { Moon, Sun } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const navLinks = [
    { href: '/blog', label: 'Blog' },
    { href: '/library', label: 'Library' },
    { href: '/', label: 'About' },
  ];

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
    document.documentElement.classList.toggle('dark', newMode);
  };

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
      document.documentElement.classList.toggle('dark', JSON.parse(savedMode));
    }
  }, []);

  return (
    <header className="flex items-center justify-between p-4">
      <Image src="/images/window_logo.png" alt="logo" width={40} height={40} />
      <nav className="flex gap-6">
        {navLinks.map(link => (
          <Link key={link.href} href={link.href} className={clsx('transition-all duration-150')}>
            {link.label}
          </Link>
        ))}
      </nav>
      <button
        onClick={toggleDarkMode}
        className={clsx(
          'rounded-lg p-2 transition-colors duration-200',
          darkMode ? 'text-yellow-300' : 'text-gray-700 dark:text-gray-300',
        )}
      >
        {darkMode ? <Moon /> : <Sun className="text-red-700" />}
      </button>
    </header>
  );
}
