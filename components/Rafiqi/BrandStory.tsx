'use client';

import { motion } from 'framer-motion';
import ProtectedImage from '../ProtectedMedia/ProtectedImage';

export default function BrandStory() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <div className="container" style={{ padding: '15vh 4vw', display: 'flex', flexDirection: 'column', direction: 'rtl' }}>
      
      {/* Large logo independent element (using text placeholder but styled as a graphic) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1 }}
        style={{ marginBottom: '10vh', display: 'flex', justifyContent: 'flex-start' }}
      >
        <ProtectedImage useNative
          src="/images/projects/rafiqi/typografy.webp" 
          alt="Rafiqi Typography" 
          style={{ width: '100%', maxWidth: '500px', height: 'auto' }} 
        />
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4vw' }}
      >
        {/* Column 1 */}
        <motion.div variants={itemVariants}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#05FB8E', borderRadius: '50%' }}></div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>رؤية العلامة</h3>
          </div>
          <p style={{ fontSize: '1.2rem', lineHeight: 1.8, opacity: 0.8 }}>
            نسعى في رفيقي لتقديم نموذج مختلف يعتمد على البساطة والوضوح. علامتنا التجارية ليست مجرد شكل، بل هي انعكاس لقيم الثقة، السرعة، والاعتمادية التي يحتاجها المستخدم في حياته اليومية.
          </p>
        </motion.div>

        {/* Column 2 */}
        <motion.div variants={itemVariants}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#05FB8E', borderRadius: '50%' }}></div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>الشخصية والصوت</h3>
          </div>
          <p style={{ fontSize: '1.2rem', lineHeight: 1.8, opacity: 0.8 }}>
            نتحدث بلغة واضحة، مباشرة، وقريبة من القلب. رفيقي هو الصديق الذي يمكنك الاعتماد عليه، ولذلك حرصنا على أن تكون الهوية البصرية مرنة ومتطورة تعبر عن هذا القرب والود.
          </p>
        </motion.div>
      </motion.div>

    </div>
  );
}
