/**
 * PETRA VAJS — PSIHOTERAPIJA IN SVETOVANJE
 * Design: "Mehka jasnost" — Soft Clarity
 * 
 * Sections:
 * 1. Navigation (fixed, anchor links top-right)
 * 2. Hero (asymmetric: name + signature left, photo right)
 * 3. Poslanstvo (mission + photo)
 * 4. Komu je namenjena (who it's for)
 * 5. Integrativna psihoterapija (what it is)
 * 6. Moja pot (about / biography)
 * 7. Kako poteka (how it works)
 * 8. Cenik (pricing)
 * 9. FAQ (accordion)
 * 10. Kontakt (contact form + info)
 * 11. Footer
 */

import { useState, useEffect, useRef } from "react";

// ─── Navigation ──────────────────────────────────────────────────────────────

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Domov", href: "#domov" },
    { label: "Psihoterapija", href: "#psihoterapija" },
    { label: "O meni", href: "#o-meni" },
    { label: "Kako poteka", href: "#kako-poteka" },
    { label: "Cenik", href: "#cenik" },
    { label: "Kontakt", href: "#kontakt" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: scrolled ? "rgba(250, 248, 245, 0.97)" : "rgba(250, 248, 245, 0.85)",
        backdropFilter: "blur(8px)",
        borderBottom: scrolled ? "1px solid #E0D4C8" : "1px solid transparent",
        transition: "all 0.4s ease",
        padding: "0 2rem",
      }}
    >
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "70px",
      }}>
        {/* Logo / Name */}
        <a
          href="#domov"
          style={{
            textDecoration: "none",
            color: "#3D5240",
            fontFamily: "'Gadugi', 'Trebuchet MS', sans-serif",
            fontSize: "1.05rem",
            letterSpacing: "0.08em",
            fontWeight: 400,
          }}
        >
          PETRA VAJS
        </a>

        {/* Desktop nav links */}
        <div
          className="desktop-nav"
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                textDecoration: "none",
                color: "#3A3A3A",
                fontFamily: "'Gadugi', 'Trebuchet MS', sans-serif",
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                transition: "color 0.3s ease",
                paddingBottom: "2px",
                borderBottom: "1.5px solid transparent",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLAnchorElement).style.color = "#3D5240";
                (e.target as HTMLAnchorElement).style.borderBottomColor = "#3D5240";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLAnchorElement).style.color = "#3A3A3A";
                (e.target as HTMLAnchorElement).style.borderBottomColor = "transparent";
              }}
            >
              {link.label}
            </a>
          ))}
          <a href="#kontakt" className="btn-sage" style={{ padding: "0.6rem 1.4rem", fontSize: "0.75rem" }}>
            Naroči se
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "none",
            flexDirection: "column",
            gap: "5px",
            padding: "4px",
          }}
          aria-label="Meni"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "24px",
                height: "1.5px",
                backgroundColor: "#3D5240",
                transition: "all 0.3s ease",
                transform: menuOpen
                  ? i === 0 ? "rotate(45deg) translate(4.5px, 4.5px)"
                  : i === 1 ? "opacity: 0"
                  : "rotate(-45deg) translate(4.5px, -4.5px)"
                  : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            backgroundColor: "#FAF8F5",
            borderTop: "1px solid #E0D4C8",
            padding: "1.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                textDecoration: "none",
                color: "#3A3A3A",
                fontFamily: "'Gadugi', 'Trebuchet MS', sans-serif",
                fontSize: "0.85rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#kontakt"
            className="btn-sage"
            onClick={() => setMenuOpen(false)}
            style={{ textAlign: "center", marginTop: "0.5rem" }}
          >
            Naroči se
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

// ─── Fade-in hook ─────────────────────────────────────────────────────────────

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      id="domov"
      style={{
        minHeight: "100vh",
        backgroundColor: "#FAF8F5",
        display: "flex",
        alignItems: "stretch",
        paddingTop: "70px",
        overflow: "hidden",
      }}
    >
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        padding: "0 3rem",
        gap: "4rem",
      }}
      className="hero-grid"
      >
        {/* Left: Text + signature */}
        <div style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
          <p className="section-label" style={{ marginBottom: "1.5rem" }}>
            Psihoterapija in svetovanje
          </p>

          <h1 style={{
            fontFamily: "'Gadugi', 'Trebuchet MS', 'Cormorant Garamond', serif",
            fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
            color: "#3D5240",
            fontWeight: 300,
            lineHeight: 1.1,
            marginBottom: "0.5rem",
            letterSpacing: "-0.01em",
          }}>
            Petra
          </h1>
          <h1 style={{
            fontFamily: "'Gadugi', 'Trebuchet MS', 'Cormorant Garamond', serif",
            fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
            color: "#3D5240",
            fontWeight: 300,
            lineHeight: 1.1,
            marginBottom: "2rem",
            letterSpacing: "-0.01em",
          }}>
            Vajs
          </h1>

          <p style={{
            fontFamily: "'Gadugi', 'Trebuchet MS', sans-serif",
            fontSize: "0.85rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#9E8E7A",
            marginBottom: "0.5rem",
          }}>
            Univ. dipl. soc. del.
          </p>
          <p style={{
            fontFamily: "'Gadugi', 'Trebuchet MS', sans-serif",
            fontSize: "0.85rem",
            letterSpacing: "0.1em",
            color: "#7A7A7A",
            marginBottom: "2.5rem",
          }}>
            Specializantka integrativne psihoterapije pod supervizijo
          </p>

          {/* Signature */}
          <div style={{ marginBottom: "2.5rem" }}>
            <img
              src="/manus-storage/petra-podpis_7d66b015.png"
              alt="Podpis Petre Vajs"
              style={{
                width: "160px",
                opacity: 0.65,
                mixBlendMode: "multiply",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#kontakt" className="btn-sage">
              Naroči se
            </a>
            <a href="#o-meni" className="btn-sage-outline">
              Več o meni
            </a>
          </div>
        </div>

        {/* Right: Photo */}
        <div style={{
          position: "relative",
          height: "calc(100vh - 70px)",
          minHeight: "500px",
          overflow: "hidden",
        }}
        className="hero-photo-wrap"
        >
          <img
            src="/manus-storage/petra-foto1_8bb583df.jpg"
            alt="Petra Vajs — psihoterapevtka"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
            }}
          />
          {/* Subtle gradient overlay on left edge */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "80px",
            background: "linear-gradient(to right, #FAF8F5, transparent)",
            pointerEvents: "none",
          }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            padding: 2rem 1.5rem !important;
            gap: 2rem !important;
            min-height: auto !important;
          }
          .hero-photo-wrap {
            height: 60vw !important;
            min-height: 280px !important;
            border-radius: 4px;
          }
        }
      `}</style>
    </section>
  );
}

// ─── Poslanstvo Section ───────────────────────────────────────────────────────

function PoslanstvoSection() {
  const ref = useFadeIn();

  return (
    <section
      id="psihoterapija"
      style={{
        backgroundColor: "#EDE4D9",
        padding: "7rem 0",
      }}
    >
      <div
        ref={ref}
        className="fade-in-up"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 3rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "center",
        }}
        >
        {/* Photo */}
        <div style={{
          position: "relative",
          borderRadius: "2px",
          overflow: "hidden",
          aspectRatio: "3/4",
          maxHeight: "600px",
        }}>
          <img
            src="/manus-storage/petra-foto2_6bea705e.jpg"
            alt="Petra Vajs — psihoterapevtka v stolu"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
            }}
          />
        </div>

        {/* Text */}
        <div>
          <p className="section-label">Poslanstvo</p>
          <h2 className="section-title">
            Varen prostor za vas
          </h2>

          <p style={{ marginBottom: "1.5rem", lineHeight: 1.9, color: "#3A3A3A" }}>
            Moje poslanstvo je delo z ljudmi, ki se prepleta z ustvarjanjem varnega,
            zaupnega in sprejemajočega prostora ter podpore na poti raziskovanja lastnih stisk,
            do postopnega uvajanja sprememb in utrjevanja novih načinov delovanja,
            kjer je posameznik viden, slišan in sprejet brez obsojanja.
          </p>

          <p style={{ marginBottom: "2rem", lineHeight: 1.9, color: "#3A3A3A" }}>
            Verjamem v avtentičnost odnosa, zato pri svojem delu uporabljam različne
            tehnike integrativne psihoterapije, ki jih prilagajam posamezniku glede
            na njegove potrebe.
          </p>

          <p style={{
            fontStyle: "italic",
            color: "#3D5240",
            fontSize: "1.05rem",
            lineHeight: 1.7,
            borderLeft: "2px solid #3D5240",
            paddingLeft: "1.25rem",
          }}>
            Poslušam in pomagam ubesediti občutke, misli in vedenja.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .poslanstvo-grid {
            grid-template-columns: 1fr !important;
            padding: 0 1.5rem !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}

// ─── Komu je namenjena ────────────────────────────────────────────────────────

function KomuSection() {
  const ref = useFadeIn();

  const stiske = [
    "Anksioznostjo in občutki notranjega nemira",
    "Stresom in izgorelostjo",
    "Depresijo ali izgubo motivacije",
    "Težavami v odnosih (partnerskih, družinskih, poslovnih)",
    "Občutki manjvrednosti ali nizko samopodobo",
    "Občutki praznine, zmedenosti, izgube smisla",
    "Življenjskimi krizami",
    "Ponavljajočimi vzorci, ki vas omejujejo",
  ];

  return (
    <section
      style={{
        backgroundColor: "#FAF8F5",
        padding: "7rem 0",
      }}
    >
      <div
        ref={ref}
        className="fade-in-up"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 3rem",
        }}
      >
        <div style={{ maxWidth: "680px" }}>
          <p className="section-label">Za koga</p>
          <h2 className="section-title">
            Komu je namenjena psihoterapija?
          </h2>
          <p style={{ marginBottom: "2.5rem", color: "#3A3A3A" }}>
            Psihoterapija je namenjena vsakomur, ki se sooča z:
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1rem",
          marginBottom: "3rem",
        }}>
          {stiske.map((stiska, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#EDE4D9",
                padding: "1.25rem 1.5rem",
                borderRadius: "2px",
                borderLeft: "2px solid #3D5240",
                fontFamily: "'Gadugi', 'Trebuchet MS', sans-serif",
                fontSize: "0.95rem",
                color: "#3A3A3A",
                lineHeight: 1.6,
              }}
            >
              {stiska}
            </div>
          ))}
        </div>

        <p style={{
          maxWidth: "680px",
          color: "#3A3A3A",
          fontStyle: "italic",
          fontSize: "1.05rem",
          lineHeight: 1.8,
        }}>
          Psihoterapija je namenjena vsem, ki si želijo osebne rasti, boljšega razumevanja
          sebe in bolj kakovostnega življenja.
        </p>
      </div>
    </section>
  );
}

// ─── Integrativna psihoterapija ───────────────────────────────────────────────

function IntegrativnaSection() {
  const ref = useFadeIn();

  return (
    <section
      style={{
        backgroundColor: "#E0D4C8",
        padding: "7rem 0",
      }}
    >
      <div
        ref={ref}
        className="fade-in-up"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 3rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "start",
        }}
        >
        <div>
          <p className="section-label">Pristop</p>
          <h2 className="section-title">
            Kaj je integrativna psihoterapija?
          </h2>
        </div>
        <div>
          <p style={{ lineHeight: 1.9, color: "#3A3A3A" }}>
            Integrativna psihoterapija je sodoben pristop, ki povezuje različne
            psihoterapevtske metode in smeri. Temelji na razumevanju človeka kot celote
            — misli, čustev, odnosov in telesa.
          </p>
          <p style={{ lineHeight: 1.9, color: "#3A3A3A", marginTop: "1.25rem" }}>
            Integrativna psihoterapija se prilagaja posamezniku in njegovim potrebam.
            V ospredje se postavlja odnos med terapevtom in klientom, ki omogoča varno
            raziskovanje notranjega sveta, trenutnih izzivov in preteklih izkušenj.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .integrativna-grid {
            grid-template-columns: 1fr !important;
            padding: 0 1.5rem !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}

// ─── Moja pot ─────────────────────────────────────────────────────────────────

function MojaPotSection() {
  const ref = useFadeIn();

  return (
    <section
      id="o-meni"
      style={{
        backgroundColor: "#FAF8F5",
        padding: "7rem 0",
      }}
    >
      <div
        ref={ref}
        className="fade-in-up"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 3rem",
        }}
      >
        <p className="section-label">O meni</p>
        <h2 className="section-title" style={{ maxWidth: "500px" }}>
          Moja pot
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          marginTop: "1rem",
        }}
        className="mojapot-grid"
        >
          <div>
            <p style={{ lineHeight: 1.9, color: "#3A3A3A", marginBottom: "1.5rem" }}>
              Že zelo zgodaj sem v sebi začutila ljubezen do dela z ljudmi — biti ob njih
              v trenutkih, ko potrebujejo razumevanje, podporo in prostor, kjer so lahko
              resnično slišani.
            </p>
            <p style={{ lineHeight: 1.9, color: "#3A3A3A", marginBottom: "1.5rem" }}>
              Moja strokovna pot se je začela na Fakulteti za socialno delo v Ljubljani,
              kjer sem diplomirala in se skozi leta bogatila z dragocenimi izkušnjami pri
              delu s posamezniki, pari in družinami. Posebno področje mojega dela
              predstavlja podpora v zahtevnih življenjskih situacijah, kot so izkušnje
              nasilja v družini in proces razveze zakonske zveze, kjer je še posebej
              pomembno, da človek ne ostane sam.
            </p>
            <p style={{ lineHeight: 1.9, color: "#3A3A3A", marginBottom: "1.5rem" }}>
              Pomemben del mojega strokovnega in osebnega razvoja je zaznamovalo tudi
              prostovoljno delo v domu starejših, kjer sem skozi pristne odnose poglobila
              razumevanje človeka v vsej njegovi ranljivosti, modrosti in življenjski zgodbi.
            </p>
            <p style={{ lineHeight: 1.9, color: "#3A3A3A" }}>
              Skozi leta izobraževanj in prakse sem razvijala način dela, ki temelji na
              spoštljivem in iskrenem odnosu. Verjamem v moč jasnosti tudi takrat, ko se
              znajdemo v notranjem kaosu ter v pomen sočutne, a hkrati iskrene komunikacije.
            </p>
          </div>

          <div>
            <p style={{ lineHeight: 1.9, color: "#3A3A3A", marginBottom: "1.5rem" }}>
              Radovednost in želja po razumevanju globin človeške notranjosti sta me
              vodili do študija psihoterapije. Svoje znanje sem nadgradila z izobraževanjem
              na Sigmund Freud Inštitutu v Ljubljani, kjer sem zaključila psihoterapevtsko
              propedevtiko in nadaljevala štiriletni specialistični študij integrativne
              psihoterapije.
            </p>
            <p style={{ lineHeight: 1.9, color: "#3A3A3A", marginBottom: "1.5rem" }}>
              Danes, kot specializantka integrativne psihoterapije v ambulanti Sigmund
              Freud Inštituta, združujem strokovno znanje s tistim najpomembnejšim —
              pristnim človeškim odnosom.
            </p>
            <p style={{ lineHeight: 1.9, color: "#3A3A3A", marginBottom: "1.5rem" }}>
              Pri svojem delu izhajam iz globokega prepričanja, da vsak človek nosi v
              sebi potencial za spremembo. Včasih na tej poti potrebujemo varen prostor,
              podporen odnos in nekoga, ki nas spremlja — brez obsojanja, z razumevanjem
              in prisotnostjo.
            </p>
            <p style={{ lineHeight: 1.9, color: "#3A3A3A", marginBottom: "1.5rem" }}>
              Redno se dodatno izobražujem ter sodelujem v interviziji in superviziji.
              To zame ni le del profesionalne integritete, temveč obljuba vam, da bo
              naša skupna pot varna, kakovostna in vodena s premišljeno podporo.
            </p>
            <p style={{ lineHeight: 1.9, color: "#3A3A3A" }}>
              Moje življenje v celoto povezujejo vloge mame, partnerke, prijateljice in
              hčerke. V prostem času me življenje najraje najde v preprostih, a polnih
              trenutkih — potovanjih, knjigah, gibanju in pristnih odnosih. Verjamem, da
              prav te drobne, vsakdanje stvari ustvarjajo ravnovesje, ki ga potem
              prinašam v svoje delo.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mojapot-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
        @media (max-width: 1024px) {
          .mojapot-grid {
            padding: 0 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}

// ─── Kako poteka ──────────────────────────────────────────────────────────────

function KakoPotekaSection() {
  const ref = useFadeIn();

  return (
    <section
      id="kako-poteka"
      style={{
        backgroundColor: "#EDE4D9",
        padding: "7rem 0",
      }}
    >
      <div
        ref={ref}
        className="fade-in-up"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 3rem",
        }}
      >
        <p className="section-label">Proces</p>
        <h2 className="section-title">Kako poteka psihoterapija?</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          marginTop: "1rem",
        }}
        className="kako-grid"
        >
          {/* Uvodno srečanje */}
          <div style={{
            backgroundColor: "#FAF8F5",
            padding: "2.5rem",
            borderRadius: "2px",
          }}>
            <div style={{
              width: "2.5rem",
              height: "2.5rem",
              backgroundColor: "#3D5240",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.5rem",
              color: "#FAF8F5",
              fontFamily: "'Gadugi', 'Trebuchet MS', sans-serif",
              fontSize: "0.9rem",
            }}>
              01
            </div>
            <h3 style={{
              color: "#3D5240",
              fontSize: "1.2rem",
              fontWeight: 400,
              marginBottom: "1rem",
              fontFamily: "'Gadugi', 'Trebuchet MS', sans-serif",
            }}>
              Uvodno srečanje
            </h3>
            <p style={{ color: "#7A7A7A", fontSize: "0.8rem", letterSpacing: "0.1em", marginBottom: "1rem", textTransform: "uppercase" }}>
              50 minut
            </p>
            <p style={{ lineHeight: 1.85, color: "#3A3A3A" }}>
              Prvo srečanje je namenjeno spoznavanju. Povprašam vas o vaših stiskah,
              o morebitnih predhodnih obravnavah in terapijah, skupaj postaviva okvir
              sodelovanja. Predstavim vam svoj pristop in način dela, s poudarkom na
              zaupnosti podatkov in kontinuiteti. Tukaj je tudi prostor za vaša vprašanja,
              ki so dobrodošla skozi celoten proces.
            </p>
          </div>

          {/* Individualna psihoterapija */}
          <div style={{
            backgroundColor: "#FAF8F5",
            padding: "2.5rem",
            borderRadius: "2px",
          }}>
            <div style={{
              width: "2.5rem",
              height: "2.5rem",
              backgroundColor: "#3D5240",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.5rem",
              color: "#FAF8F5",
              fontFamily: "'Gadugi', 'Trebuchet MS', sans-serif",
              fontSize: "0.9rem",
            }}>
              02
            </div>
            <h3 style={{
              color: "#3D5240",
              fontSize: "1.2rem",
              fontWeight: 400,
              marginBottom: "1rem",
              fontFamily: "'Gadugi', 'Trebuchet MS', sans-serif",
            }}>
              Individualna psihoterapija
            </h3>
            <p style={{ color: "#7A7A7A", fontSize: "0.8rem", letterSpacing: "0.1em", marginBottom: "1rem", textTransform: "uppercase" }}>
              45 minut · 1× tedensko
            </p>
            <p style={{ lineHeight: 1.85, color: "#3A3A3A" }}>
              Nadaljnja srečanja potekajo individualno, enkrat tedensko, ob vedno istem
              terminu. Rednost srečanj pomeni kontinuiteto, poglabljanje procesa ter
              ustvarjanje stabilnega terapevtskega odnosa.
            </p>
            <p style={{ lineHeight: 1.85, color: "#3A3A3A", marginTop: "1rem" }}>
              Morebitno odsotnost morate sporočiti vsaj 48 ur pred dogovorjenim terminom,
              sicer se ura plača. Izjema so naravne nesreče in bolezni.
            </p>
            <p style={{ lineHeight: 1.85, color: "#3A3A3A", marginTop: "1rem" }}>
              Kot specializantka delujem pod supervizijo, kar pomeni, da svoje delo
              kontinuirano strokovno reflektiram in nadgrajujem ob podpori izkušenega
              licenciranega psihoterapevta.
            </p>
          </div>
        </div>

        {/* Lokacija */}
        <div style={{
          marginTop: "2rem",
          backgroundColor: "#FAF8F5",
          padding: "2rem 2.5rem",
          borderRadius: "2px",
          display: "flex",
          gap: "3rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}>
          <div>
            <p className="section-label" style={{ marginBottom: "0.5rem" }}>Lokacija</p>
            <p style={{ color: "#3A3A3A", lineHeight: 1.7 }}>
              Ambulanta Sigmund Freud Inštitut<br />
              Trubarjeva cesta 65, 1000 Ljubljana
            </p>
          </div>
          <div style={{ width: "1px", height: "50px", backgroundColor: "#C8B9A8" }} className="divider-v" />
          <div>
            <p className="section-label" style={{ marginBottom: "0.5rem" }}>Način dela</p>
            <p style={{ color: "#3A3A3A" }}>Osebno</p>
          </div>
          <div style={{ width: "1px", height: "50px", backgroundColor: "#C8B9A8" }} className="divider-v" />
          <div>
            <p className="section-label" style={{ marginBottom: "0.5rem" }}>Ciljna skupina</p>
            <p style={{ color: "#3A3A3A" }}>Odrasli posamezniki</p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .kako-grid {
            grid-template-columns: 1fr !important;
            padding: 0 !important;
          }
          .divider-v { display: none; }
        }
        @media (max-width: 1024px) {
          .kako-grid, .fade-in-up > div {
            padding-left: 1.5rem !important;
            padding-right: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}

// ─── Cenik ────────────────────────────────────────────────────────────────────

function CenikSection() {
  const ref = useFadeIn();

  return (
    <section
      id="cenik"
      style={{
        backgroundColor: "#FAF8F5",
        padding: "7rem 0",
      }}
    >
      <div
        ref={ref}
        className="fade-in-up"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 3rem",
        }}
      >
        <p className="section-label">Storitve</p>
        <h2 className="section-title">Cenik</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem",
          maxWidth: "700px",
          marginTop: "1rem",
        }}
        className="cenik-grid"
        >
          <div style={{
            backgroundColor: "#EDE4D9",
            padding: "2.5rem",
            borderRadius: "2px",
            position: "relative",
          }}>
            <h3 style={{
              color: "#3D5240",
              fontSize: "1.1rem",
              fontWeight: 400,
              marginBottom: "0.5rem",
              fontFamily: "'Gadugi', 'Trebuchet MS', sans-serif",
            }}>
              Uvodno srečanje
            </h3>
            <p style={{ color: "#7A7A7A", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              50 minut
            </p>
            <p style={{
              fontSize: "2.2rem",
              color: "#3D5240",
              fontWeight: 300,
              fontFamily: "'Gadugi', 'Trebuchet MS', sans-serif",
            }}>
              50 <span style={{ fontSize: "1rem" }}>EUR</span>
            </p>
          </div>

          <div style={{
            backgroundColor: "#3D5240",
            padding: "2.5rem",
            borderRadius: "2px",
          }}>
            <h3 style={{
              color: "#FAF8F5",
              fontSize: "1.1rem",
              fontWeight: 400,
              marginBottom: "0.5rem",
              fontFamily: "'Gadugi', 'Trebuchet MS', sans-serif",
            }}>
              Individualna psihoterapija
            </h3>
            <p style={{ color: "#C8B9A8", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              45 minut
            </p>
            <p style={{
              fontSize: "2.2rem",
              color: "#FAF8F5",
              fontWeight: 300,
              fontFamily: "'Gadugi', 'Trebuchet MS', sans-serif",
            }}>
              50 <span style={{ fontSize: "1rem" }}>EUR</span>
            </p>
          </div>
        </div>

        <p style={{
          marginTop: "2rem",
          color: "#9E8E7A",
          fontSize: "0.85rem",
          lineHeight: 1.7,
          maxWidth: "500px",
        }}>
          * DDV ni obračunan na podlagi 1. odstavka 94. člena Zakona o DDV.<br />
          ** Cene veljajo od 1. 4. 2024.
        </p>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .cenik-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

function FAQSection() {
  const ref = useFadeIn();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Kako vem, da je psihoterapija primerna zame?",
      a: "Psihoterapija je lahko prava izbira, kadar se znajdete v obdobju, ko vas preplavlja tesnoba, stiska, žalost ali da ste obstali na mestu. Morda opažate ponavljajoče težave v odnosih, notranji nemir ali izgubo motivacije, ki vpliva na kvaliteto vašega življenja. Za psihoterapijo se ni treba odločiti šele, ko postane pretežko. Pomemben znak je notranja želja po spremembi, osebni rasti in samoraziskovanju.",
    },
    {
      q: "Kaj pomeni specializant pod supervizijo?",
      a: "Specializant pod supervizijo pomeni, da imam svojo supervizorko ali supervizorja, ki je izkušen in licenciran psihoterapevt/ka, s katerim se redno srečujem in svoje delo strokovno reflektiram in nadgrajujem. Kar posledično pomeni večjo varnost in kakovost dela za klienta.",
    },
    {
      q: "Je na psihoterapiji prisoten še kdo?",
      a: "Ne. Psihoterapija poteka individualno, prisotna sva klient in psihoterapevtka.",
    },
    {
      q: "Ali je vse kar povem zaupno?",
      a: "Seveda. Vse kar se izgovori v psihoterapevtskem procesu je zaupno in varovano v skladu z etičnimi načeli ter strokovnimi standardi. Pri svojem delu občasno govorim s supervizorjem, ki je prav tako zavezan k zaupnosti. Izjema velja v primeru, če obstaja resno tveganje, da bi klient ogrožal življenje ali zdravje sebe ter drugih. V tem primeru sem dolžna ukrepati v skladu z zakonom.",
    },
    {
      q: "Koliko časa traja psihoterapija? Kako hitro mi bo pomagala?",
      a: "Psihoterapija je individualen proces, katerega trajanje je odvisno od posameznika, njegovih potreb, ciljev in motivacije. Psihoterapija je lahko kratkotrajna (nekaj srečanj) ali poglobljena in traja več let.",
    },
  ];

  return (
    <section
      style={{
        backgroundColor: "#EDE4D9",
        padding: "7rem 0",
      }}
    >
      <div
        ref={ref}
        className="fade-in-up"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 3rem",
        }}
      >
        <p className="section-label">Vprašanja</p>
        <h2 className="section-title">Pogosta vprašanja</h2>

        <div style={{ maxWidth: "760px", marginTop: "1rem" }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                borderBottom: "1px solid #C8B9A8",
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  padding: "1.5rem 0",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                  fontFamily: "'Gadugi', 'Trebuchet MS', sans-serif",
                  fontSize: "1rem",
                  color: "#3D5240",
                  fontWeight: 400,
                  lineHeight: 1.5,
                }}
              >
                <span>{faq.q}</span>
                <span style={{
                  flexShrink: 0,
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  border: "1.5px solid #3D5240",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#3D5240",
                  fontSize: "1.1rem",
                  transition: "transform 0.3s ease",
                  transform: openIndex === i ? "rotate(45deg)" : "none",
                }}>
                  +
                </span>
              </button>

              <div style={{
                maxHeight: openIndex === i ? "500px" : "0",
                overflow: "hidden",
                transition: "max-height 0.4s ease",
              }}>
                <p style={{
                  paddingBottom: "1.5rem",
                  lineHeight: 1.85,
                  color: "#3A3A3A",
                  fontFamily: "'Gadugi', 'Trebuchet MS', sans-serif",
                }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Kontakt ──────────────────────────────────────────────────────────────────

function KontaktSection() {
  const ref = useFadeIn();
  const [formData, setFormData] = useState({
    ime: "",
    email: "",
    namen: "",
    sporocilo: "",
    strinjanje: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.strinjanje) {
      alert("Prosim, strinjajte se z obdelavo osebnih podatkov.");
      return;
    }
    setSending(true);
    // Simulate sending
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSubmitted(true);
  };

  const inputStyle = {
    width: "100%",
    padding: "0.9rem 1rem",
    backgroundColor: "#FAF8F5",
    border: "1px solid #C8B9A8",
    borderRadius: "2px",
    fontFamily: "'Gadugi', 'Trebuchet MS', sans-serif",
    fontSize: "0.95rem",
    color: "#3A3A3A",
    outline: "none",
    transition: "border-color 0.3s ease",
    marginTop: "0.4rem",
  };

  const labelStyle = {
    display: "block",
    fontFamily: "'Gadugi', 'Trebuchet MS', sans-serif",
    fontSize: "0.75rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "#7A7A7A",
    marginBottom: "0.2rem",
  };

  return (
    <section
      id="kontakt"
      style={{
        backgroundColor: "#FAF8F5",
        padding: "7rem 0",
      }}
    >
      <div
        ref={ref}
        className="fade-in-up"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 3rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "start",
        }}
      >
        {/* Left: Info */}
        <div>
          <p className="section-label">Stopite v stik</p>
          <h2 className="section-title">Kontakt</h2>

          <p style={{ lineHeight: 1.9, color: "#3A3A3A", marginBottom: "2.5rem" }}>
            Veselim se srečanja z vami. Pišite mi ali pokličite — skupaj bova
            poiskali pravi termin za vas.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <p className="section-label" style={{ marginBottom: "0.3rem" }}>Ambulanta</p>
              <p style={{ color: "#3A3A3A", lineHeight: 1.7 }}>
                Ambulanta Sigmund Freud Inštitut<br />
                Trubarjeva cesta 65<br />
                1000 Ljubljana
              </p>
            </div>

            <div>
              <p className="section-label" style={{ marginBottom: "0.3rem" }}>E-naslov</p>
              <a
                href="mailto:ambulanta@sigmund-freud.si"
                style={{ color: "#3D5240", textDecoration: "none", lineHeight: 1.7 }}
              >
                ambulanta@sigmund-freud.si
              </a>
            </div>

            <div>
              <p className="section-label" style={{ marginBottom: "0.3rem" }}>Telefon</p>
              <a
                href="tel:+38651382484"
                style={{ color: "#3D5240", textDecoration: "none" }}
              >
                051 382 484
              </a>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div>
          {submitted ? (
            <div style={{
              backgroundColor: "#EDE4D9",
              padding: "3rem",
              borderRadius: "2px",
              textAlign: "center",
            }}>
              <div style={{
                width: "3rem",
                height: "3rem",
                borderRadius: "50%",
                backgroundColor: "#3D5240",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
                color: "#FAF8F5",
                fontSize: "1.2rem",
              }}>
                ✓
              </div>
              <h3 style={{ color: "#3D5240", fontSize: "1.3rem", fontWeight: 400, marginBottom: "1rem" }}>
                Sporočilo poslano!
              </h3>
              <p style={{ color: "#3A3A3A", lineHeight: 1.8 }}>
                Hvala za vaše sporočilo. Odgovorila vam bom v najkrajšem možnem času.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label style={labelStyle}>Ime in priimek *</label>
                <input
                  type="text"
                  required
                  value={formData.ime}
                  onChange={(e) => setFormData({ ...formData, ime: e.target.value })}
                  style={inputStyle}
                  placeholder="Vaše ime in priimek"
                />
              </div>

              <div>
                <label style={labelStyle}>E-naslov *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={inputStyle}
                  placeholder="vas@email.com"
                />
              </div>

              <div>
                <label style={labelStyle}>Namen</label>
                <input
                  type="text"
                  value={formData.namen}
                  onChange={(e) => setFormData({ ...formData, namen: e.target.value })}
                  style={inputStyle}
                  placeholder="Namen vašega sporočila"
                />
              </div>

              <div>
                <label style={labelStyle}>Vaše sporočilo *</label>
                <textarea
                  required
                  value={formData.sporocilo}
                  onChange={(e) => setFormData({ ...formData, sporocilo: e.target.value })}
                  rows={5}
                  style={{ ...inputStyle, resize: "vertical" as const }}
                  placeholder="Napišite vaše sporočilo..."
                />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <input
                  type="checkbox"
                  id="strinjanje"
                  checked={formData.strinjanje}
                  onChange={(e) => setFormData({ ...formData, strinjanje: e.target.checked })}
                  style={{
                    marginTop: "3px",
                    width: "16px",
                    height: "16px",
                    accentColor: "#3D5240",
                    flexShrink: 0,
                    cursor: "pointer",
                  }}
                />
                <label
                  htmlFor="strinjanje"
                  style={{
                    fontFamily: "'Gadugi', 'Trebuchet MS', sans-serif",
                    fontSize: "0.85rem",
                    color: "#7A7A7A",
                    lineHeight: 1.6,
                    cursor: "pointer",
                  }}
                >
                  Strinjam se, da se moji podatki shranjujejo in obdelujejo v skladu s
                  politiko zasebnosti.
                </label>
              </div>

              <button
                type="submit"
                disabled={sending}
                className="btn-sage"
                style={{
                  marginTop: "0.5rem",
                  opacity: sending ? 0.7 : 1,
                  width: "fit-content",
                }}
              >
                {sending ? "Pošiljam..." : "Pošlji"}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .kontakt-grid {
            grid-template-columns: 1fr !important;
            padding: 0 1.5rem !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#3D5240",
        padding: "3rem 0",
        color: "#C8B9A8",
      }}
    >
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 3rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1.5rem",
      }}>
        <div>
          <p style={{
            color: "#FAF8F5",
            fontFamily: "'Gadugi', 'Trebuchet MS', sans-serif",
            fontSize: "1rem",
            letterSpacing: "0.08em",
            marginBottom: "0.3rem",
          }}>
            PETRA VAJS
          </p>
          <p style={{
            color: "#9E8E7A",
            fontSize: "0.8rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}>
            Psihoterapija in svetovanje
          </p>
        </div>

        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "0.85rem", color: "#9E8E7A", lineHeight: 1.7 }}>
            Ambulanta Sigmund Freud Inštitut<br />
            Trubarjeva cesta 65, 1000 Ljubljana
          </p>
        </div>

        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: "0.85rem", color: "#9E8E7A" }}>
            © {new Date().getFullYear()} Petra Vajs
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div style={{ fontFamily: "'Gadugi', 'Trebuchet MS', sans-serif" }}>
      <Navigation />
      <HeroSection />
      <PoslanstvoSection />
      <KomuSection />
      <IntegrativnaSection />
      <MojaPotSection />
      <KakoPotekaSection />
      <CenikSection />
      <FAQSection />
      <KontaktSection />
      <Footer />
    </div>
  );
}
