const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="prose prose-lg mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">About Museum in Your Classroom</h2>
          <p className="text-xl text-gray-600 mb-6">
            Museum in your Classroom is an online teaching resource designed to bring the museum experience into the classroom. Using original objects and photographs, and backed up by thorough research, each session equips teachers to develop their students' historical enquiry and critical thinking skills.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">About this Project</h2>
          <p className="text-gray-600 mb-6">
            This project was created as part of the MA in Public History at Royal Holloway, University of London. It aims to be an easy-to-use resource for primary school teachers, equipping non-specialists with everything they need to deliver engaging, content rich history lessons.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">About the Objects</h2>
          <p className="text-gray-600 mb-6">
            Most of the objects in the investigation videos belong to the Learning and Engagement team at the Imperial War Museum, and have been filmed with their permission. All image attributions, where required, are included alongside the relevant material.
          </p>
          
          <p className="text-gray-600 mb-4">
            Have questions or suggestions? Get in touch at <a href="mailto:museuminyourclassroom@gmail.com" className="text-blue-600 hover:text-blue-800 underline font-medium">museuminyourclassroom@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
