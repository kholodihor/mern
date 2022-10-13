import Intro from '../src/components/Intro/Intro';
import Partners from '../src/components/Partners/Partners';
import Services from '../src/components/OurServices/Services';
import WhatWeDo from '../src/components/WhatWeDo/WhatWeDo';
import WhereAreWe from '../src/components/WhereAreWe/WhereAreWe';
import WhoWeAre from '../src/components/WhoWeAre/WhoWeAre';

export default function Home() {
  return (
    <main>
      <Intro />
      <WhoWeAre />
      <WhatWeDo />
      <Services />
      <Partners />
      <WhereAreWe />
    </main>
  );
}
