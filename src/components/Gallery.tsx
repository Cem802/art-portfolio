'use client'
import Image from 'next/image';
import { useState } from 'react';

const Gallery = ({ images }: {images: any}) => {
  return (
    <div className="grid gap-4 md:grid-cols-12 grid-cols-8 auto-rows-[100px] md:auto-rows-[150px]">
      {images.map((image: any, index: number) => (
        <Item key={index} image={image} />
      ))}
    </div>
  );
};

const Item = ({ image}: {image: any}) => {
    const [hover, setHover] = useState(false)
    return (
        <div
            className={`relative overflow-hidden cursor-pointer ${
                image.customClass ? image.customClass : ''
            }`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <Image
                src={image.src}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                className="object-cover w-full h-full animate-fadeIn"
            />
            {hover && (
                <div className='absolute w-full h-full p-4 bg-black bg-opacity-80'>
                    <h1 className="text-white text-2xl font-bold">Title</h1>
                    <p className="text-white">Description</p>
                </div>
            )}
        </div>
    )
}

export default Gallery;
