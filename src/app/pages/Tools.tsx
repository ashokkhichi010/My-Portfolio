// import { useEffect, useState } from 'react';
// import { motion } from 'motion/react';
// import { useTheme } from '../context/ThemeContext';
// import { SEO } from '../components/SEO';
// import { trackPageView } from '../utils/analytics';
// import toolsData from '../data/tools.json';
// import type { ToolsData } from '../types';

// const data: ToolsData = toolsData;

// export const Tools = () => {
//   const { setTheme } = useTheme();
//   const [selectedCategory, setSelectedCategory] = useState<string>('All');

//   useEffect(() => {
//     setTheme('tools');
//     trackPageView('Tools');
//   }, [setTheme]);

//   const categories = ['All', ...new Set(data.tools.map((t) => t.category))];

//   const filteredTools =
//     selectedCategory === 'All'
//       ? data.tools
//       : data.tools.filter((t) => t.category === selectedCategory);

//   return (
//     <>
//       <SEO
//         title="Tools & Technologies"
//         description="Tools and technologies I use for development and productivity"
//       />
//       <div className="min-h-screen py-24 px-4" style={{ background: 'var(--theme-background)' }}>
//         <div className="max-w-6xl mx-auto">
//           <motion.h1
//             className="text-5xl md:text-6xl font-bold mb-8 text-center"
//             style={{ color: 'var(--theme-text)' }}
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             {data.title}
//           </motion.h1>

//           {/* Category Filter */}
//           <motion.div
//             className="flex flex-wrap justify-center gap-3 mb-12"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//           >
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`px-6 py-2 rounded-full font-medium transition-all ${
//                   selectedCategory === category
//                     ? 'text-white'
//                     : 'bg-white/10 text-gray-300 hover:bg-white/20'
//                 }`}
//                 style={
//                   selectedCategory === category
//                     ? { background: 'var(--theme-gradient)' }
//                     : {}
//                 }
//               >
//                 {category}
//               </button>
//             ))}
//           </motion.div>

//           {/* Tools Grid */}
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredTools.map((tool, index) => (
//               <motion.div
//                 key={index}
//                 className="p-6 rounded-xl bg-white/5 backdrop-blur-sm"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.05 }}
//               >
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="text-xl font-bold" style={{ color: 'var(--theme-text)' }}>
//                     {tool.name}
//                   </h3>
//                   <span
//                     className="text-sm font-semibold px-3 py-1 rounded-full"
//                     style={{
//                       background: 'var(--theme-accent)',
//                       color: 'var(--theme-background)',
//                     }}
//                   >
//                     {tool.category}
//                   </span>
//                 </div>

//                 <div className="mb-2">
//                   <div className="flex justify-between mb-1 text-sm">
//                     <span className="text-gray-300">Proficiency</span>
//                     <span style={{ color: 'var(--theme-primary)' }}>
//                       {tool.proficiency}%
//                     </span>
//                   </div>
//                   <div className="h-2 bg-white/10 rounded-full overflow-hidden">
//                     <motion.div
//                       className="h-full rounded-full"
//                       style={{ background: 'var(--theme-gradient)' }}
//                       initial={{ width: 0 }}
//                       animate={{ width: `${tool.proficiency}%` }}
//                       transition={{ delay: index * 0.05 + 0.3, duration: 1 }}
//                     />
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
