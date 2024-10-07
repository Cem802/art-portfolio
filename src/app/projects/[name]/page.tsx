'use client'
import projects from '@/data/projects';
import Gallery from '@/components/Gallery';
import { title } from 'process';
import { useEffect, useRef } from 'react';

function randomIntFromInterval(min: number, max: number) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomEvenIntFromInterval(min: number, max: number) { // min and max included 
  // Adjust min and max to be even if they are not
  if (min % 2 !== 0) min++;
  if (max % 2 !== 0) max--;

  // Ensure there is at least one even number in the range
  if (min > max) {
    throw new Error("No even numbers in the given range.");
  }

  // Calculate the number of even numbers in the range
  const evenCount = ((max - min) / 2) + 1;

  // Select a random even number
  const randomEvenIndex = Math.floor(Math.random() * evenCount);

  return min + (randomEvenIndex * 2);
}

const ProjectPage = ({ params }: { params: { name: string } }) => {
  const project = projects.find((proj) => proj.name === params.name);

  if (!project) {
    return <div>Loading...</div>;
  }

  const parallaxRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.5}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  let remainingCols = 12;
  let remainingMobileCols = 8;
  const images = project.images.map((image: any, index: number) => {
    // Determine the column span for the current image
    let colSpan = randomEvenIntFromInterval(2, 6)
    let mobileColSpan = randomEvenIntFromInterval(2, 4)

    
    // If the current column span exceeds the remaining columns in the row,
    // adjust it to fit perfectly in the row
    if (colSpan > remainingCols) {
      colSpan = remainingCols;
    }
    if (mobileColSpan > remainingMobileCols) {
      mobileColSpan = remainingMobileCols;
    }

    // Save the current span and decrease the remaining columns
    remainingCols -= colSpan;
    remainingMobileCols -= mobileColSpan;

    // If we have filled the row, reset the remaining columns to 12
    if (remainingCols <= 0) {
      remainingCols = 12;
    }
    if (remainingMobileCols <= 0) {
      remainingMobileCols = 8;
    }

    // Determine the row span for the current image
    const rowSpan = Math.round(colSpan / image.aspectRatio / 2);
    const mobileRowSpan = Math.round(mobileColSpan / image.aspectRatio / 2);

    return {
      src: image.src,
      alt: `${project.title} - Image ${index + 1}`,
      customClass: `md:col-span-${colSpan} md:row-span-${rowSpan} col-span-${mobileColSpan} row-span-${mobileRowSpan}`,
    };
  });

  return (
    <div className="">
      <div
        className="relative overflow-hidden min-h-[90vh] mb-5"
      >
        <div
            className="absolute top-0 left-0 w-screen h-[90vh] bg-right bg-no-repeat bg-cover"
            ref={parallaxRef}
            style={{
              backgroundImage: `url(${project.background})`,
            }}
        />
        <div className='h-[90vh] flex flex-col justify-center items-center z-50'>
          <h1 className="text-4xl font-bold mb-4 z-50">{project.title}</h1>
          <p className="text-lg mb-8 z-50">{project.description}</p>
        </div>
      </div>

      <Gallery images={images} />
    </div>
  );
};

export default ProjectPage;