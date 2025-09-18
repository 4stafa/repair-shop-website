// src/pages/Home.tsx
import Layout from "../components/_Layout";

export default function Home() {
  return (
    <Layout>
      {/* HERO */}
      <section
        className="relative isolate min-h-[70vh] flex items-center"
        style={{
          backgroundImage: `url(/hero.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 text-white">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Discover the <span className="text-red-500">Best Repair Service</span>
          </h1>
          <p className="mt-4 max-w-2xl text-slate-200">
            We go beyond quick fixes—offering reliable, professional device repairs to
            get you back on track quickly and safely.
          </p>

          <p className="mt-4 text-sm font-medium tracking-wide">
            <span className="text-red-400">Fast.</span>{" "}
            <span className="text-red-400">Reliable.</span>{" "}
            <span className="text-red-400">Affordable.</span>
          </p>

          <a
            href="tel:+1-919-555-1111"
            className="mt-6 inline-flex rounded-lg bg-red-600 px-5 py-3 text-white shadow-sm hover:bg-red-700 transition"
          >
            Call Now
          </a>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-center text-2xl md:text-3xl font-semibold">
            Why Choose Our Repair Shop?
          </h2>
          <p className="mt-5 text-center text-slate-600">
            Experience peace of mind knowing your device is in safe hands. With
            our <span className="font-semibold">state-of-the-art equipment</span>,{" "}
            <span className="font-semibold">highly trained professionals</span>, and an unwavering
            commitment to <span className="font-semibold">customer satisfaction</span>, we make
            your day a little easier.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-center text-2xl md:text-3xl font-semibold">
            Our <span className="text-red-600">Services</span>
          </h2>
          <p className="mt-4 text-center text-slate-600 max-w-3xl mx-auto">
            We offer a range of services to meet your needs, ensuring reliability,
            affordability, and professionalism every step of the way.
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-lg">Screen & Hardware Repair</h3>
              <p className="mt-2 text-slate-600">
                Fast repairs for cracked screens, buttons, batteries, and more—
                with quality parts and careful workmanship.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-lg">Data Recovery & Diagnostics</h3>
              <p className="mt-2 text-slate-600">
                Thorough diagnostics and safe data recovery options to protect
                what matters most.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-lg">Water Damage Treatment</h3>
              <p className="mt-2 text-slate-600">
                Prompt corrosion control and component rescue to give your device
                the best chance at recovery.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-lg">Local Expertise</h3>
              <p className="mt-2 text-slate-600">
                As a local shop, we understand your needs and deliver quick,
                friendly service you can count on.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT PREVIEW */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Contact Us</h2>
            <p className="mt-4 text-slate-600">
              Whether you need quick diagnostics or a full repair, our team is here to
              help. Call us or send a message and we’ll get back to you fast.
            </p>

            <a
              href="tel:+1-919-555-1111"
              className="mt-6 inline-flex rounded-lg bg-red-600 px-5 py-3 text-white shadow-sm hover:bg-red-700 transition"
            >
              (919) 555-1111
            </a>
          </div>

          <form className="space-y-4">
            <input type="text" placeholder="Full Name" className="input w-full" />
            <input type="email" placeholder="Email" className="input w-full" />
            <textarea
              placeholder="Message"
              className="input w-full min-h-[120px]"
            />
            <button className="btn w-full bg-red-600 hover:bg-red-700 text-white">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10 grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="text-lg font-semibold">Repair Shop</div>
            <p className="mt-2 text-slate-600 text-sm">
              Reliable device repair and friendly local service.
            </p>
          </div>

          <div>
            <div className="font-semibold">Resources</div>
            <ul className="mt-2 space-y-2 text-sm text-slate-600">
              <li><a href="/" className="hover:text-slate-900">Home</a></li>
              <li><a href="/orders" className="hover:text-slate-900">Orders</a></li>
              <li><a href="tel:+1-919-555-1111" className="hover:text-slate-900">Call Us</a></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold">Legal</div>
            <ul className="mt-2 space-y-2 text-sm text-slate-600">
              <li><a href="#" className="hover:text-slate-900">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-slate-900">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t">
          <div className="mx-auto max-w-6xl px-6 py-6 text-xs text-slate-500">
            © {new Date().getFullYear()} Repair Shop. All rights reserved.
          </div>
        </div>
      </footer>
    </Layout>
  );
}