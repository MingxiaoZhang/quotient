import React from 'react';

type Education = {
  school: string;
  degree: string;
  fieldOfStudy: string;
  graduationDate: string;
};

type EducationProps = {
  education: Education[];
  onChange: (index: number, field: string, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
};

const Education: React.FC<EducationProps> = ({ education, onChange, onAdd, onRemove }) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Education</h2>
      {education.map((edu, index) => (
        <div key={index} className="mb-4 p-4 border border-gray-200 rounded">
          <input
            type="text"
            placeholder="School"
            value={edu.school}
            onChange={(e) => onChange(index, 'school', e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="text"
            placeholder="Degree"
            value={edu.degree}
            onChange={(e) => onChange(index, 'degree', e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="text"
            placeholder="Field of Study"
            value={edu.fieldOfStudy}
            onChange={(e) => onChange(index, 'fieldOfStudy', e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="date"
            placeholder="Graduation Date"
            value={edu.graduationDate}
            onChange={(e) => onChange(index, 'graduationDate', e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <button onClick={() => onRemove(index)} className="text-red-500">Remove</button>
        </div>
      ))}
      <button onClick={onAdd} className="bg-[#816C61] text-white px-4 py-2 rounded">Add Education</button>
    </>
  );
};

export default Education;