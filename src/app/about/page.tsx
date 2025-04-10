import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto pt-48 pb-12 px-8">
      <header className="text-center mb-12">
        {/* Updated h1 styling to match /shows page */}
        <h1 className="text-3xl md:text-5xl font-klein uppercase font-bold text-light-teal mb-4">About The Fool's Guild</h1>
        <h2 className="text-2xl font-thin" style={{color: "var(--secondary-contrast)"}}>
          We're just a bunch of fools
        </h2>
      </header>
      <p className="text-xl leading-relaxed max-w-3xl mx-auto text-center mb-24" style={{color: "var(--secondary-contrast)"}}>
        A bunch of nerds who love to play pretend and make people laugh. We&apos;re a fantasy improv troupe based in Vancouver, BC, and we&apos;re here to bring the magic of the fantasy genre to life on stage.
      </p>

      {/* Our Team */}
      <section className="mb-16">
        <div className="grid grid-cols-1 pb-4 md:grid-cols-5 md:justify-items-center gap-8">
          {[
            {
              name: 'Quinn Langton',
              role: 'Jester in Residence',
              image: '/quinn.jpeg',
              delay: '300'
            },
            { 
              name: 'Ivy Padmos',
              role: 'Distressing Damsel',
              image: '/ivy.jpeg',
              delay: '300'
            },
            { 
              name: 'Cade Ryan',
              role: 'Court Fool',
              image: '/cade.png',
              delay: '400'
            },
            {
              name: 'Lyndon Duncan',
              role: 'Resident Rogue',
              image: '/lyndon.jpeg',
              delay: '500' // Added Lyndon
            },
            // Add more people here as needed
          ].map((person, index) => {
            const completePairs = Math.floor(index / 5);
            const remainder = index % 5;
            const row = remainder < 3 ? 2 * completePairs : 2 * completePairs + 1;
            const isOddRow = row % 2 === 0;
            
            // Calculate position within row type (0-2 for odd rows, 0-1 for even rows)
            const positionInRow = isOddRow ? remainder : remainder - 3;
            
            // Map positions to specific grid columns (0-4 in 5-column grid)
            const gridColumn = isOddRow 
              ? positionInRow * 2  // Odd rows: 0,2,4 
              : positionInRow * 2 + 1; // Even rows: 1,3
            
            let colSpan = 'md:col-span-1';
            let visibleOnMd = 'md:block';
            let colStart = '';

            if (isOddRow) {
              // Odd rows: show cols 0,2,4 (first three items)
              visibleOnMd = [0,2,4].includes(gridColumn) ? 'md:block' : 'hidden';
              if (gridColumn === 0) {
                colStart = 'md:col-start-1';
              } else if (gridColumn === 2) {
                colStart = 'md:col-start-3';
              } else if (gridColumn === 4) {
                colStart = 'md:col-start-5';
              }
            } else {
              // Even rows: show cols 1,3 (next two items)
              visibleOnMd = [1,3].includes(gridColumn) ? 'md:block' : 'hidden';
              if (gridColumn === 1) {
                colStart = 'md:col-start-2';
              } else if (gridColumn === 3) {
                colStart = 'md:col-start-4';
              }
            }

            return (
              <div
                key={person.name}
                className={`${visibleOnMd} text-center ${colStart}`}
              >
                {/* Updated Image component usage */}
                <div className={`relative h-48 w-48 mx-auto mb-4 rounded-full overflow-hidden motion-preset-rebound-up motion-delay-${person.delay}`}>
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill // Use fill prop
                    style={{ objectFit: 'cover' }} // Use style for object-fit
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Add sizes prop for optimization
                  />
                </div>
                {/* Using Klein font for name, light-teal for role */}
                <h3 className="text-2xl font-klein">{person.name}</h3>
                <p className="text-light-teal/80">{person.role}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
