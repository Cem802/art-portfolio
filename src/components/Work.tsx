import React from 'react'
import Gallery from './Gallery'

const images = [
  { src: "/images/nftFrog/01_design.jpg", alt: "Image 1", project: 'nft-frog', customClass: 'md:col-span-3 md:row-span-2 col-span-3 row-span-2' },
  { src: "/images/rapcover/01_chico_custom_rapcover.jpg", project: 'rap-cover', alt: "Image 2", customClass: 'md:col-span-4 md:row-span-5 col-span-5 row-span-3' },
  { src: "/images/undergroundRec/01_studio_duck.jpg", project: 'underground-records', alt: "Image 3", customClass: 'md:col-span-5 md:row-span-3 col-span-3 row-span-3' },
  { src: "/images/zany/03_logo.png", alt: "Image 3", project: 'zany', customClass: 'md:col-span-3 md:row-span-3 col-span-3 row-span-2' },
  { src: "/images/logoJewelry/IMG_1803.jpg", project: 'logo-jewelry', alt: "Image 3", customClass: 'md:col-span-5 md:row-span-2 col-span-2 row-span-2 ' },
];

function Work() {
  return (
    <div id='work' className='p-4 overflow-hidden'>
        <div className='w-full flex justify-center items-center p-20'>
            <h1 className="text-4xl text-center text-white">Design Work and Illustration</h1>
        </div>
        <Gallery images={images} />
    </div>
  )
}

export default Work