import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { SignInButton, SignedOut, UserButton } from '@clerk/nextjs'
import { ThemeToggler } from './ThemeToggler'

function Header() {
  return (
    <header className='flex items-center justify-between'>

        <Link href="/" className='flex items-center space-x-3'>
        <div className='bg-[#0160FE] w-fit'>
            <Image 
                src="https://www.shareicon.net/download/2016/07/13/606936_dropbox_2048x2048.png" 
                alt="logo"
                className='invert'
                width={50}
                height={50}
            />
        </div>
        <h1 className='font-bold text-xl'>Dropbox</h1>
        </Link>

        <div className='px-5 flex items-center space-x-3'>
            {/* Theme Toggler */}
            <ThemeToggler/>
            <UserButton afterSignOutUrl="/" />

            <SignedOut>
                <SignInButton afterSignInUrl="/dashboard" mode="modal" />
            </SignedOut>
        </div>

    </header>
  )
}

export default Header