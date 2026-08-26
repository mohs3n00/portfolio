const fs = require('fs');

// 1. Update RafiqiCaseStudy.tsx
let raf = fs.readFileSync('e:/Portfolio/portfolio-site/components/Rafiqi/RafiqiCaseStudy.tsx', 'utf8');
raf = raf.replace(
  'import BrandApplication from \'./BrandApplication\';',
  'import BrandApplication from \'./BrandApplication\';\nimport FixedArtboard from \'../FixedArtboard/FixedArtboard\';'
);

const wrap = (comp) => {
  raf = raf.replace('<' + comp + ' />', '<FixedArtboard artboardWidth={1400}><' + comp + ' /></FixedArtboard>');
}

wrap('TypographyIntro');
wrap('WebHero');
wrap('ColorSystem');
wrap('BrandStory');
wrap('LogoSystem');

fs.writeFileSync('e:/Portfolio/portfolio-site/components/Rafiqi/RafiqiCaseStudy.tsx', raf, 'utf8');
console.log('Done RafiqiCaseStudy.tsx');

// 2. Replace 100vh with 900px in the wrapped files
const filesToFix = ['TypographyIntro.tsx', 'WebHero.tsx', 'ColorSystem.tsx', 'BrandStory.tsx', 'LogoSystem.tsx'];
filesToFix.forEach(f => {
  const p = 'e:/Portfolio/portfolio-site/components/Rafiqi/' + f;
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/minHeight:\s*'100vh'/g, "minHeight: '900px'");
  c = c.replace(/height:\s*'100vh'/g, "height: '900px'");
  fs.writeFileSync(p, c, 'utf8');
});
console.log('Done vh replacements');
