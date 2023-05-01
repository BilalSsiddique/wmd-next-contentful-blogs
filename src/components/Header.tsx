import React from 'react'
import {FaBlog,FaGithub} from 'react-icons/fa'
import Link from 'next/link';
const Header = () => {
  return (
    <div className="bg-black drop-shadow-2xl  px-14 items-center h-12 flex justify-between">
      <Link href="/">
        <FaBlog size={28} color="white" />
      </Link>
      <Link href="https://github.com/BilalSsiddique/wmd-next-contentful-blogs" target='_blank'>
        <FaGithub size={28} color="white" />
      </Link>
    </div>
  );
}

export default Header