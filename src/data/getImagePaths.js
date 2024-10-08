// Script to automatically set image paths for projects
const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');
const { execSync } = require('child_process');

// Path to the directory containing project image folders
const imagesBasePath = path.join('public', 'assets');

// Path to the projects file
const projectsFilePath = path.join(__dirname, 'projects.ts');

// Load the projects data file
let projectsData = fs.readFileSync(projectsFilePath, 'utf-8');

// Parse the projects data to JavaScript object
let projects = eval(projectsData.replace('export default', ''));

// Update image and video paths for each project
projects = projects.map((project) => {
    const projectDir = path.join(imagesBasePath, project.name);

    if (fs.existsSync(projectDir)) {
        const mediaFiles = fs.readdirSync(projectDir)
            .filter(file => ['.jpg', '.jpeg', '.png', '.gif', '.mp4', '.mov'].includes(path.extname(file).toLowerCase()))
            .map(file => {
                const mediaPath = path.join(projectDir, file);
                const ext = path.extname(file).toLowerCase();
                let aspectRatio = null;
                let type = '';

                if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
                    const dimensions = sizeOf(mediaPath);
                    aspectRatio = dimensions.width / dimensions.height;
                    type = 'image';
                } else if (['.mp4', '.mov'].includes(ext)) {
                    // Use ffprobe to get video dimensions
                    try {
                        const output = execSync(`ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of default=noprint_wrappers=1 "${mediaPath}"`).toString();
                        const dimensions = output.trim().split('\n').reduce((acc, line) => {
                            const [key, value] = line.split('=');
                            acc[key] = parseInt(value, 10);
                            return acc;
                        }, {});
                        aspectRatio = dimensions.width / dimensions.height;
                        type = 'video';
                    } catch (error) {
                        console.error(`Error getting video dimensions for ${file}:`, error.message);
                    }
                }

                return {
                    src: `/assets/${project.name}/${file}`,
                    aspectRatio: aspectRatio,
                    type: type
                };
            });
        project.images = mediaFiles;

        // Set background image if not already set
        if (!project.background && mediaFiles.length > 0) {
            project.background = mediaFiles[0].src;
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

console.log('Project image and video paths have been updated successfully.');
