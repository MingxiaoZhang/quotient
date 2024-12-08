'use client';

import { useState } from 'react';
import Image from 'next/image';
import BasicInfo from './components/BasicInfo';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';

type ProfileData = {
  basicInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
  };
  experiences: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string;
  }>;
  education: Array<{
    school: string;
    degree: string;
    fieldOfStudy: string;
    graduationDate: string;
  }>;
};

export default function ProfileCompletion() {
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState<ProfileData>({
    basicInfo: { fullName: '', email: '', phone: '', location: '' },
    experiences: [{ company: '', position: '', startDate: '', endDate: '', description: '' }],
    projects: [{ name: '', description: '', technologies: '' }],
    education: [{ school: '', degree: '', fieldOfStudy: '', graduationDate: '' }],
  });

  const handleBasicInfoChange = (field: string, value: string) => {
    setProfileData(prevData => ({
      ...prevData,
      basicInfo: { ...prevData.basicInfo, [field]: value },
    }));
  };

  const handleInputChange = (section: keyof Omit<ProfileData, 'basicInfo'>, index: number, field: string, value: string) => {
    setProfileData(prevData => ({
      ...prevData,
      [section]: prevData[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addItem = (section: keyof Omit<ProfileData, 'basicInfo'>) => {
    setProfileData(prevData => ({
      ...prevData,
      [section]: [...prevData[section], {} as any],
    }));
  };

  const removeItem = (section: keyof Omit<ProfileData, 'basicInfo'>, index: number) => {
    setProfileData(prevData => ({
      ...prevData,
      [section]: prevData[section].filter((_, i) => i !== index),
    }));
  };

  const renderProgressBar = () => {
    const steps = ['Basic Info', 'Experience', 'Projects', 'Education'];
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {steps.map((stepName, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step > index + 1 ? 'bg-[#816C61] text-white' : 
                step === index + 1 ? 'bg-[#575A4B] text-white' : 'bg-[#CFCFEA] text-[#575A4B]'
              }`}>
                {index + 1}
              </div>
              <span className="mt-2 text-sm text-[#575A4B]">{stepName}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 h-2 bg-[#CFCFEA] rounded-full">
          <div 
            className="h-full bg-[#816C61] rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const handleSubmit = () => {
    console.log(profileData);
    alert('Profile completed! Check console for data.');
  };

  return (
    <div className="min-h-screen bg-[#CFCFEA] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <Image
          className="mx-auto h-12 w-auto mb-6"
          src="/quotient-logo.svg"
          alt="Quotient"
          width={48}
          height={48}
        />
        <h1 className="text-3xl font-bold text-center text-[#2A2C24] mb-8">Complete Your Profile</h1>
        
        {renderProgressBar()}
        
        {step === 1 && <BasicInfo basicInfo={profileData.basicInfo} onChange={handleBasicInfoChange} />}
        {step === 2 && <Experience 
          experiences={profileData.experiences} 
          onChange={(index, field, value) => handleInputChange('experiences', index, field, value)}
          onAdd={() => addItem('experiences')}
          onRemove={(index) => removeItem('experiences', index)}
        />}
        {step === 3 && <Projects 
          projects={profileData.projects} 
          onChange={(index, field, value) => handleInputChange('projects', index, field, value)}
          onAdd={() => addItem('projects')}
          onRemove={(index) => removeItem('projects', index)}
        />}
        {step === 4 && <Education 
          education={profileData.education} 
          onChange={(index, field, value) => handleInputChange('education', index, field, value)}
          onAdd={() => addItem('education')}
          onRemove={(index) => removeItem('education', index)}
        />}
        
        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="bg-[#575A4B] text-white px-4 py-2 rounded">
              Previous
            </button>
          )}
          {step < 4 ? (
            <button onClick={() => setStep(step + 1)} className="bg-[#575A4B] text-white px-4 py-2 rounded">
              Next
            </button>
          ) : (
            <button onClick={handleSubmit} className="bg-[#575A4B] text-white px-4 py-2 rounded">
              Complete Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}