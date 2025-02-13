import TypingHeadline from './components/TypingHeadline';
import ShowCards from './components/ShowCards';
import EmailInput from './components/EmailInput';

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto py-16 px-8">
      {/* Hero Section */}
      <section className="text-center mb-16 mt-16 md:mt-32 lg:mt-48">
        <TypingHeadline />
        <div className="flex justify-center">
        <h2
            className="text-2xl mb-8"
            style={{ color: 'var(--secondary-contrast)' }}
          >
            Fantasy Improv Troupe
          </h2>
        </div>
        <p
          className="text-xl leading-relaxed max-w-3xl mx-auto mb-16"
          style={{ color: 'var(--secondary-contrast)' }}
        >
          Based in Vancouver, The Fool&apos;s Guild brings the magic of fantasy improv to life on stage. Check out our upcoming shows and join us for a night of adventure and shenanigans
        </p>
      </section>

      <section className="mb-16">
        <div className="mx-auto w-full max-w-[400px]">
          <EmailInput />
        </div>
        <h2 className="text-4xl font-thin mb-8 text-center">Upcoming Shows</h2>
        <ShowCards
          shows={[
            {
              imageUrl: '/critsandbits.png',
              title: 'Crits and Bits',
              description: 'A Fantasy Themed Improv Show',
              linkUrl: 'https://www.showpass.com/crits-and-bits/',
              date: 'Feb 22, 2025',
            },
            // {
            //   imageUrl: '/temp_img.webp',
            //   title: 'Heros With No Plan',
            //   description: 'An improvised D&D live play experience',
            //   linkUrl: 'https://www.showpass.com/heroes-with-no-plan/',
            // },
            // {
            //   imageUrl: '/temp_img.webp',
            //   title: 'Show 3: The Grand Finale',
            //   description: 'A spectacular conclusion to our season.',
            //   linkUrl: 'https://www.showpass.com/',
            // },
          ]}
        />
      </section>
    </main>
  );
}
