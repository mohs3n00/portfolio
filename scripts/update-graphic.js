const fs = require('fs');

let content = fs.readFileSync('e:/Portfolio/portfolio-site/components/GraphicProjects/GraphicProjects.tsx', 'utf8');

// 1. Add import
if (!content.includes('import FixedArtboard')) {
  content = content.replace(
    "import SocialGalleryCarousel from './SocialGalleryCarousel';", 
    "import SocialGalleryCarousel from './SocialGalleryCarousel';\nimport FixedArtboard from '../FixedArtboard/FixedArtboard';"
  );
}

// 2. Wrap graphic-typo-header
if (!content.includes('<FixedArtboard artboardWidth={1440}>\n      <div className="graphic-typo-header">')) {
  content = content.replace(
    '<div className="graphic-typo-header">',
    '<FixedArtboard artboardWidth={1440}>\n      <div className="graphic-typo-header">'
  );
  content = content.replace(
    '</motion.div>\n      </div>',
    '</motion.div>\n      </div>\n      </FixedArtboard>'
  );
}

// 3. Fix `.six-carousels-grid` mobile CSS
// Let's add a media query for mobile.
if (!content.includes('@media (max-width: 768px) {')) {
  content = content.replace(
    '.six-carousels-grid {',
    '.six-carousels-grid {\n            width: 100%;\n            max-width: 1800px;\n            margin: 0 auto;\n            display: grid;\n            grid-template-columns: repeat(3, 1fr);\n            gap: 16px;\n            padding: 0 16px;\n          }\n          @media (max-width: 768px) {\n            .six-carousels-grid {\n              grid-template-columns: 1fr;\n              width: 100%;\n            }\n          }\n          /* '
  );
  
  // also clean up the old one
  content = content.replace(
    `.floating-cloud {
            position: absolute;
            opacity: 0.6;
            pointer-events: none;
            width: 1368px;
            max-width: 1800px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }`,
    `.floating-cloud {
            position: absolute;
            opacity: 0.6;
            pointer-events: none;
          }`
  );
}

fs.writeFileSync('e:/Portfolio/portfolio-site/components/GraphicProjects/GraphicProjects.tsx', content, 'utf8');
