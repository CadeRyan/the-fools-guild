export default function ContactPage() {
  return (
    <main className="max-w-7xl mx-auto pt-48 pb-12 px-8">
      <header className="text-center mb-12">
        {/* Updated h1 styling */}
        <h1 className="text-3xl md:text-5xl font-klein uppercase font-bold text-light-teal mb-4">Contact Us</h1>
        <h2 className="text-2xl font-thin" style={{ color: 'var(--secondary-contrast)' }}>
          We don&apos;t bite, promise!
        </h2>
      </header>
      <p className="text-xl leading-relaxed max-w-3xl mx-auto text-center mb-24" style={{ color: 'var(--secondary-contrast)' }}>
        Reach out to us for inquiries, collaborations, or just to say hello!
      </p>
      <div className="text-center">
        <h2>Contact Information</h2>
        <p style={{ color: 'var(--secondary-contrast)' }}>Name: Quinn Langton</p>
        <p style={{ color: 'var(--secondary-contrast)' }}>Email: thefoolsguildca@gmail.com</p>
      </div>
    </main>
  );
}
