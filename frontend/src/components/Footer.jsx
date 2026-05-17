// import React from 'react';
// // import { Briefcase, Twitter, Linkedin} from 'lucide-react';

// const Footer = () => {
//   return (
//     <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
//           <div className="space-y-4">
//             <div className="flex items-center space-x-2 text-2xl font-bold text-primary-600">
//               <Briefcase className="w-8 h-8" />
//               <span>SmartIntern</span>
//             </div>
//             <p className="text-gray-500 text-sm leading-relaxed">
//               Empowering students to find the best internship opportunities and companies to find top talent.
//             </p>
//           </div>
          
//           <div>
//             <h4 className="font-bold text-gray-900 mb-4">Platform</h4>
//             <ul className="space-y-2 text-sm text-gray-500">
//               {/* <li><a href="#" className="hover:text-primary-600 transition-colors">Browse Internships</a></li>
//               <li><a href="#" className="hover:text-primary-600 transition-colors">Post an Opportunity</a></li>
//               <li><a href="#" className="hover:text-primary-600 transition-colors">Success Stories</a></li> */}
//             </ul>
//           </div>

//           <div>
//             <h4 className="font-bold text-gray-900 mb-4">Support</h4>
//             <ul className="space-y-2 text-sm text-gray-500">
//               <li><a href="#" className="hover:text-primary-600 transition-colors">Help Center</a></li>
//               <li><a href="#" className="hover:text-primary-600 transition-colors">Safety Center</a></li>
//               <li><a href="#" className="hover:text-primary-600 transition-colors">Community Guidelines</a></li>
//             </ul>
//           </div>

//           <div>
//             <h4 className="font-bold text-gray-900 mb-4">Follow Us</h4>
//             <div className="flex space-x-4">
//               <a href="#" className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-primary-600 transition-colors"><Twitter className="w-5 h-5" /></a>
//               <a href="#" className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-primary-600 transition-colors"><Linkedin className="w-5 h-5" /></a>
//             </div>
//           </div>
//         </div>
        
//         <div className="border-t border-gray-100 pt-8 text-center text-gray-500 text-sm">
//           <p>&copy; {new Date().getFullYear()} SmartIntern Finder. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-blue-600">
          SmartIntern
        </h2>

        <p className="text-gray-500 mt-3">
          Internship Finder Platform
        </p>

        <div className="border-t border-gray-200 mt-6 pt-4 text-sm text-gray-500">
          © {new Date().getFullYear()} SmartIntern Finder. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;