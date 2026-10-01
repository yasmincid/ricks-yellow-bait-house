"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
const directionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=35412+S+Dixie+Hwy+Homestead+FL+33034";
const facebookUrl =
  "https://www.facebook.com/profile.php?id=61576360974298";
export default function Home() {
  const [language, setLanguage] = useState<"en" | "es">("en");
  const t = (en: string, es: string) => language === "en" ? en : es;

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <main id="top" lang={language} className="min-h-screen bg-[#fffdf5] font-sans text-[#102d40]">
      {/* Top bar */}
      <div className="bg-[#102d40] px-5 py-3 text-center text-sm text-white">
        {t("Homestead, Florida · Your next fishing trip starts here", "Homestead, Florida · Tu próxima salida de pesca empieza aquí")}
      </div>
      {/* Navigation */}
      <header className="border-b border-[#102d40]/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-6 py-6">
          <a href="#top" aria-label={t("Rick’s Yellow Bait House — Home", "Rick’s Yellow Bait House — Inicio")}>
            <Image
              src="/ricks-logo.svg"
              alt="Rick’s Yellow Bait House"
              width={220}
              height={120}
              priority
              className="h-auto w-[170px] rounded-lg sm:w-[220px]"
            />
          </a>
          <nav
            aria-label={t("Main navigation", "Navegación principal")}
            className="flex flex-wrap items-center gap-5 text-sm font-semibold"
          >
            <a href="#products" className="hover:underline">
              {t("Fishing essentials", "Artículos de pesca")}
            </a>
            <a href="#bait" className="hover:underline">
              {t("Bait", "Carnadas")}
            </a>
            <a href="#hours" className="hover:underline">
              {t("Hours", "Horario")}
            </a>
            <a href="#story" className="hover:underline">
              {t("Our story", "Nuestra historia")}
            </a>
            <a
              href="#visit"
              className="rounded-full bg-[#f5ce38] px-5 py-3 transition hover:bg-[#e9bd20]"
            >
              {t("Visit the store", "Visítanos")}
            </a>
            <div
              role="group"
              aria-label={t("Choose language", "Seleccionar idioma")}
              className="flex rounded-full border border-[#102d40]/20 p-1"
            >
              {(["en", "es"] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLanguage(code)}
                  aria-pressed={language === code}
                  aria-label={code === "en" ? "English" : "Español"}
                  className={`min-h-10 min-w-11 rounded-full px-3 font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#102d40] ${
                    language === code
                      ? "bg-[#102d40] text-white"
                      : "text-[#102d40] hover:bg-[#102d40]/10"
                  }`}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#102d40] text-white">
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 h-96 w-96 rounded-full border-[60px] border-white/5"
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:py-28">
          <div>
            <p className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-[#f5ce38]">
              {t("Local roots. A love for fishing.", "Raíces locales. Pasión por la pesca.")}
            </p>
            <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              {t("Good days on the water start", "Un gran día de pesca comienza")}{" "}
              <span className="text-[#f5ce38]">{t("at Rick’s.", "en Rick’s.")}</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/80">
              {t("Bait, tackle, and fishing essentials in Homestead, Florida. Stop by before your next trip and discover a local store with more than 30 years of history.", "Carnada y artículos de pesca en Homestead, Florida. Visítanos antes de tu próxima salida y descubre una tienda local con más de 30 años de historia.")}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#f5ce38] px-7 py-4 font-bold text-[#102d40] transition hover:bg-[#ffe16a]"
              >
                {t("Get directions ↗", "Cómo llegar ↗")}
              </a>
              <a
                href="tel:+13052455550"
                className="rounded-full border border-white/40 px-7 py-4 font-bold transition hover:bg-white/10"
              >
                {t("Call the store", "Llamar a la tienda")}
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/5">
            <Image
              src="/images/storefront.jpeg"
              alt={t("Yellow storefront and blue railings at Rick’s Yellow Bait House", "Fachada amarilla y barandas azules de Rick’s Yellow Bait House")}
              width={1536}
              height={1152}
              priority
              sizes="(max-width: 1023px) 100vw, 45vw"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="px-6 py-5">
              <p className="text-lg font-bold text-[#f5ce38]">
                {t("Your local bait & tackle stop", "Tu tienda local de carnada y pesca")}
              </p>
              <p className="mt-2 text-sm text-white/75">
                35412 S Dixie Hwy · Homestead, Florida
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Brands */}
      <section id="brands" className="border-b border-[#102d40]/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#60706e]">
            {t("Brands we work with", "Marcas con las que trabajamos")}
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">
            {t("Direct contact with leading fishing brands.", "Contacto directo con grandes marcas de pesca.")}
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-[#536570]">
            {t("We maintain direct contact with PENN, Daiwa, Shimano, Okuma, and Quantum. Call or visit us to ask about products and current availability.", "Mantenemos contacto directo con PENN, Daiwa, Shimano, Okuma y Quantum. Llámanos o visítanos para consultar productos y disponibilidad.")}
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {["PENN", "DAIWA", "SHIMANO", "OKUMA", "QUANTUM"].map((brand) => (
              <li key={brand} className="flex min-h-20 items-center justify-center rounded-2xl border border-[#102d40]/10 bg-[#fffdf5] px-4 text-xl font-black tracking-wider">
                {brand}
              </li>
            ))}
          </ul>
        </div>
      </section>
      {/* Categories */}
      <section id="products" className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#60706e]">
          {t("Inside Rick’s", "Dentro de Rick’s")}
        </p>
        <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
          {t("Gear up for your next cast.", "Prepárate para tu próxima pesca.")}
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[#536570]">
          {t("Take a look inside our store. Browse fishing gear and accessories, and call us for current bait and product availability.", "Conoce nuestra tienda y descubre equipos y accesorios de pesca. Llámanos para consultar la disponibilidad de carnada y productos.")}
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              image: "/images/rods-reels.jpeg",
              alt: t("Fishing rods and reels on display inside Rick’s", "Cañas y carretes en exhibición dentro de Rick’s"),
              title: t("Rods & reels", "Cañas y carretes"),
              description:
                t("Explore our selection of fishing rods and reels for your next trip.", "Explora nuestra selección de cañas y carretes para tu próxima salida."),
            },
            {
              image: "/images/fishing-accessories.jpeg",
              alt: t("Fishing accessories displayed on the store wall", "Accesorios de pesca exhibidos en la pared de la tienda"),
              title: t("Tackle & accessories", "Artículos y accesorios"),
              description:
                t("Find fishing tackle and practical accessories to complete your setup.", "Encuentra artículos y accesorios de pesca para completar tu equipo."),
            },
            {
              image: "/images/nets-equipment.jpeg",
              alt: t("Fishing nets and equipment displayed inside Rick’s", "Redes y equipos de pesca en exhibición dentro de Rick’s"),
              title: t("Nets & equipment", "Redes y equipos"),
              description:
                t("Browse fishing nets and equipment to prepare for your day on the water.", "Descubre redes y equipos para prepararte para tu día de pesca."),
            },
          ].map((category) => (
            <article
              key={category.image}
              className="overflow-hidden rounded-3xl border border-[#102d40]/10 bg-white"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={category.image}
                  alt={category.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-7">
                <h3 className="text-2xl font-bold">{category.title}</h3>
                <p className="mt-4 leading-7 text-[#536570]">
                  {category.description}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-[#eaf0ec] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold">{t("Looking for bait?", "¿Buscas carnada?")}</h3>
            <p className="mt-1 text-[#536570]">
              {t("Call the store to check available options before your trip.", "Llámanos para consultar las opciones disponibles antes de tu salida.")}
            </p>
          </div>
          <a
            href="tel:+13052455550"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#102d40] px-6 py-3 font-bold text-white transition hover:bg-[#20465d]"
          >
            {t("Call (305) 245-5550", "Llamar al (305) 245-5550")}
          </a>
        </div>
      </section>
      {/* Bait selection */}
      <section id="bait" className="bg-[#102d40] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f5ce38]">
            {t("Our bait selection", "Nuestra selección de carnadas")}
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            {t("Your next catch starts here.", "Tu próxima captura comienza aquí.")}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
            {t("Explore our live, fresh, and frozen bait, plus chum. Call the store for current availability, sizes, and pricing.", "Descubre nuestras carnadas vivas, frescas y congeladas, además de engodo. Llámanos para consultar disponibilidad, presentaciones y precios.")}
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {[
            {
              id: "live",
              title: t("Live bait", "Carnada viva"),
              description: t("Available in store for your next trip.", "Consulta las opciones disponibles para tu próxima salida."),
              items: [t("Shrimp", "Camarón"), t("Pinfish", "Pinfish"), t("Mullet", "Lisa (mullet)"), t("Blue crab", "Cangrejo azul")],
            },
            {
              id: "fresh",
              title: t("Fresh bait", "Carnada fresca"),
              description: t("Ask about today’s fresh bait selection.", "Pregunta por la selección de carnada fresca del día."),
              items: [t("Ballyhoo", "Ballyhoo"), t("Sardines", "Sardinas"), t("Thread herring", "Thread herring"), t("Mullet", "Lisa (mullet)")],
            },
            {
              id: "frozen",
              title: t("Frozen bait", "Carnada congelada"),
              description: t("A variety of options and package sizes.", "Variedad de opciones y tamaños de paquetes."),
              items: [t("Silversides", "Silversides"), t("Shrimp", "Camarón"), t("Squid", "Calamar"), t("Thread herring", "Thread herring"), t("Spanish sardines", "Sardina española"), t("Ballyhoo — packs, chunks, mono & wire rigged", "Ballyhoo — paquetes, trozos y montajes con monofilamento o alambre"), t("Pilchards", "Pilchards"), t("Finger mullet", "Lisa pequeña (finger mullet)"), t("Mullet", "Lisa (mullet)"), t("Glass minnows", "Glass minnows"), t("Goggle eyes", "Goggle eyes"), t("Flying fish", "Pez volador (flying fish)"), t("Horse mackerel", "Horse mackerel")],
            },
            {
              id: "chum",
              title: t("Chum", "Engodo (chum)"),
              description: t("Ask about available brands and block sizes.", "Consulta las marcas y los tamaños de bloques disponibles."),
              items: [t("Tournament Master", "Tournament Master"), t("Tournament Master Blue Label", "Tournament Master Blue Label"), t("Menhaden chum", "Menhaden chum"), t("Killer Bait", "Killer Bait"), t("KLF Power Chum", "KLF Power Chum")],
            }
            ].map((group) => (
              <article key={group.id} className="rounded-3xl border border-white/15 bg-white/5 p-7 sm:p-8">
                <h3 className="text-2xl font-bold text-[#f5ce38]">{group.title}</h3>
                <p className="mt-3 leading-7 text-white/70">{group.description}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#f5ce38]" />
                      <span className="leading-6">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <p className="max-w-xl leading-7 text-white/75">
              {t("Bait availability varies. Give us a call before heading over for a specific item.", "La disponibilidad de carnada puede variar. Llámanos antes de venir si buscas un producto específico.")}
            </p>
            <a href="tel:+13052455550" className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#f5ce38] px-7 py-4 font-bold text-[#102d40] transition hover:bg-[#ffe16a]">
              {t("Ask about bait availability", "Consultar disponibilidad")}
            </a>
          </div>
        </div>
      </section>

      {/* History */}
      <section id="story" className="bg-[#eaf0ec]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#536570]">
              {t("Our story", "Nuestra historia")}
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
              {t("A local fishing tradition.", "Una tradición local de pesca.")}
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-[#536570]">
            <p>
              {t("For more than 30 years, this location has been part of the local fishing community, welcoming anglers preparing for their next trip.", "Desde hace más de 30 años, este lugar forma parte de la comunidad pesquera local y recibe a pescadores que se preparan para su próxima salida.")}
            </p>
            <p>
              {t("Many of our customers have been coming here for years. Rick’s Yellow Bait House continues that tradition, bringing fishing essentials and familiar faces together in Homestead.", "Muchos de nuestros clientes llevan años visitándonos. Rick’s Yellow Bait House mantiene esa tradición, reuniendo artículos de pesca y rostros conocidos en Homestead.")}
            </p>
          </div>
        </div>
      </section>
      {/* Visit */}
      {/* Store hours */}
      <section id="hours" className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 rounded-3xl bg-[#102d40] p-8 text-white sm:p-12 md:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f5ce38]">
              {t("Store hours", "Horario de atención")}
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight">
              {t("Early starts.", "Desde temprano.")}
              <br />
              {t("Late-night fishing.", "Para tus noches de pesca.")}
            </h2>
            <p className="mt-5 max-w-md leading-7 text-white/75">
              {t("Stop by before your next trip. Open 24 hours on Fridays and Saturdays.", "Visítanos antes de tu próxima salida. Abierto las 24 horas los viernes y sábados.")}
            </p>
          </div>
          <div className="self-center">
            <dl className="divide-y divide-white/15">
              {[
                { day: t("Monday", "Lunes"), hours: t("4:00 AM – 11:00 PM", "4:00 a. m. – 11:00 p. m.") },
                { day: t("Tuesday", "Martes"), hours: t("4:00 AM – 11:00 PM", "4:00 a. m. – 11:00 p. m.") },
                { day: t("Wednesday", "Miércoles"), hours: t("4:00 AM – 11:00 PM", "4:00 a. m. – 11:00 p. m.") },
                { day: t("Thursday", "Jueves"), hours: t("4:00 AM – 11:00 PM", "4:00 a. m. – 11:00 p. m.") },
                { day: t("Friday", "Viernes"), hours: t("Open 24 hours", "Abierto las 24 horas") },
                { day: t("Saturday", "Sábado"), hours: t("Open 24 hours", "Abierto las 24 horas") },
                { day: t("Sunday", "Domingo"), hours: t("4:00 AM – 11:00 PM", "4:00 a. m. – 11:00 p. m.") },
              ].map(({ day, hours }) => (
                <div
                  key={day}
                  className="flex flex-wrap justify-between gap-3 py-4"
                >
                  <dt className="font-semibold">{day}</dt>
                  <dd
                    className={
                      hours === t("Open 24 hours", "Abierto las 24 horas")
                        ? "font-bold text-[#f5ce38]"
                        : "text-white/80"
                    }
                  >
                    {hours}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
      <section id="visit" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 rounded-[2rem] bg-[#f5ce38] p-8 sm:p-12 md:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em]">
              {t("Come see us", "Ven a visitarnos")}
            </p>
            <h2 className="mt-4 text-4xl font-black sm:text-5xl">
              {t("See you at Rick’s.", "Nos vemos en Rick’s.")}
            </h2>
            <p className="mt-5 text-lg leading-8">
              {t("Stop by for your fishing essentials.", "Visítanos para encontrar tus artículos de pesca.")}
              <br />
              {t("Have a question? Give us a call.", "¿Tienes alguna pregunta? Llámanos.")}
            </p>
          </div>
          <div className="flex flex-col items-start justify-center gap-5">
            <address className="text-xl font-semibold not-italic leading-8">
              35412 S Dixie Hwy
              <br />
              Homestead, FL 33034
            </address>
            <a href="tel:+13052455550" className="text-2xl font-bold">
              (305) 245-5550
            </a>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#102d40] px-7 py-4 font-bold text-white transition hover:bg-[#20465d]"
            >
              {t("Get directions ↗", "Cómo llegar ↗")}
            </a>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-[#102d40] px-6 py-9 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="font-bold">Rick’s Yellow Bait House</p>
            <p className="mt-2 text-sm text-white/65">
              {t("Bait & fishing supplies · Homestead, Florida", "Carnada y artículos de pesca · Homestead, Florida")}
            </p>
          </div>
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-4"
          >
            {t("Follow us on Facebook ↗", "Síguenos en Facebook ↗")}
          </a>
        </div>
      </footer>
    </main>
  );
}