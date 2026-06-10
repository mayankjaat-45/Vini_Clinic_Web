<header className="sticky top-0 z-50 border-b border-[#D8F0EE] bg-[#F8FEFD]/95 shadow-sm shadow-teal-900/5 backdrop-blur-2xl">
  <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2 sm:px-5 lg:gap-4">
    <a
      href="/"
      className="group flex min-w-0 flex-1 items-center gap-2 rounded-2xl px-1 py-1 transition hover:bg-[#E9F8F6] sm:gap-3 sm:px-2 lg:flex-none"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-[#0F3D5E] via-[#168A83] to-[#54C6B8] text-base font-black text-white shadow-lg shadow-teal-900/20 transition group-hover:-rotate-3 group-hover:scale-105 sm:h-11 sm:w-11 sm:text-lg">
        V
      </span>

      <span className="flex min-w-0 flex-1 flex-col leading-tight">
        <span className="truncate text-[16px] font-black tracking-tight text-[#0F3D5E] transition group-hover:text-[#0F766E] sm:text-xl">
          Dr. Vini Jhariya
        </span>

        <span className="mt-0.5 flex min-w-0 items-center gap-1.5 text-[8.5px] font-black uppercase tracking-[0.12em] text-[#168A83] sm:text-[11px] sm:tracking-[0.22em]">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#54C6B8]" />
          <span className="truncate">Clinical and Child Psychologist</span>
        </span>
      </span>
    </a>

    <nav className="hidden items-center gap-1 lg:flex">
      {mainNavLinks.slice(0, 2).map((link) => (
        <a key={link.name} href={link.href} className={navItemClass}>
          {link.name}
        </a>
      ))}

      <div className="relative">
        <button
          type="button"
          onMouseEnter={() => setOpenMega(true)}
          onClick={() => setOpenMega((prev) => !prev)}
          className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-bold text-[#24415A] transition hover:bg-[#E9F8F6] hover:text-[#0F766E] xl:px-4"
        >
          Services
          <ChevronDown
            size={16}
            className={`transition ${openMega ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {mainNavLinks.slice(2, 6).map((link) => (
        <a key={link.name} href={link.href} className={navItemClass}>
          {link.name}
        </a>
      ))}
    </nav>

    <div className="hidden items-center gap-2 lg:flex">
      <a
        href="tel:+917999215093"
        aria-label="Call Dr. Vini Jhariya"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#BFE6E2] bg-white text-[#0F766E] shadow-sm transition hover:-translate-y-0.5 hover:border-[#168A83] hover:bg-[#E9F8F6]"
      >
        <PhoneCall size={18} />
      </a>

      <a
        href="https://wa.me/917999215093"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Dr. Vini Jhariya"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#BFE6E2] bg-white text-[#0F766E] shadow-sm transition hover:-translate-y-0.5 hover:border-[#168A83] hover:bg-[#E9F8F6]"
      >
        <MessageCircle size={18} />
      </a>

      <a
        href="/contact-us"
        className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#0F3D5E] to-[#168A83] px-5 py-3 text-sm font-bold text-white shadow-xl shadow-teal-900/20 transition hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-teal-900/25"
      >
        <CalendarCheck size={18} />
        Book Consultation
      </a>
    </div>

    <button
      type="button"
      onClick={() => setMobileOpen(true)}
      aria-label="Open menu"
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#BFE6E2] bg-white text-[#0F766E] shadow-sm lg:hidden"
    >
      <Menu size={22} />
    </button>
  </div>
</header>;
