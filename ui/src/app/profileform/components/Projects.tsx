import React from 'react';

type Project = {
  name: string;
  description: string;
  technologies: string;
};

type ProjectsProps = {
  projects: Project[];
  onChange: (index: number, field: string, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
};

const Projects: React.FC<ProjectsProps> = ({ projects, onChange, onAdd, onRemove }) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      {projects.map((project, index) => (
        <div key={index} className="mb-4 p-4 border border-gray-200 rounded">
          <input
            type="text"
            placeholder="Project Name"
            value={project.name}
            onChange={(e) => onChange(index, 'name', e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            placeholder="Description"
            value={project.description}
            onChange={(e) => onChange(index, 'description', e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="text"
            placeholder="Technologies Used"
            value={project.technologies}
            onChange={(e) => onChange(index, 'technologies', e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <button onClick={() => onRemove(index)} className="text-red-500">Remove</button>
        </div>
      ))}
      <button onClick={onAdd} className="bg-[#816C61] text-white px-4 py-2 rounded">Add Project</button>
    </>
  );
};

export default Projects;