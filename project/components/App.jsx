// App.jsx — Router, Navbar, Footer, FAB, main App shell
// Exports: App, NavBar, Footer, FABWhatsApp to window

const WHATSAPP_NUMBER = '5545999990000';

function openWhatsApp(msg) {
  const text = msg || 'Olá! Vim pelo site da Split House e gostaria de um orçamento.';
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
}

// ── NAV BAR ────────────────────────────────────────────────────────────────
function NavBar({ page, setPage }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: 'Serviços', page: 'servicos' },
    { label: 'Produtos', page: 'produtos' },
    { label: 'Simulador', page: 'simulador' },
    { label: 'Sobre', page: 'sobre' },
    { label: 'Contato', page: 'contato' },
  ];

  const isHome = page === 'home';
  const isDark = !scrolled && isHome;

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    height: 72, display: 'flex', alignItems: 'center',
    background: scrolled || !isHome ? '#fff' : 'transparent',
    boxShadow: scrolled || !isHome ? '0 2px 16px rgba(46,49,146,.10)' : 'none',
    transition: 'background .3s ease, box-shadow .3s ease',
  };

  const linkColor = isDark ? 'rgba(255,255,255,0.8)' : '#6B7280';
  const logoTextColor = isDark ? '#fff' : '#1A1A2E';

  return (
    <nav style={navStyle}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <button onClick={() => { setPage('home'); setMenuOpen(false); }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}>
          <img
            src="assets/logo-only.png"
            alt="Split House"
            style={{ height: 64, width: 'auto', objectFit: 'contain', filter: isDark ? 'brightness(10)' : 'none', transition: 'filter .3s' }}
          />
        </button>

        {/* Desktop nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="nav-links-desktop">
          {navItems.map(item => (
            <button key={item.page} onClick={() => setPage(item.page)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, fontFamily: 'Poppins, sans-serif',
                color: page === item.page ? '#F7941D' : linkColor, transition: 'color .2s',
                padding: '4px 0', borderBottom: page === item.page ? '2px solid #F7941D' : '2px solid transparent' }}>
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => openWhatsApp()}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#25D366', color: '#fff',
              fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600, border: 'none',
              borderRadius: 8, padding: '0 18px', height: 42, cursor: 'pointer', whiteSpace: 'nowrap',
              transition: 'all .2s' }}
            className="nav-cta-btn">
            <WAppIcon size={15} />
            Fale no WhatsApp
          </button>
          {/* Mobile toggle */}
          <button onClick={() => setMenuOpen(v => !v)} className="nav-mobile-toggle"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'none' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={isDark ? '#fff' : '#2E3192'} strokeWidth="2.5">
              {menuOpen ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ position: 'absolute', top: 72, left: 0, right: 0, background: '#fff', boxShadow: '0 8px 24px rgba(46,49,146,.12)', padding: '16px 24px 20px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {navItems.map(item => (
            <button key={item.page} onClick={() => { setPage(item.page); setMenuOpen(false); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 500, fontFamily: 'Poppins, sans-serif',
                color: page === item.page ? '#F7941D' : '#1A1A2E', padding: '10px 0', textAlign: 'left',
                borderBottom: '1px solid #F1F3F6' }}>
              {item.label}
            </button>
          ))}
          <button onClick={() => { openWhatsApp(); setMenuOpen(false); }}
            style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8, background: '#25D366', color: '#fff',
              fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600, border: 'none', borderRadius: 8,
              padding: '12px 18px', cursor: 'pointer' }}>
            <WAppIcon size={17} /> Falar no WhatsApp
          </button>
        </div>
      )}
    </nav>
  );
}

// ── FOOTER ─────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{ background: '#0A0D3A', padding: '72px 0 32px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }} className="footer-grid">
          <div>
            <img src="assets/logo-full.png" alt="Split House" style={{ height: 80, width: 'auto', objectFit: 'contain', marginBottom: 10, filter: 'brightness(10)' }} />
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', lineHeight: 1.7, maxWidth: 260, marginBottom: 18 }}>
              Mais de 13 anos instalando e mantendo sistemas de ar condicionado em Cascavel e região do Paraná.
            </p>
            <button onClick={() => openWhatsApp()}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25D366', color: '#fff',
                fontFamily: 'Poppins,sans-serif', fontSize: 13, fontWeight: 600, border: 'none', borderRadius: 8, padding: '9px 18px', cursor: 'pointer' }}>
              <WAppIcon size={14} /> (45) 9 9999-0000
            </button>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,.35)', marginBottom: 18 }}>Serviços</div>
            {['Instalação', 'Manutenção', 'Revenda', 'Sistemas VRF'].map(s => (
              <button key={s} onClick={() => setPage('servicos')} style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,.55)', marginBottom: 10, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Poppins,sans-serif', padding: 0, textAlign: 'left', transition: 'color .2s' }} className="footer-link">{s}</button>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,.35)', marginBottom: 18 }}>Produtos</div>
            {['Split Hi-Wall', 'Cassete', 'Piso Teto', 'VRF / Mini VRF', 'Splitão'].map(p => (
              <button key={p} onClick={() => setPage('produtos')} style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,.55)', marginBottom: 10, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Poppins,sans-serif', padding: 0, textAlign: 'left' }} className="footer-link">{p}</button>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,.35)', marginBottom: 18 }}>Contato</div>
            {[
              { icon: '📍', text: 'Cascavel, Paraná, Brasil' },
              { icon: '⏰', text: 'Seg – Sáb: 8h às 18h' },
              { icon: '📞', text: '(45) 9 9999-0000' },
            ].map(c => (
              <div key={c.text} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'rgba(255,255,255,.55)', marginBottom: 10 }}>
                <span style={{ fontSize: 12, marginTop: 1 }}>{c.icon}</span>{c.text}
              </div>
            ))}
            <div style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 999, padding: '4px 12px', fontSize: 11, color: 'rgba(255,255,255,.4)' }}>
              Cascavel e região
            </div>
          </div>
        </div>
        <div style={{ height: 1, background: 'rgba(255,255,255,.07)', marginBottom: 28 }}></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,.25)' }}>© 2026 Split House. Todos os direitos reservados.</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,.25)' }}>Cascavel – PR · Climatização com qualidade</p>
        </div>
      </div>
    </footer>
  );
}

// ── FAB WhatsApp ────────────────────────────────────────────────────────────
function FABWhatsApp() {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
      {hovered && (
        <div style={{ background: '#1A1A2E', color: '#fff', fontSize: 12, fontWeight: 600, padding: '6px 12px', borderRadius: 8, whiteSpace: 'nowrap', boxShadow: '0 4px 16px rgba(0,0,0,.2)' }}>
          Fale no WhatsApp
        </div>
      )}
      <button onClick={() => openWhatsApp()}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        style={{ width: 58, height: 58, borderRadius: 999, background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(37,211,102,.4)', border: 'none', cursor: 'pointer',
          transform: hovered ? 'scale(1.1)' : 'scale(1)', transition: 'transform .2s, box-shadow .2s',
          boxShadow: hovered ? '0 6px 30px rgba(37,211,102,.6)' : '0 4px 24px rgba(37,211,102,.4)' }}>
        <WAppIcon size={26} color="#fff" />
      </button>
    </div>
  );
}

// ── WhatsApp icon SVG ───────────────────────────────────────────────────────
function WAppIcon({ size = 18, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
      <path d="M11.99 2C6.476 2 2 6.477 2 11.99c0 1.96.57 3.785 1.547 5.32L2 22l4.832-1.525A9.944 9.944 0 0011.99 22C17.514 22 22 17.523 22 11.99 22 6.477 17.514 2 11.99 2z" fill="none" stroke={color} strokeWidth="1.5"/>
    </svg>
  );
}

// ── SECTION HEADER ──────────────────────────────────────────────────────────
function SectionHeader({ label, title, subtitle, light = false }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 56 }}>
      <span style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#F7941D', marginBottom: 10 }}>{label}</span>
      <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.5rem)', fontWeight: 800, color: light ? '#fff' : '#1A1A2E', letterSpacing: '-0.03em', marginBottom: 14 }}>{title}</h2>
      {subtitle && <p style={{ fontSize: '1rem', color: light ? 'rgba(255,255,255,.6)' : '#6B7280', lineHeight: 1.7, maxWidth: 520, marginInline: 'auto' }}>{subtitle}</p>}
      <span style={{ display: 'block', width: 40, height: 4, background: '#F7941D', borderRadius: 999, margin: '12px auto 0' }}></span>
    </div>
  );
}

// ── BTN STYLES ──────────────────────────────────────────────────────────────
function BtnPrimary({ children, onClick, style = {} }) {
  const [hov, setHov] = React.useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#F7941D', color: '#fff', fontFamily: 'Poppins,sans-serif', fontSize: 15, fontWeight: 700, border: 'none', borderRadius: 8, padding: '0 28px', height: 52, cursor: 'pointer', boxShadow: hov ? '0 8px 32px rgba(247,148,29,.45)' : '0 4px 20px rgba(247,148,29,.35)', transform: hov ? 'translateY(-2px)' : 'none', transition: 'all .2s', ...style }}>
      {children}
    </button>
  );
}

function BtnWhatsApp({ children, onClick, style = {} }) {
  const [hov, setHov] = React.useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25D366', color: '#fff', fontFamily: 'Poppins,sans-serif', fontSize: 15, fontWeight: 700, border: 'none', borderRadius: 8, padding: '0 28px', height: 52, cursor: 'pointer', boxShadow: hov ? '0 8px 28px rgba(37,211,102,.5)' : '0 4px 20px rgba(37,211,102,.35)', transform: hov ? 'translateY(-2px)' : 'none', transition: 'all .2s', ...style }}>
      {children}
    </button>
  );
}

// ── MAIN APP ────────────────────────────────────────────────────────────────
function App() {
  const [page, setPage] = React.useState('home');
  const [productCategory, setProductCategory] = React.useState(null);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const { tweaks } = window.__tweaksCtx || {};

  const navigate = (p, extra) => {
    setPage(p);
    if (extra?.category) setProductCategory(extra.category);
    if (extra?.product) setSelectedProduct(extra.product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ fontFamily: 'Poppins, sans-serif', color: '#1A1A2E', minHeight: '100vh' }}>
      <NavBar page={page} setPage={navigate} />
      <div style={{ paddingTop: page === 'home' ? 0 : 72 }}>
        {page === 'home' && <HomePage navigate={navigate} />}
        {page === 'produtos' && <ProdutosPage navigate={navigate} />}
        {page === 'categoria' && <CategoriaPage navigate={navigate} category={productCategory} />}
        {page === 'produto' && <ProdutoPage navigate={navigate} product={selectedProduct} />}
        {page === 'servicos' && <ServicosPage navigate={navigate} />}
        {page === 'simulador' && <SimuladorPage navigate={navigate} standalone />}
        {page === 'sobre' && <SobrePage navigate={navigate} />}
        {page === 'contato' && <ContatoPage navigate={navigate} />}
      </div>
      <Footer setPage={navigate} />
      <FABWhatsApp />
    </div>
  );
}

// Export everything
Object.assign(window, { App, NavBar, Footer, FABWhatsApp, WAppIcon, SectionHeader, BtnPrimary, BtnWhatsApp, openWhatsApp });
