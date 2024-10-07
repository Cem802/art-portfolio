'use client'
import projects from '@/data/projects';
import Gallery from '@/components/Gallery';
import { title } from 'process';

function randomIntFromInterval(min: number, max: number) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const ProjectPage = ({ params }: { params: { name: string } }) => {
  // Find the project data based on the dynamic route parameter
  const project = projects.find((proj) => proj.name === params.name);

  if (!project) {
    return <div>Loading...</div>;
  }

  // Ensure the grid has 12 columns per row with no gaps left
  let remainingCols = 12;

  const images = project.images.map((image: any, index: number) => {
    // Determine the column span for the current image
    let colSpan = randomIntFromInterval(2, 6)

    
    // If the current column span exceeds the remaining columns in the row,
    // adjust it to fit perfectly in the row
    if (colSpan > remainingCols) {
      colSpan = remainingCols;
    }

    // Save the current span and decrease the remaining columns
    remainingCols -= colSpan;

    // If we have filled the row, reset the remaining columns to 12
    if (remainingCols <= 0) {
      remainingCols = 12;
    }

    // Determine the row span for the current image
    const rowSpan = randomIntFromInterval(2, 2);

    return {
      src: image,
      alt: `${project.title} - Image ${index + 1}`,
      customClass: `col-span-${colSpan} row-span-${rowSpan}`,
    };
  });

  return (
    <div className="p-8">
      <div
          className="absolute top-0 left-0 w-screen h-screen bg-right bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${project.background})`,
          }}
      />
      <div className='h-screen flex flex-col justify-center items-center z-50'>
        <h1 className="text-4xl font-bold mb-4 z-50">{project.title}</h1>
        <p className="text-lg mb-8 z-50">{project.description}</p>
      </div>

      <Gallery images={images} />
    </div>
  );
};

export default ProjectPage;