'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef, ForwardedRef, forwardRef, MutableRefObject } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Video } from './Video';

const Gallery = ({ assets, contain }: { assets: any, contain?: boolean }) => {
  const galleryRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLDivElement;
          if (entry.isIntersecting) {
            target.classList.add('animate-fadeIn');
            target.style.opacity = '1';
          } else {
            // target.classList.remove('animate-fadeIn');
            // target.style.opacity = '0';
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the item is visible
    );

    galleryRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      galleryRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const [zoomedImageIndex, setZoomedImageIndex] = useState<number | null>(null);
  const openZoomedImage = (index: number) => {
    setZoomedImageIndex(index);
  };
  const closeZoomedImage = () => {
    setZoomedImageIndex(null);
  };
  const showPreviousImage = () => {
    if (zoomedImageIndex !== null && zoomedImageIndex > 0) {
      setZoomedImageIndex(zoomedImageIndex - 1);
    }
  };
  const showNextImage = () => {
    if (zoomedImageIndex !== null && zoomedImageIndex < assets.length - 1) {
      setZoomedImageIndex(zoomedImageIndex + 1);
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-12 grid-cols-8 auto-rows-[100px] md:auto-rows-[150px]">
      {assets.map((asset: any, index: number) => (
        <Item key={index} asset={asset} contain={contain} onClick={() => openZoomedImage(index)} ref={(el) => {
          galleryRefs.current[index] = el;
        }} />
      ))}
      {zoomedImageIndex !== null && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex justify-center items-center z-[1000]">
          <button onClick={closeZoomedImage} className="absolute top-4 right-4 text-white text-3xl z-[1001]">
            <FontAwesomeIcon icon={faClose} />
          </button>
          <button onClick={showPreviousImage} className="absolute left-4 text-white text-3xl z-[1001]">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button onClick={showNextImage} className="absolute right-4 text-white text-3xl z-[1001]">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
          <div className='relative w-[90vw] h-[90vh]'>
            {assets[zoomedImageIndex].type === 'image' && (
              <Image src={assets[zoomedImageIndex].src} alt="zoomed-image" fill={true} objectFit="contain" className='' />
            )}
            {assets[zoomedImageIndex].type === 'video' && (
              <Video source={assets[zoomedImageIndex].src} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Item = forwardRef<HTMLDivElement, { asset: any; contain: boolean | undefined; onClick: () => void }>(({ asset, contain, onClick }, ref) => {
  const [hover, setHover] = useState(false);
  const router = useRouter();

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden cursor-pointer opacity-0 ${
        asset.customClass ? asset.customClass : ''
      }`}
      onMouseEnter={() => asset.title && setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => asset.project ? router.push(`/projects/${asset.project}`) : onClick()}
    >
      {asset.type === 'image' && (
        <Image
          src={asset.src}
          alt={asset.alt}
          fill={true}
          objectFit={contain ? 'contain' : 'cover'}
          className="object-cover w-full h-full"
        />
      )}
      {asset.type === 'video' && (
        <Video source={asset.src} />
      )}
      {hover && (
        <div className='absolute w-full h-full p-4 bg-black bg-opacity-80 flex justify-center items-center'>
          <h1 className="text-white text-2xl font-bold">{asset.title}</h1>
        </div>
      )}
    </div>
  );
});

Item.displayName = 'Item';

export default Gallery;