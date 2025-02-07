import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto pt-48 pb-12 px-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-thin mb-4">About The Fool&apos;s Guild</h1>
        <h2 className="text-2xl font-thin" style={{color: "var(--secondary-contrast)"}}>
          We&apos;re just a bunch of fools
        </h2>
      </header>
      <p className="text-xl leading-relaxed max-w-3xl mx-auto text-center mb-24" style={{color: "var(--secondary-contrast)"}}>
        A bunch of nerds who love to play pretend and make people laugh. We&apos;re a fantasy improv troupe based in Vancouver, BC, and we&apos;re here to bring the magic of the fantasy genre to life on stage.
      </p>

      {/* Our Team */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 md:justify-items-center gap-8">
          <div className="text-center">
            <div className="relative h-48 w-48 mx-auto mb-4 rounded-full overflow-hidden motion-preset-rebound-up motion-delay-300">
              <Image
                src="/temp_img.webp"
                alt="Quinn Langton"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h3 className="text-2xl">Quinn Langton</h3>
            <p className="text-gray-700">Jester in Residence</p>
          </div>
          <div className="text-center">
            <div className="relative h-48 w-48 mx-auto mb-4 rounded-full overflow-hidden motion-preset-rebound-up motion-delay-400">
              <Image
                src="/temp_img.webp"
                alt="Cade Ryan"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h3 className="text-2xl">Cade Ryan</h3>
            <p className="text-gray-700">Court Fool</p>
          </div>
        </div>
      </section>
    </main>
  );
}
