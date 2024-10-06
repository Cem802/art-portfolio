'use client'
import Image from 'next/image';
import { useState, useEffect, useRef, ForwardedRef, forwardRef, MutableRefObject } from 'react';

const Gallery = ({ images }: { images: any }) => {
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
            target.classList.remove('animate-fadeIn');
            target.style.opacity = '0';
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

  return (
    <div className="grid gap-4 md:grid-cols-12 grid-cols-8 auto-rows-[100px] md:auto-rows-[150px]">
      {images.map((image: any, index: number) => (
        <Item key={index} image={image} ref={(el) => {
          galleryRefs.current[index] = el;
        }} />
      ))}
    </div>
  );
};

const Item = forwardRef<HTMLDivElement, { image: any }>(({ image }, ref) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden cursor-pointer opacity-0 ${
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
        className="object-cover w-full h-full"
      />
      {hover && (
        <div className='absolute w-full h-full p-4 bg-black bg-opacity-80'>
          <h1 className="text-white text-2xl font-bold">Title</h1>
          <p className="text-white">Description</p>
        </div>
      )}
    </div>
  );
});

Item.displayName = 'Item';

export default Gallery;