'use client'
import projects from '@/data/projects';
import Gallery from '@/components/Gallery';

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
    let colSpan = Math.floor(Math.random() * 4) + 2; // Random col-span between 2 and 5
    
    // If the current column span exceeds the remaining columns in the row,
    // adjust it to fit perfectly in the row
    if (colSpan > remainingCols) {
      colSpan = remainingCols;
    }

    // Save the current span and decrease the remaining columns
    const currentSpan = colSpan;
    remainingCols -= colSpan;

    // If we have filled the row, reset the remaining columns to 12
    if (remainingCols <= 0) {
      remainingCols = 12;
    }

    // Determine the row span for the current image
    const rowSpan = Math.floor(Math.random() * 2) + 2; // Random row-span between 1 and 2

    return {
      src: image,
      alt: `${project.title} - Image ${index + 1}`,
      customClass: `md:col-span-${currentSpan} col-span-${currentSpan} row-span-${rowSpan}`,
    };
  });

  return (
    <div className="p-8">
      <div className='h-screen flex flex-col justify-center items-center'>
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
        <p className="text-lg mb-8">{project.description}</p>
      </div>

      <Gallery images={images} />
    </div>
  );
};

export default ProjectPage;