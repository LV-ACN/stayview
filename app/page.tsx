import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-brand-800 to-brand-950 text-white">
        <div className="container-page text-center">
          <h1 className="text-5xl md:text-6xl font-heading mb-6">
            Welcome to StayView
          </h1>
          <p className="text-xl md:text-2xl text-brand-100 mb-8 max-w-2xl mx-auto">
            Experience luxury redefined. Where every stay tells a story.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/rooms" className="btn-primary text-lg px-8 py-4">
              Explore Rooms
            </Link>
            <Link href="/booking" className="btn-secondary text-lg px-8 py-4 text-white border-white hover:bg-white/10">
              Book Now
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 container-page">
        <h2 className="text-3xl font-heading text-center mb-12">
          Why Choose StayView
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Prime Location", desc: "Steps from the waterfront, downtown, and cultural landmarks." },
            { title: "Award-Winning Service", desc: "Our concierge team anticipates your every need." },
            { title: "Curated Experiences", desc: "From rooftop dining to spa retreats, every moment is crafted." },
          ].map((feature) => (
            <div key={feature.title} className="text-center p-8">
              <h3 className="text-xl font-heading mb-3">{feature.title}</h3>
              <p className="text-neutral-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
