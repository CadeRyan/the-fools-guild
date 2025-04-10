import DynamicShowList from './components/DynamicShowList'; // Import the new dynamic list
import EmailInput from './components/EmailInput';

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto py-16 px-8">
      {/* Hero Section */}
      <section className="text-center mb-16 mt-16 md:mt-32 lg:mt-48">
        {/* Replaced TypingHeadline with static Klein font heading */}
        <h1 className="text-5xl md:text-7xl font-klein uppercase font-bold text-light-teal mb-4">
          The Fool&apos;s Guild
        </h1>
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
        {/* Using Klein font, uppercase, light-teal text */}
        <h2 className="text-4xl font-klein uppercase font-bold text-light-teal mb-8 text-center">Upcoming Shows</h2>
        {/* Replaced ShowCards with DynamicShowList */}
        <DynamicShowList />
      </section>
    </main>
  );
}
