import Image from 'next/image';

const Gallery = ({ images }: {images: any}) => {
  return (
    <div className="grid gap-4 md:grid-cols-12 grid-cols-8 auto-rows-[100px] md:auto-rows-[150px]">
      {images.map((image: any, index: number) => (
        <div
          key={index}
          className={`relative overflow-hidden ${
            image.customClass ? image.customClass : ''
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            layout="fill"
            objectFit="cover"
            className="object-cover w-full h-full animate-fadeIn"
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
