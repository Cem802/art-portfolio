'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef, ForwardedRef, forwardRef, MutableRefObject } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Gallery = ({ images, contain }: { images: any, contain?: boolean }) => {
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
    if (zoomedImageIndex !== null && zoomedImageIndex < images.length - 1) {
      setZoomedImageIndex(zoomedImageIndex + 1);
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-12 grid-cols-8 auto-rows-[100px] md:auto-rows-[150px]">
      {images.map((image: any, index: number) => (
        <Item key={index} image={image} contain={contain} onClick={() => openZoomedImage(index)} ref={(el) => {
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
            <Image src={images[zoomedImageIndex].src} alt="zoomed-image" fill={true} objectFit="contain" className='' />
          </div>
        </div>
      )}
    </div>
  );
};

const Item = forwardRef<HTMLDivElement, { image: any; contain: boolean | undefined; onClick: () => void }>(({ image, contain, onClick }, ref) => {
  const [hover, setHover] = useState(false);
  const router = useRouter();

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden cursor-pointer opacity-0 ${
        image.customClass ? image.customClass : ''
      }`}
      onMouseEnter={() => image.title && setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => image.project ? router.push(`/projects/${image.project}`) : onClick()}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill={true}
        objectFit={contain ? 'contain' : 'cover'}
        className="object-cover w-full h-full"
      />
      {hover && (
        <div className='absolute w-full h-full p-4 bg-black bg-opacity-80 flex justify-center items-center'>
          <h1 className="text-white text-2xl font-bold">{image.title}</h1>
        </div>
      )}
    </div>
  );
});

Item.displayName = 'Item';

export default Gallery;