import Image from 'next/image'
import React from 'react'

function About() {
  return (
    <div className='bg-black min-h-[100vh] w-full pt-36 flex'>
        <div className='flex-1 flex md:flex-row flex-col p-10 gap-16 items-center justify-center'>
            <div className='md:w-1/4 flex justify-end'>
                <Image src='/assets/sera.png' alt='Sera' width={200} height={200} className='rounded-md' />
            </div>
            <div className='text-white md:w-3/4'>
                <h1 className='text-4xl'>About Me</h1>
                <p className='text-lg'>I'm a 22-year-old digital artist with a passion for transforming imagination into visuals. Whether it’s crafting striking concert art, sleek logo design, or building unique characters, I love to explore the boundaries of creativity. My work thrives on bold color palettes and inventive design that bring ideas to life.</p>
            </div>
        </div>
    </div>
  )
}

export default About