import React from 'react';

type BasicInfoProps = {
  basicInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
  };
  onChange: (field: string, value: string) => void;
};

const BasicInfo: React.FC<BasicInfoProps> = ({ basicInfo, onChange }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Basic Information</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={basicInfo.fullName}
        onChange={(e) => onChange('fullName', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={basicInfo.email}
        onChange={(e) => onChange('email', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="tel"
        placeholder="Phone"
        value={basicInfo.phone}
        onChange={(e) => onChange('phone', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="text"
        placeholder="Location"
        value={basicInfo.location}
        onChange={(e) => onChange('location', e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
    </div>
  );
};

export default BasicInfo;