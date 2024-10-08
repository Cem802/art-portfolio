import React from 'react'
import Gallery from './Gallery'

const images = [
  { src: "/images/loma_frogs/Face_Features.jpg", alt: "Image 1", project: 'loma_frogs', title: 'NFT Collection', customClass: 'md:col-span-3 md:row-span-2 col-span-3 row-span-2' },
  { src: "/images/chico_rap_cover_art/Unbenanntes_Projekt.jpg", project: 'chico_rap_cover_art', alt: "Image 2", title: 'Rap cover art', customClass: 'md:col-span-4 md:row-span-5 col-span-5 row-span-3' },
  { src: "/images/underground_records/Unbenanntes_Projekt 3.jpg", project: 'underground_records', alt: "Image 3", title: 'Posters', customClass: 'md:col-span-5 md:row-span-3 col-span-3 row-span-3' },
  { src: "/images/zany_gaming_studio/03_logo.PNG", alt: "Image 4", project: 'zany_gaming_studio', title: 'Gaming Studio', customClass: 'md:col-span-3 md:row-span-3 col-span-3 row-span-2' },
  { src: "/images/logo_jewelry/IMG_1803.jpg", project: 'logo_jewelry', alt: "Image 5", title: 'Logo Design', customClass: 'md:col-span-5 md:row-span-2 col-span-2 row-span-2 ' },
  { src: "/images/character_asset_design/Unbenanntes_Projekt 5.jpg", project: 'character_asset_design', alt: "Image 6", title: 'Character/Asset Design', customClass: 'md:col-span-5 md:row-span-4 col-span-4 row-span-4 ' },
  { src: "/images/horror/Unbenanntes_Projekt 8.jpg", project: 'horror', alt: "Image 7", title: 'Horror project', customClass: 'md:col-span-7 md:row-span-2 col-span-4 row-span-2 ' },
  { src: "/images/diner_restaurant/Unbenanntes_Projekt 3.jpg", project: 'diner_restaurant', title: 'Diner Merchandise', alt: "Image 8", customClass: 'md:col-span-4 md:row-span-2 col-span-2 row-span-2 ' },
  { src: "/images/nft_calendar/Unbenanntes_Projekt.jpg", project: 'nft_calendar', alt: "Image 9", title: 'NFT Calendar Logo', customClass: 'md:col-span-3 md:row-span-2 col-span-2 row-span-2 ' },
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