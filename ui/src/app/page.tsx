import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] bg-[#CFCFEA] text-[#2A2C24]">
      <header className="fixed top-0 left-0 right-0 flex justify-between items-center p-8">
        <Image
          src="/quotient-logo.svg"
          alt="Quotient logo"
          width={120}
          height={40}
          priority
        />
        <nav>
          <a href="#features" className="mr-4 hover:underline text-[#575A4B]">Features</a>
          <a href="#pricing" className="mr-4 hover:underline text-[#575A4B]">Pricing</a>
          <a href="/login" className="bg-[#816C61] text-white px-4 py-2 rounded hover:bg-[#A89B9D] transition-colors">Login</a>
        </nav>
      </header>

      <main className="flex flex-col items-center">
        <div className="h-screen flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-5xl font-bold mb-6 text-[#2A2C24]">Create Your Perfect Resume with Quotient</h1>
          <p className="text-2xl mb-10 text-[#575A4B]">Craft a professional resume in minutes with our AI-powered generator</p>
          <a
            href="/get-started"
            className="bg-[#575A4B] text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-[#816C61] transition-colors"
          >
            Get Started for Free
          </a>
        </div>

        <div className="w-full px-8 py-16 bg-white">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#2A2C24]">Our Features</h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="feature text-center">
              <Image src="/icon-ai.svg" alt="AI Icon" width={64} height={64} className="mx-auto" />
              <h3 className="text-2xl font-semibold mt-6 mb-3 text-[#575A4B]">AI-Powered</h3>
              <p className="text-[#816C61]">Our advanced AI tailors your resume to each job application</p>
            </div>
            <div className="feature text-center">
              <Image src="/icon-template.svg" alt="Template Icon" width={64} height={64} className="mx-auto" />
              <h3 className="text-2xl font-semibold mt-6 mb-3 text-[#575A4B]">Professional Templates</h3>
              <p className="text-[#816C61]">Choose from a variety of ATS-friendly resume templates</p>
            </div>
            <div className="feature text-center">
              <Image src="/icon-easy.svg" alt="Easy Icon" width={64} height={64} className="mx-auto" />
              <h3 className="text-2xl font-semibold mt-6 mb-3 text-[#575A4B]">Easy to Use</h3>
              <p className="text-[#816C61]">Create a standout resume in just a few clicks</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center text-sm text-[#575A4B] py-8">
        <p>&copy; 2023 Quotient. All rights reserved.</p>
      </footer>
    </div>
  );
}
