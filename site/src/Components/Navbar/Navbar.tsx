"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi"; // Ícones para o menu

const Navbar: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true); // Ativa após o componente montar
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen); // Ativa após clicar no menu
  };
  if (!isMounted) return null; // Evita o erro de hidratação

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold ">
          <Link
            className="flex items-center space-x-3 rtl:space-x-reverse gap-4"
            href="/"
          >
            <Image
              src="https://flowbite.com/docs/images/logo.svg"
              width={32}
              height={32}
              alt="Logo"
            ></Image>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Poketools
            </span>
          </Link>
        </div>
        {/* Menu para tela grande */}
        <div className="hidden md:flex space-x-4">
          <Link href="/">
            <span className="text-gray-300 hover:text-white">Home</span>
          </Link>
          <Link href="/about">
            <span className="text-gray-300 hover:text-white">About</span>
          </Link>
          <Link href="/contact">
            <span className="text-gray-300 hover:text-white">Contact</span>
          </Link>
        </div>

        {/* Ícone de Menu para Mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile (exibido quando o menu está aberto) */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
          <Link href="/">
            <span
              className="text-gray-300 hover:text-white"
              onClick={toggleMenu}
            >
              Home
            </span>
          </Link>
          <Link href="/about">
            <span
              className="text-gray-300 hover:text-white"
              onClick={toggleMenu}
            >
              About
            </span>
          </Link>
          <Link href="/contact">
            <span
              className="text-gray-300 hover:text-white"
              onClick={toggleMenu}
            >
              Contact
            </span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
