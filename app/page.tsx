"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
const directionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=35412+S+Dixie+Hwy+Homestead+FL+33034";
const facebookUrl =
  "https://www.facebook.com/profile.php?id=61576360974298";
export default function Home() {
  const [language, setLanguage] = useState<"en" | "es">("en");
  const [baitFilter, setBaitFilter] = useState("all");
  const [photoIndex, setPhotoIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = (en: string, es: string) => language === "en" ? en : es;

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const gallery = [
    { src: "/images/storefront.jpeg", title: t("The yellow house", "La casa amarilla"), alt: t("Rick’s Yellow Bait House storefront", "Fachada de Rick’s Yellow Bait House") },
    { src: "/images/rods-reels.jpeg", title: t("Ready for your next cast", "Listos para tu próxima pesca"), alt: t("Rods and reels inside Rick’s", "Cañas y carretes dentro de Rick’s") },
    { src: "/images/fishing-accessories.jpeg", title: t("The details make the difference", "Los detalles marcan la diferencia"), alt: t("Fishing accessories inside Rick’s", "Accesorios de pesca dentro de Rick’s") },
    { src: "/images/nets-equipment.jpeg", title: t("Explore the store", "Descubre la tienda"), alt: t("Nets and fishing equipment", "Redes y equipos de pesca") },
  ];
  const activePhoto = gallery[photoIndex];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const elements = document.querySelectorAll<HTMLElement>(".ricks-site [data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.removeAttribute("data-pending");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    elements.forEach((element) => {
      if (element.getBoundingClientRect().top > window.innerHeight) element.setAttribute("data-pending", "true");
      observer.observe(element);
    });
    return () => { observer.disconnect(); elements.forEach((element) => element.removeAttribute("data-pending")); };
  }, []);

  return (
    <main id="top" lang={language} className="ricks-site min-h-screen bg-[#fffdf5] font-sans text-[#102d40]">
      {/* Top bar */}
      <div className="bg-[#102d40] px-5 py-3 text-center text-sm text-white">
        {t("Homestead, Florida · Your next fishing trip starts here", "Homestead, Florida · Tu próxima salida de pesca empieza aquí")}
      </div>
      {/* Navigation */}
      <header className="ricks-header sticky top-0 z-50 border-b border-[#102d40]/10 bg-[#fffdf5]/95 backdrop-blur-md">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 py-3">
          <a href="#top" aria-label={t("Rick’s Yellow Bait House — Home", "Rick’s Yellow Bait House — Inicio")}>
            <span className="flex items-center gap-3 text-[#df2331]">
              <svg
                aria-hidden="true"
                viewBox="0 0 64 48"
                fill="none"
                className="h-12 w-14 shrink-0"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Cabeza */}
                <path d="M44 12c8 0 15 5 17 12-2 7-9 12-17 12Z" />
                <circle cx="53" cy="21" r="1.5" fill="currentColor" stroke="none" />

                {/* Espina central y costillas */}
                <path d="M13 24h31" />
                <path d="M21 24l-5-10m5 10-5 10" />
                <path d="M30 24l-5-14m5 14-5 14" />
                <path d="M39 24l-5-11m5 11-5 11" />

                {/* Cola */}
                <path d="M13 24 3 15v18Z" />
              </svg>

              <span className="flex flex-col">
                <span className="text-4xl font-black leading-none tracking-tight sm:text-5xl">
                  RICK’S
                </span>
                <span className="mt-1 text-[10px] font-extrabold tracking-[0.16em] sm:text-xs">
                  YELLOW BAIT HOUSE
                </span>
              </span>
            </span>
          </a>
          <div className="flex items-center gap-3">
            <nav
              id="main-navigation"
              aria-label={t("Main navigation", "Navegación principal")}
              className={`${menuOpen ? "flex" : "hidden"} absolute left-0 right-0 top-full flex-col gap-5 border-b border-[#102d40]/10 bg-[#fffdf5] p-6 text-sm font-bold lg:static lg:flex lg:flex-row lg:items-center lg:border-0 lg:bg-transparent lg:p-0`}
            >
              {[
                { href: "#products", label: t("Gear", "Equipos") },
                { href: "#bait", label: t("Bait", "Carnadas") },
                { href: "#story", label: t("Our story", "Nuestra historia") },
                { href: "#hours", label: t("Hours", "Horario") },
              ].map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="nav-link">{link.label}</a>
              ))}
              <a href="#visit" onClick={() => setMenuOpen(false)} className="ricks-button rounded-full bg-[#df2331] px-6 py-3 text-center text-white">
                {t("Visit Rick’s ↗", "Visita Rick’s ↗")}
              </a>
            </nav>
            <div role="group" aria-label={t("Choose language", "Seleccionar idioma")} className="flex rounded-full border border-[#102d40]/20 p-1">
              {(["en", "es"] as const).map((code) => (
                <button key={code} type="button" onClick={() => setLanguage(code)} aria-pressed={language === code} aria-label={code === "en" ? "English" : "Español"} className={`min-h-10 min-w-11 rounded-full px-3 text-sm font-bold transition ${language === code ? "bg-[#102d40] text-white" : "text-[#102d40] hover:bg-[#102d40]/10"}`}>
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
            <button type="button" aria-controls="main-navigation" aria-expanded={menuOpen} aria-label={t("Toggle navigation", "Abrir o cerrar menú")} onClick={() => setMenuOpen(!menuOpen)} className="flex h-11 w-11 items-center justify-center rounded-full border border-[#102d40]/20 text-xl lg:hidden">
              {menuOpen ? "×" : "☰"}
            </button>
          </div>
        </div>
      </header>
      {/* Hero */}
      <section className="ricks-hero relative isolate overflow-hidden bg-[#102d40] text-white">
        <Image src="/images/fishing-sunrise.png" alt={t("Created image of an angler fishing at sunrise", "Imagen creada de un pescador al amanecer")} fill priority sizes="100vw" className="hero-photo object-cover object-[65%_center]" />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,29,43,0.94)_0%,rgba(6,29,43,0.65)_48%,rgba(6,29,43,0.15)_100%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-20 sm:pt-24 lg:pb-36 lg:pt-28">
          <div className="hero-copy max-w-3xl">
            <p className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#f5ce38] sm:text-sm">
              <span aria-hidden="true" className="h-px w-10 bg-[#f5ce38]" />
              {t("Homestead, Florida · Bait & tackle", "Homestead, Florida · Carnada y pesca")}
            </p>
            <h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl">
              {t("The water is calling.", "El agua te llama.")}
              <span className="mt-2 block text-[#f5ce38]">{t("Start at Rick’s.", "Empieza en Rick’s.")}</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/85">
              {t("Bait, tackle, and fishing essentials in Homestead, Florida. Stop by before your next trip and discover a local store with more than 30 years of history.", "Carnada y artículos de pesca en Homestead, Florida. Visítanos antes de tu próxima salida y descubre una tienda local con más de 30 años de historia.")}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#bait" className="ricks-button rounded-full bg-[#f5ce38] px-7 py-4 font-bold text-[#102d40]">
                {t("Find your bait →", "Encuentra tu carnada →")}
              </a>
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="ricks-button rounded-full border border-white/60 bg-[#102d40]/30 px-7 py-4 font-bold">
                {t("Get directions ↗", "Cómo llegar ↗")}
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold text-white/85">
              <span>{t("30+ years of local history", "Más de 30 años de historia local")}</span>
              <span>{t("Live · Fresh · Frozen bait", "Carnada viva · Fresca · Congelada")}</span>
            </div>
          </div>
        </div>
        <p className="absolute bottom-12 right-6 text-[10px] text-white/70">
          {t("Created fishing image", "Imagen de pesca creada")}
        </p>
        <svg aria-hidden="true" className="absolute bottom-0 left-0 h-10 w-full sm:h-14" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0 42C240 90 400 4 720 38S1200 90 1440 30V80H0Z" fill="#fffdf5" />
        </svg>
      </section>
      {/* Brands */}
      <section id="brands" className="border-b border-[#102d40]/10 bg-[#fffdf5]">
        <div className="mx-auto max-w-7xl px-6 py-12" data-reveal>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#df2331]">{t("Brands we work with", "Marcas con las que trabajamos")}</p>
              <h2 className="mt-3 text-2xl font-black sm:text-3xl">{t("Serious gear. Local connections.", "Grandes marcas. Cercanía local.")}</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#536570]">{t("We maintain direct contact with PENN, Daiwa, Shimano, Okuma, and Quantum. Ask us about products and availability.", "Mantenemos contacto directo con PENN, Daiwa, Shimano, Okuma y Quantum. Consulta productos y disponibilidad.")}</p>
          </div>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-7 border-t border-[#102d40]/10 pt-8 sm:justify-between">
            {[
              { name: "PENN", file: "penn.svg" },
              { name: "Daiwa", file: "daiwa.png" },
              { name: "Shimano", file: "shimano.svg" },
              { name: "Okuma", file: "okuma.svg" },
              { name: "Quantum", file: "quantum.png" },
            ].map((brand) => (
              <li key={brand.name} className="brand-mark relative h-16 w-28 sm:w-36">
                <Image src={`/brands/${brand.file}`} alt={brand.name} fill sizes="144px" className="object-contain" />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section id="more-brands" className="border-b border-[#102d40]/10 bg-[#fffdf5]">
        <div className="mx-auto max-w-7xl px-6 pb-10 pt-6">
          <p className="text-center text-xs font-bold uppercase tracking-[0.16em] text-[#536570]">
            {t("More brands in store", "Más marcas en nuestra tienda")}
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {[
              { name: "Sufix", file: "sufix.png", dark: false },
              { name: "No Live Bait Needed", file: "nlbn.png", dark: true },
              { name: "Donovan Marine", file: "donovan-marine.png", dark: true },
              { name: "Huk", file: "huk.png", dark: false },
              { name: "Mustad", file: "mustad.svg", dark: false },
            ].map((brand) => (
              <li
                key={brand.name}
                className={`flex h-20 w-36 items-center justify-center rounded-xl px-4 ${brand.dark ? "bg-[#102d40]" : "bg-white"
                  }`}
              >
                <Image
                  src={`/brands/${brand.file}`}
                  alt={brand.name}
                  width={120}
                  height={55}
                  className="h-14 w-full object-contain"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
      {/* Categories */}
      <section id="products" className="mx-auto max-w-7xl px-6 py-20" data-reveal>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#df2331]">
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
          ].map((category, index) => (
            <article
              key={category.image}
              className="product-card group overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, 33vw"
                  className="product-photo object-cover"
                />
                <span aria-hidden="true" className="absolute left-5 top-5 rounded-full bg-[#df2331] px-4 py-2 text-xs font-black tracking-wider text-white">0{index + 1}</span>
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
            {
              t(
                "One of South Florida’s largest bait selections.",
                "Una de las selecciones de carnada más amplias del sur de Florida."
              )}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">
            {t("Explore our live, fresh, and frozen bait, plus chum. Call the store for current availability, sizes, and pricing.", "Descubre nuestras carnadas vivas, frescas y congeladas, además de engodo. Llámanos para consultar disponibilidad, presentaciones y precios.")}
          </p>
          <div role="group" aria-label={t("Filter bait categories", "Filtrar categorías de carnada")} className="mt-9 flex flex-wrap gap-3">
            {[
              { id: "all", label: t("All bait", "Todas") },
              { id: "live", label: t("Live", "Viva") },
              { id: "fresh", label: t("Fresh", "Fresca") },
              { id: "frozen", label: t("Frozen", "Congelada") },
              { id: "chum", label: t("Chum", "Engodo") },
            ].map((filter) => (
              <button key={filter.id} type="button" aria-pressed={baitFilter === filter.id} aria-controls="bait-results" onClick={() => setBaitFilter(filter.id)} className={`ricks-button min-h-11 rounded-full border px-6 py-3 text-sm font-bold ${baitFilter === filter.id ? "border-[#f5ce38] bg-[#f5ce38] text-[#102d40]" : "border-white/30 text-white hover:bg-white/10"}`}>
                {filter.label}
              </button>
            ))}
          </div>
          <div id="bait-results" className={`mt-8 grid gap-6 ${baitFilter === "all" ? "sm:grid-cols-2" : "grid-cols-1"}`}>
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
            ].filter((group) => baitFilter === "all" || group.id === baitFilter).map((group) => (
              <article key={group.id} className="bait-card rounded-2xl border-l-4 border-[#f5ce38] bg-white/5 p-7 sm:p-8">
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
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#df2331]">
            {t("Our story", "Nuestra historia")}
          </p>

          <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
            {t(
              "Where fishing stories begin.",
              "Donde empiezan las historias de pesca."
            )}
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <figure className="overflow-hidden rounded-2xl bg-[#fffdf5] shadow-sm">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/jacks-1969.jpg"
                  alt={t(
                    "Jack’s Bait & Tackle in 1969",
                    "Jack’s Bait & Tackle en 1969"
                  )}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="object-contain p-3"
                />
              </div>

              <figcaption className="border-t border-[#102d40]/10 px-6 py-5">
                <p className="text-xs font-bold uppercase tracking-widest text-[#df2331]">
                  {t("Then · 1969", "Antes · 1969")}
                </p>
                <p className="mt-1 text-lg font-bold">
                  Jack’s Bait & Tackle
                </p>
                <p className="mt-1 text-xs text-[#536570]">
                  {t(
                    "Photo: Jack’s historical archive",
                    "Foto: archivo histórico de Jack’s"
                  )}
                </p>
              </figcaption>
            </figure>

            <figure className="overflow-hidden rounded-2xl bg-[#fffdf5] shadow-sm">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/storefront.jpeg"
                  alt={t(
                    "The yellow storefront of Rick’s Yellow Bait House today",
                    "La fachada amarilla de Rick’s Yellow Bait House en la actualidad"
                  )}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="object-contain p-3"
                />
              </div>

              <figcaption className="border-t border-[#102d40]/10 px-6 py-5">
                <p className="text-xs font-bold uppercase tracking-widest text-[#df2331]">
                  {t("Today", "Hoy")}
                </p>
                <p className="mt-1 text-lg font-bold">
                  Rick’s Yellow Bait House
                </p>
                <p className="mt-1 text-xs text-[#536570]">
                  Homestead · Florida City
                </p>
              </figcaption>
            </figure>
          </div>

          <div className="mx-auto mt-12 max-w-3xl space-y-6 text-lg leading-8 text-[#536570]">
            <p className="text-2xl font-semibold leading-9 text-[#102d40]">
              {t(
                "Some places are remembered for what they sell. Others, for the moments they become part of.",
                "Hay lugares que se recuerdan por lo que venden. Otros, por los momentos que acompañan."
              )}
            </p>

            <p>
              {t(
                "For many anglers in Homestead and Florida City, this shop is part of the memory of going fishing: a stop with Dad, the excitement of carrying a fishing rod, and wondering what the day would bring.",
                "Para muchos pescadores de Homestead y Florida City, esta tienda es parte del recuerdo de salir a pescar: una parada con papá, la ilusión de llevar una caña y las ganas de descubrir qué traería el día."
              )}
            </p>

            <p>
              {t(
                "Once known as Jack’s Bait & Tackle, and today as Rick’s Yellow Bait House, this place is part of South Florida’s fishing history. Photographs from Jack’s archive, dated 1969, remind us how long it has been part of its community.",
                "Antes conocida como Jack’s Bait & Tackle, y hoy como Rick’s Yellow Bait House, esta casa forma parte de la historia pesquera del sur de Florida. Las fotografías del archivo de Jack’s, identificadas como de 1969, nos recuerdan cuánto tiempo lleva este lugar acompañando a su comunidad."
              )}
            </p>

            <p>
              {t(
                "But its most meaningful history still walks through the door. It comes from customers who tell us they visited as children and still return before heading out to fish. The years, the gear, and the shop’s name have changed; those memories still have a home here.",
                "Pero su historia más bonita sigue entrando por la puerta. La cuentan los clientes que nos dicen que venían aquí cuando eran niños y que todavía regresan antes de salir a pescar. Han cambiado los años, los equipos y el nombre de la tienda; esos recuerdos siguen teniendo un lugar aquí."
              )}
            </p>

            <p>
              {t(
                "Today, we welcome both those who have known this stop all their lives and those preparing for their first fishing trip. With live, fresh, and frozen bait, fishing supplies, and doors open 365 days a year, we remain part of the journey toward the water.",
                "Hoy recibimos tanto a quienes conocen esta parada de toda la vida como a quienes preparan su primera salida. Con carnada viva, fresca y congelada, artículos de pesca y las puertas abiertas los 365 días del año, seguimos formando parte del camino hacia el agua."
              )}
            </p>

            <p>
              {t(
                "If you’ve been here before, we’ll be glad to see you again. If you haven’t met us yet, stop by Rick’s before your next adventure.",
                "Si ya has venido, nos alegrará verte de nuevo. Si todavía no nos conoces, pasa por Rick’s antes de tu próxima aventura."
              )}
            </p>

            <p className="border-l-4 border-[#df2331] pl-5 text-2xl font-bold leading-9 text-[#102d40]">
              {t(
                "Your next fishing story can start here.",
                "Tu próxima historia de pesca puede empezar aquí."
              )}
            </p>

            <a
              href="#visit"
              className="inline-flex rounded-full bg-[#df2331] px-7 py-4 text-base font-bold text-white transition hover:bg-[#bd1c28]"
            >
              {t("Visit Rick’s →", "Visita Rick’s →")}
            </a>
          </div>
        </div>
      </section>
      {/* Visit */}
      {/* Store hours */}
      <section id="hours" className="mx-auto max-w-7xl px-6 py-16" data-reveal>
        <div className="relative grid gap-10 overflow-hidden rounded-3xl bg-[#102d40] p-8 text-white sm:p-12 md:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f5ce38]">
              {t("Store hours", "Horario de atención")}
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight">
              <span className="mb-5 block text-7xl font-black text-[#f5ce38]">4 AM</span>
              {t("Early starts.", "Desde temprano.")}
              <br />
              {t("Late-night fishing.", "Para tus noches de pesca.")}
            </h2>
            <p className="mt-5 max-w-md leading-7 text-white/75">
              {t(
                "Open 365 days a year, including all holidays. Open 24 hours on Fridays and Saturdays.",
                "Abiertos los 365 días del año, incluidos todos los días festivos. Abierto las 24 horas los viernes y sábados."
              )}
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
      <section id="visit" className="mx-auto max-w-7xl px-6 py-20" data-reveal>
        <div className="grid gap-10 rounded-[2rem] bg-[#df2331] p-8 text-white sm:p-12 md:grid-cols-2">
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
              className="ricks-button rounded-full bg-[#f5ce38] px-7 py-4 font-bold text-[#102d40]"
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
      <style jsx global>{`
        .ricks-site { overflow-x: clip; }
        .ricks-site section[id] { scroll-margin-top: 115px; }
        .ricks-site a, .ricks-site button { -webkit-tap-highlight-color: transparent; }
        .ricks-site a:focus-visible, .ricks-site button:focus-visible { outline: 3px solid #e39119; outline-offset: 5px; }
        .ricks-site .nav-link { position: relative; transition: color .2s ease; }
        .ricks-site .nav-link:hover { color: #df2331; }
        .ricks-site .ricks-button { transition: transform .2s ease, box-shadow .2s ease, background .2s ease; }
        .ricks-site .ricks-button:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgb(0 0 0 / .16); }
        .ricks-site .hero-copy { animation: ricks-rise .8s ease both; }
        .ricks-site .hero-photo { animation: ricks-hero-in 1.3s ease both; }
        .ricks-site .brand-mark { transition: transform .25s ease; }
        .ricks-site .brand-mark:hover { transform: translateY(-4px); }
        .ricks-site .product-card { transition: transform .3s ease, box-shadow .3s ease; }
        .ricks-site .product-card:hover { transform: translateY(-7px); box-shadow: 0 20px 45px rgb(16 45 64 / .14); }
        .ricks-site .product-photo { transition: transform .6s ease; }
        .ricks-site .product-card:hover .product-photo { transform: scale(1.05); }
        .ricks-site .bait-card, .ricks-site .gallery-photo { animation: ricks-fade .35s ease both; }
        .ricks-site [data-reveal] { transition: opacity .6s ease, transform .6s ease; }
        .ricks-site [data-pending="true"] { opacity: 0; transform: translateY(22px); }
        @keyframes ricks-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes ricks-fade { from { opacity: .35; } to { opacity: 1; } }
        @keyframes ricks-hero-in { from { transform: scale(1.045); } to { transform: scale(1); } }
        @media (prefers-reduced-motion: no-preference) { html:has(.ricks-site) { scroll-behavior: smooth; } }
        @media (prefers-reduced-motion: reduce) {
          .ricks-site *, .ricks-site *::before, .ricks-site *::after { animation: none !important; transition: none !important; }
          .ricks-site [data-pending="true"] { opacity: 1; transform: none; }
          .ricks-site .ricks-button:hover, .ricks-site .product-card:hover, .ricks-site .product-photo, .ricks-site .brand-mark:hover { transform: none; }
        }
      `}</style>
    </main>
  );
}
