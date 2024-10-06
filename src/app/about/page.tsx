import Image from 'next/image'
import React from 'react'

function About() {
  return (
    <div className='bg-black min-h-[100vh] w-full pt-36 flex'>
        <div className='flex-1 flex p-10 bg-white gap-16 items-center justify-center'>
            <div className='w-1/4 flex justify-end'>
                <Image src='/images/sera.png' alt='Sera' width={200} height={200} className='rounded-md' />
            </div>
            <div className='w-3/4'>
                <h1 className='text-4xl'>About Me</h1>
                <p className='text-lg'>I am a digital artist who specializes in creating unique designs and illustrations. I have a passion for creating art that is both visually appealing and thought-provoking. My work is inspired by nature, technology, and the world around me. I strive to create art that is both beautiful and meaningful, and I am always looking for new ways to push the boundaries of my creativity.</p>
            </div>
        </div>
    </div>
  )
}

export default About