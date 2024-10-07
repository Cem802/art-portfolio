// Script to automatically set image paths for projects
const fs = require('fs');
const path = require('path');

// Path to the directory containing project image folders
const imagesBasePath = path.join('public', 'images');

// Path to the projects file
const projectsFilePath = path.join(__dirname, 'projects.ts');

// Load the projects data file
let projectsData = fs.readFileSync(projectsFilePath, 'utf-8');

// Parse the projects data to JavaScript object
let projects = eval(projectsData.replace('export default', ''));

// Update image paths for each project
projects = projects.map((project) => {
    const projectDir = path.join(imagesBasePath, project.name);

    if (fs.existsSync(projectDir)) {
        const imageFiles = fs.readdirSync(projectDir)
            .filter(file => ['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(file).toLowerCase()))
            .map(file => `/images/${project.name}/${file}`);
        project.images = imageFiles;

        // Set background image if not already set
        if (!project.background && imageFiles.length > 0) {
            project.background = imageFiles[0];
        }
    } else {
        console.warn(`Directory for project ${project.name} not found at ${projectDir}`);
    }

    return project;
});

// Convert projects object back to JavaScript code
const updatedProjectsData = `// /data/projects.js\nconst projects = ${JSON.stringify(projects, null, 4)};\n\nexport default projects;`;

// Write the updated data back to the projects file
fs.writeFileSync(projectsFilePath, updatedProjectsData, 'utf-8');

console.log('Project image paths have been updated successfully.');