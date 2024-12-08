import React from 'react';

type Experience = {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
};

type ExperienceProps = {
  experiences: Experience[];
  onChange: (index: number, field: string, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
};

const Experience: React.FC<ExperienceProps> = ({ experiences, onChange, onAdd, onRemove }) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
      {experiences.map((exp, index) => (
        <div key={index} className="mb-4 p-4 border border-gray-200 rounded">
          <input
            type="text"
            placeholder="Company"
            value={exp.company}
            onChange={(e) => onChange(index, 'company', e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="text"
            placeholder="Position"
            value={exp.position}
            onChange={(e) => onChange(index, 'position', e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="date"
            placeholder="Start Date"
            value={exp.startDate}
            onChange={(e) => onChange(index, 'startDate', e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="date"
            placeholder="End Date"
            value={exp.endDate}
            onChange={(e) => onChange(index, 'endDate', e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            placeholder="Description"
            value={exp.description}
            onChange={(e) => onChange(index, 'description', e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <button onClick={() => onRemove(index)} className="text-red-500">Remove</button>
        </div>
      ))}
      <button onClick={onAdd} className="bg-[#816C61] text-white px-4 py-2 rounded">Add Experience</button>
    </>
  );
};

export default Experience;