// HomePage.jsx — All home sections
// Exports: HomePage, SimuladorPage to window

// ── MASCOT ──────────────────────────────────────────────────────────────────
function MascotAvatar({ size = 340 }) {
  const [status, setStatus] = React.useState('loading'); // 'loading' | 'ok' | 'error'
  const imgRef = React.useRef(null);

  React.useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete && img.naturalWidth > 0) {
      setStatus('ok');
    } else if (img.complete && img.naturalWidth === 0) {
      setStatus('error');
    }
  }, []);

  return (
    <div style={{ position: 'relative', width: size, maxWidth: '100%' }}>
      <img
        ref={imgRef}
        src="assets/mascot.png"
        alt="Técnico Split House"
        onLoad={() => setStatus('ok')}
        onError={() => setStatus('error')}
        style={{ width: '100%', height: 'auto', display: status === 'ok' ? 'block' : 'none', objectFit: 'contain' }}
      />
      {status !== 'ok' && <MascotSVG size={size} />}
    </div>
  );
}

function MascotSVG({ size = 340 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 340 380" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body — AC unit shape */}
      <rect x="80" y="100" width="180" height="110" rx="18" fill="#2E3192" />
      <rect x="80" y="100" width="180" height="110" rx="18" stroke="#1C1F6E" strokeWidth="3" />
      {/* AC display screen */}
      <rect x="96" y="114" width="110" height="62" rx="8" fill="#1C1F6E" />
      <rect x="96" y="114" width="110" height="62" rx="8" fill="url(#screenGrad)" />
      {/* Temperature display */}
      <text x="151" y="157" textAnchor="middle" fill="white" fontSize="28" fontWeight="800" fontFamily="Poppins, sans-serif">22°</text>
      {/* Face eyes on screen */}
      <circle cx="120" cy="135" r="7" fill="#29ABE2" />
      <circle cx="182" cy="135" r="7" fill="#29ABE2" />
      <circle cx="123" cy="133" r="3" fill="white" />
      <circle cx="185" cy="133" r="3" fill="white" />
      {/* Smile */}
      <path d="M130 150 Q151 162 172 150" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* AC controls right side */}
      <circle cx="230" cy="130" r="8" fill="#F7941D" />
      <circle cx="248" cy="130" r="8" fill="rgba(255,255,255,.15)" />
      <circle cx="230" cy="150" r="8" fill="rgba(255,255,255,.15)" />
      <circle cx="248" cy="150" r="8" fill="rgba(255,255,255,.15)" />
      {/* Vents bottom */}
      <rect x="96" y="186" width="148" height="6" rx="3" fill="rgba(255,255,255,.15)" />
      <rect x="96" y="196" width="148" height="4" rx="2" fill="rgba(255,255,255,.1)" />
      {/* Legs */}
      <rect x="110" y="210" width="28" height="70" rx="14" fill="#2E3192" />
      <rect x="202" y="210" width="28" height="70" rx="14" fill="#2E3192" />
      {/* Shoes */}
      <ellipse cx="124" cy="282" rx="28" ry="12" fill="#1C1F6E" />
      <ellipse cx="216" cy="282" rx="28" ry="12" fill="#1C1F6E" />
      {/* Left arm holding wrench */}
      <rect x="38" y="118" width="48" height="22" rx="11" fill="#2E3192" transform="rotate(30 38 118)" />
      {/* Wrench */}
      <g transform="translate(14,138) rotate(35)">
        <rect x="0" y="0" width="8" height="38" rx="4" fill="#F7941D" />
        <ellipse cx="4" cy="0" rx="10" ry="8" fill="none" stroke="#F7941D" strokeWidth="3.5" />
        <ellipse cx="4" cy="38" rx="8" ry="6" fill="none" stroke="#F7941D" strokeWidth="3" />
      </g>
      {/* Right arm */}
      <rect x="254" y="118" width="48" height="22" rx="11" fill="#2E3192" transform="rotate(-30 302 118)" />
      {/* Thermometer in right hand */}
      <g transform="translate(282,132) rotate(-20)">
        <rect x="0" y="0" width="7" height="32" rx="3.5" fill="rgba(255,255,255,.25)" stroke="rgba(255,255,255,.5)" strokeWidth="1" />
        <rect x="1.5" y="16" width="4" height="15" rx="2" fill="#F7941D" />
        <circle cx="3.5" cy="32" r="5" fill="#F7941D" />
      </g>
      {/* Snowflakes floating */}
      <g opacity=".7">
        <path d="M52 76 v14 M45 83 h14 M47 78 l10 10 M57 78 l-10 10" stroke="#29ABE2" strokeWidth="2" strokeLinecap="round" />
        <circle cx="59" cy="83" r="2.5" fill="#29ABE2" />
        <circle cx="45" cy="83" r="2.5" fill="#29ABE2" />
      </g>
      <g opacity=".5" transform="translate(268,54)">
        <path d="M8 0 v16 M0 8 h16 M2 2 l12 12 M14 2 l-12 12" stroke="#29ABE2" strokeWidth="2" strokeLinecap="round" />
        <circle cx="16" cy="8" r="2" fill="#29ABE2" />
        <circle cx="0" cy="8" r="2" fill="#29ABE2" />
      </g>
      <g opacity=".4" transform="translate(292,100)">
        <path d="M5 0 v10 M0 5 h10 M1 1 l8 8 M9 1 l-8 8" stroke="#29ABE2" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      {/* Hard hat */}
      <ellipse cx="170" cy="100" rx="56" ry="14" fill="#F7941D" />
      <path d="M114 100 Q114 68 170 68 Q226 68 226 100" fill="#F7941D" />
      <path d="M114 100 Q114 68 170 68 Q226 68 226 100" fill="none" stroke="#E07A08" strokeWidth="2" />
      {/* Hat brim detail */}
      <rect x="108" y="97" width="124" height="8" rx="4" fill="#E07A08" />
      {/* Split House badge on hat */}
      <rect x="148" y="80" width="44" height="14" rx="4" fill="white" opacity=".9" />
      <text x="170" y="91" textAnchor="middle" fill="#2E3192" fontSize="8" fontWeight="800" fontFamily="Poppins, sans-serif">SPLIT HOUSE</text>
      {/* Air flow lines */}
      <path d="M170 215 Q155 230 145 245" stroke="#29ABE2" strokeWidth="2" strokeDasharray="4 3" strokeLinecap="round" opacity=".5" />
      <path d="M170 218 Q170 235 170 250" stroke="#29ABE2" strokeWidth="2" strokeDasharray="4 3" strokeLinecap="round" opacity=".35" />
      <path d="M170 215 Q185 230 195 245" stroke="#29ABE2" strokeWidth="2" strokeDasharray="4 3" strokeLinecap="round" opacity=".5" />
      <defs>
        <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#29ABE2" stopOpacity=".25" />
          <stop offset="100%" stopColor="#2E3192" stopOpacity=".0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── HERO ────────────────────────────────────────────────────────────────────
function HeroSection({ navigate }) {
  const stats = [
    { num: '13+', label: 'Anos de experiência' },
    { num: '500+', label: 'Clientes atendidos' },
    { num: '100%', label: 'Atendimento direto' },
  ];
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      background: 'linear-gradient(140deg,#0A0D3A 0%,#1C1F6E 40%,#2E3192 70%,#3a4bb0 100%)',
      position: 'relative', overflow: 'hidden', paddingTop: 72
    }}>
      {/* Grid overlay */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }}></div>
      {/* Radial glow behind mascot */}
      <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: '45%', height: '80%', background: 'radial-gradient(ellipse 80% 70% at 60% 50%,rgba(41,171,226,.18) 0%,transparent 70%)', pointerEvents: 'none' }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, padding: '80px 24px' }}>
        {/* Content */}
        <div style={{ maxWidth: 580, flex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(247,148,29,.15)', border: '1px solid rgba(247,148,29,.3)', color: '#F7941D', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '5px 14px', borderRadius: 999, marginBottom: 24 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Cascavel e região do Paraná
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem,4.5vw,3.6rem)', fontWeight: 800, color: '#fff', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: 20, textWrap: 'balance' }}>
            Instalação e Manutenção de Ar Condicionado<br /><span style={{ color: '#F7941D' }}>Sem Complicação</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,.7)', lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
            Atendimento em Cascavel e região • +13 anos de experiência • Você fala direto com quem executa o serviço.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 52 }}>
            <BtnWhatsApp onClick={() => openWhatsApp()}>
              <WAppIcon size={18} /> Falar no WhatsApp
            </BtnWhatsApp>
            <button onClick={() => navigate('simulador')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.1)', color: '#fff', fontFamily: 'Poppins,sans-serif', fontSize: 15, fontWeight: 600, border: '1.5px solid rgba(255,255,255,.25)', borderRadius: 8, padding: '0 24px', height: 52, cursor: 'pointer', backdropFilter: 'blur(8px)', transition: 'all .2s' }}>
              Simular BTU grátis
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
          <div style={{ display: 'flex', gap: 36 }}>
            {stats.map(s => (
              <HeroStat key={s.label} val={s.num} label={s.label} />
            ))}
          </div>
        </div>

        {/* Mascot */}
        <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="hero-visual">
          <div style={{ position: 'relative' }}>
            {/* Glow circle behind mascot */}
            <div style={{ position: 'absolute', inset: '-20%', borderRadius: '50%', background: 'radial-gradient(circle,rgba(41,171,226,.2) 0%,transparent 70%)', pointerEvents: 'none' }}></div>
            <MascotAvatar size={320} />
            {/* Floating badge */}
            <div style={{ position: 'absolute', bottom: 40, left: -24, background: '#fff', borderRadius: 12, padding: '10px 16px', boxShadow: '0 8px 24px rgba(0,0,0,.2)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#1A1A2E' }}>Serviço garantido</div>
                <div style={{ fontSize: 11, color: '#6B7280' }}>Qualidade verificada</div>
              </div>
            </div>
            <div style={{ position: 'absolute', top: 20, right: -20, background: '#F7941D', borderRadius: 12, padding: '8px 14px', boxShadow: '0 4px 16px rgba(247,148,29,.4)' }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>13+</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,.85)' }}>anos</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroStat({ val, label }) {
  const num = val.replace(/[^0-9]/g, '');
  const suffix = val.replace(/[0-9]/g, '');
  return (
    <div>
      <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>
        {num}<span style={{ color: '#F7941D' }}>{suffix}</span>
      </div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,.55)', marginTop: 2 }}>{label}</div>
    </div>
  );
}

function ACMockup() {
  const [temp, setTemp] = React.useState(22);
  const [mode, setMode] = React.useState('frio');
  return (
    <div style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 20, padding: 32, backdropFilter: 'blur(12px)', position: 'relative' }}>
      <div style={{ background: 'rgba(46,49,146,.6)', borderRadius: 12, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, border: '1px solid rgba(255,255,255,.1)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,transparent 0%,rgba(41,171,226,.2) 100%)' }}></div>
        <div style={{ fontSize: 64, fontWeight: 800, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1, position: 'relative' }}>
          {temp}<sup style={{ fontSize: 28, fontWeight: 600, verticalAlign: 'super' }}>°C</sup>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
        {[
          { label: 'Frio', id: 'frio' }, { label: 'Calor', id: 'calor' }, { label: 'Vent.', id: 'vent' }
        ].map(m => (
          <button key={m.id} onClick={() => setMode(m.id)}
            style={{ background: mode === m.id ? 'rgba(247,148,29,.2)' : 'rgba(255,255,255,.08)', border: `1px solid ${mode === m.id ? 'rgba(247,148,29,.4)' : 'rgba(255,255,255,.12)'}`, borderRadius: 8, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 500, color: mode === m.id ? '#F7941D' : 'rgba(255,255,255,.7)', cursor: 'pointer', fontFamily: 'Poppins,sans-serif', transition: 'all .2s' }}>
            {m.label}
          </button>
        ))}
        <button onClick={() => setTemp(t => Math.max(16, t - 1))}
          style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 8, height: 40, color: 'rgba(255,255,255,.7)', cursor: 'pointer', fontSize: 20, fontFamily: 'Poppins,sans-serif' }}>−</button>
        <div style={{ background: 'rgba(247,148,29,.2)', border: '1px solid rgba(247,148,29,.4)', borderRadius: 8, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#F7941D' }}>{temp}°</div>
        <button onClick={() => setTemp(t => Math.min(30, t + 1))}
          style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 8, height: 40, color: 'rgba(255,255,255,.7)', cursor: 'pointer', fontSize: 20, fontFamily: 'Poppins,sans-serif' }}>+</button>
      </div>
      <div style={{ position: 'absolute', top: -14, right: 20, background: 'rgba(37,211,102,.15)', border: '1px solid rgba(37,211,102,.3)', borderRadius: 999, padding: '5px 12px', fontSize: 11, fontWeight: 600, color: '#4ade80', display: 'flex', alignItems: 'center', gap: 5 }}>
        <span style={{ width: 7, height: 7, background: '#4ade80', borderRadius: '50%' }}></span>
        Sistema ligado
      </div>
    </div>
  );
}

// ── CUSTOM HVAC ICONS ────────────────────────────────────────────────────────
function InstalacaoIcon({ color = '#2E3192' }) {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      {/* AC unit body */}
      <rect x="2" y="8" width="22" height="14" rx="3" stroke={color} strokeWidth="2" fill="none"/>
      {/* Grill slots */}
      <line x1="6" y1="12" x2="6" y2="18" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="10" y1="12" x2="10" y2="18" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="14" y1="12" x2="14" y2="18" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      {/* Control dot */}
      <circle cx="19.5" cy="15" r="2" fill={color} opacity=".6"/>
      {/* Mounting bolts top */}
      <circle cx="6" cy="8" r="2" fill={color}/>
      <circle cx="18" cy="8" r="2" fill={color}/>
      {/* Lightning bolt — installation/energy */}
      <path d="M28 5 L24 15 L27 15 L23 27" stroke="#F7941D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ManutencaoIcon({ color = '#2E3192' }) {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      {/* AC unit small */}
      <rect x="2" y="6" width="18" height="11" rx="2.5" stroke={color} strokeWidth="1.8" fill="none"/>
      <line x1="5.5" y1="9.5" x2="5.5" y2="14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="8.5" y1="9.5" x2="8.5" y2="14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="11.5" y1="9.5" x2="11.5" y2="14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="15.5" cy="11.5" r="1.5" fill={color} opacity=".5"/>
      {/* Air flow lines */}
      <path d="M3 20 Q8 18 13 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity=".5"/>
      <path d="M3 23 Q8 21 11 23" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity=".3"/>
      {/* Wrench */}
      <g transform="translate(16, 14) rotate(-40)">
        <rect x="1.5" y="0" width="4" height="16" rx="2" fill="#F7941D"/>
        <path d="M0 1.5 Q3.5 -3 7 1.5 Q5 3 3.5 3 Q2 3 0 1.5Z" fill="#F7941D"/>
        <path d="M0.5 14.5 Q3.5 18.5 6.5 14.5 Q5 13 3.5 13 Q2 13 0.5 14.5Z" fill="#F7941D"/>
      </g>
    </svg>
  );
}

function RevendaIcon({ color = '#2E3192' }) {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      {/* Box */}
      <path d="M4 12 L16 6 L28 12 L28 26 L4 26 Z" stroke={color} strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
      <line x1="4" y1="12" x2="28" y2="12" stroke={color} strokeWidth="1.5"/>
      <line x1="16" y1="6" x2="16" y2="12" stroke={color} strokeWidth="1.5"/>
      {/* AC unit inside box */}
      <rect x="9" y="15" width="14" height="8" rx="2" fill={color} fillOpacity=".15" stroke={color} strokeWidth="1.5"/>
      <line x1="11.5" y1="17" x2="11.5" y2="20.5" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="14" y1="17" x2="14" y2="20.5" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="20" cy="18.5" r="1.2" fill={color} opacity=".5"/>
      {/* Price star tag */}
      <circle cx="27" cy="5" r="4.5" fill="#F7941D"/>
      <text x="27" y="8.5" textAnchor="middle" fill="white" fontSize="6.5" fontWeight="800" fontFamily="sans-serif">$</text>
    </svg>
  );
}

function MiniVRFIcon({ color = '#2E3192' }) {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      {/* Central outdoor unit */}
      <rect x="11" y="18" width="10" height="10" rx="2" stroke={color} strokeWidth="1.8" fill="none"/>
      <circle cx="16" cy="23" r="3" stroke={color} strokeWidth="1.5" fill="none"/>
      <circle cx="16" cy="23" r="1" fill={color}/>
      {/* Pipe left */}
      <line x1="11" y1="20" x2="5" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="11" y1="24" x2="5" y2="24" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Pipe right */}
      <line x1="21" y1="20" x2="27" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="21" y1="24" x2="27" y2="24" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Pipe top */}
      <line x1="16" y1="18" x2="16" y2="12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Indoor unit left */}
      <rect x="1" y="11" width="9" height="6" rx="1.5" stroke={color} strokeWidth="1.5" fill={color} fillOpacity=".1"/>
      <line x1="3" y1="13" x2="3" y2="15" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="5" y1="13" x2="5" y2="15" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      {/* Indoor unit right */}
      <rect x="22" y="11" width="9" height="6" rx="1.5" stroke={color} strokeWidth="1.5" fill={color} fillOpacity=".1"/>
      <line x1="24" y1="13" x2="24" y2="15" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="26" y1="13" x2="26" y2="15" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      {/* Indoor unit top */}
      <rect x="11.5" y="4" width="9" height="6" rx="1.5" stroke="#F7941D" strokeWidth="1.5" fill="#F7941D" fillOpacity=".1"/>
      <line x1="13.5" y1="6" x2="13.5" y2="8" stroke="#F7941D" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="15.5" y1="6" x2="15.5" y2="8" stroke="#F7941D" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

// ── SOCIAL PROOF / STATS ────────────────────────────────────────────────────
function StatsSection() {
  const items = [
    { num: '13', suffix: '+', label: 'Anos de experiência' },
    { num: '500', suffix: '+', label: 'Serviços realizados' },
    { num: '6', suffix: '', label: 'Tipos de equipamentos' },
    { num: '100', suffix: '%', label: 'Atendimento direto' },
  ];
  return (
    <section style={{ background: '#13165C', padding: '72px 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2 }} className="stats-grid-4">
          {items.map((s, i) => (
            <div key={s.label} style={{ textAlign: 'center', padding: '32px 16px', borderRight: i < 3 ? '1px solid rgba(255,255,255,.08)' : 'none' }}>
              <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>
                {s.num}<span style={{ color: '#F7941D' }}>{s.suffix}</span>
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', marginTop: 6, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SERVICES ────────────────────────────────────────────────────────────────
function ServicesSection({ navigate }) {
  const services = [
    { icon: <InstalacaoIcon />, title: 'Instalação', desc: 'Instalação profissional de splits residenciais e comerciais com garantia total do serviço.' },
    { icon: <ManutencaoIcon />, title: 'Manutenção', desc: 'Preventiva e corretiva. Limpeza, higienização e revisão completa para máxima eficiência.' },
    { icon: <RevendaIcon />, title: 'Revenda', desc: 'Venda e distribuição de equipamentos das melhores marcas com preço de distribuidor.' },
    { icon: <MiniVRFIcon />, title: 'Mini VRF', desc: 'Instalação de sistemas multi-split Mini VRF para escritórios, lojas e edifícios comerciais.' },
  ];
  return (
    <section style={{ background: '#F8F9FB', padding: '96px 0' }}>
      <div className="container">
        <SectionHeader label="O que fazemos" title="Serviços completos em climatização" subtitle="Do residencial ao industrial — atendimento direto com o profissional, garantia em todos os serviços." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }} className="services-grid-4">
          {services.map(s => <ServiceCard key={s.title} service={s} onClick={() => navigate('servicos')} />)}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, onClick }) {
  const [hov, setHov] = React.useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={onClick}
      style={{ background: '#fff', borderRadius: 12, padding: '28px 22px', boxShadow: hov ? '0 8px 32px rgba(46,49,146,.14)' : '0 2px 12px rgba(46,49,146,.08)', transform: hov ? 'translateY(-3px)' : 'none', border: `1.5px solid ${hov ? '#EEF0FC' : 'transparent'}`, transition: 'all .25s', cursor: 'pointer' }}>
      <div style={{ width: 52, height: 52, borderRadius: 12, background: hov ? '#2E3192' : '#EEF0FC', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, transition: 'background .2s' }}>
        {React.cloneElement(service.icon, { color: hov ? '#fff' : '#2E3192' })}
      </div>
      <div style={{ width: 32, height: 3, background: '#F7941D', borderRadius: 999, marginBottom: 12 }}></div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1A1A2E', marginBottom: 8 }}>{service.title}</h3>
      <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>{service.desc}</p>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: hov ? 8 : 4, fontSize: 13, fontWeight: 600, color: '#2E3192', marginTop: 14, transition: 'gap .2s' }}>
        Saiba mais <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
    </div>
  );
}

// ── BTU SIMULATOR ────────────────────────────────────────────────────────────
function calcBTU(area, height, people, solar, electronics) {
  const a = parseFloat(area) || 0;
  const h = parseFloat(height) || 2.7;
  const p = parseInt(people) || 1;
  let base = a * 600;
  // height factor
  const hf = h <= 2.4 ? 0.9 : h <= 2.8 ? 1.0 : h <= 3.2 ? 1.1 : 1.2;
  base *= hf;
  // solar
  const sf = { baixa: 0.85, media: 1.0, alta: 1.15 }[solar] || 1.0;
  base *= sf;
  // people
  base += Math.max(0, p - 1) * 600;
  // electronics
  const ef = { nenhum: 0, poucos: 800, muitos: 1600 }[electronics] || 0;
  base += ef;
  // round to standard
  const standards = [7500, 9000, 12000, 18000, 24000, 30000, 36000, 48000, 60000];
  const ideal = standards.find(b => b >= base) || 60000;
  const idx = standards.indexOf(ideal);
  const range = [ideal, standards[Math.min(idx + 1, standards.length - 1)]];
  return { btu: ideal, range, raw: Math.round(base) };
}

function SimuladorSection({ navigate, standalone = false }) {
  const [form, setForm] = React.useState({ area: '', height: '2.7', people: '1', solar: 'media', electronics: 'poucos' });
  const [result, setResult] = React.useState(null);
  const [submitted, setSubmitted] = React.useState(false);

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setSubmitted(false); setResult(null); };

  const calculate = () => {
    if (!form.area) return;
    const r = calcBTU(form.area, form.height, form.people, form.solar, form.electronics);
    setResult(r);
    setSubmitted(true);
  };

  const solarLabels = { baixa: 'Baixa (sombra/norte)', media: 'Média (meia-sombra)', alta: 'Alta (sol direto)' };
  const elecLabels = { nenhum: 'Nenhum', poucos: 'Poucos (TV, notebook)', muitos: 'Muitos (servidores, etc.)' };

  const wappMsg = result ? `Olá, fiz uma simulação no site e gostaria de um orçamento.\n\nAmbiente:\n- Área: ${form.area}m²\n- Altura: ${form.height}m\n- Pessoas: ${form.people}\n- Sol: ${solarLabels[form.solar]}\n- Equipamentos: ${elecLabels[form.electronics]}\n\nResultado sugerido: ${result.btu.toLocaleString('pt-BR')} BTUs\n\nPode me ajudar com um orçamento?` : '';

  const inputStyle = { width: '100%', padding: '12px 14px', fontFamily: 'Poppins,sans-serif', fontSize: 14, border: '1.5px solid #D1D5DB', borderRadius: 8, outline: 'none', color: '#1A1A2E', background: '#fff', transition: 'border-color .2s' };
  const labelStyle = { display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 };

  return (
    <section style={{ background: standalone ? '#F8F9FB' : '#fff', padding: '96px 0' }} id="simulador">
      <div className="container">
        <SectionHeader label="Calculadora" title="Simulador de BTU" subtitle="Descubra a capacidade ideal para o seu ambiente e receba um orçamento personalizado." />

        <div style={{ maxWidth: 780, marginInline: 'auto' }}>
          <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(46,49,146,.10)', overflow: 'hidden', border: '1px solid #E5E7EB' }}>
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg,#1C1F6E,#2E3192)', padding: '24px 32px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Calculadora de BTU</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.6)' }}>Preencha os dados do seu ambiente</div>
              </div>
            </div>

            {/* Form */}
            <div style={{ padding: '32px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="sim-grid">
                <div>
                  <label style={labelStyle}>Área do ambiente (m²) *</label>
                  <input type="number" placeholder="Ex: 20" value={form.area} onChange={e => set('area', e.target.value)}
                    style={{ ...inputStyle, borderColor: !form.area && submitted ? '#DC2626' : '#D1D5DB' }} min="1" max="500" />
                  {!form.area && submitted && <span style={{ fontSize: 11, color: '#DC2626', marginTop: 4, display: 'block' }}>Informe a área</span>}
                </div>
                <div>
                  <label style={labelStyle}>Altura do teto (m)</label>
                  <input type="number" placeholder="Ex: 2.7" value={form.height} onChange={e => set('height', e.target.value)}
                    style={inputStyle} min="2" max="6" step="0.1" />
                </div>
                <div>
                  <label style={labelStyle}>Número de pessoas</label>
                  <input type="number" placeholder="Ex: 2" value={form.people} onChange={e => set('people', e.target.value)}
                    style={inputStyle} min="1" max="50" />
                </div>
                <div>
                  <label style={labelStyle}>Incidência solar</label>
                  <select value={form.solar} onChange={e => set('solar', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                    {Object.entries(solarLabels).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </div>
                <div style={{ gridColumn: '1/-1' }}>
                  <label style={labelStyle}>Equipamentos eletrônicos no ambiente</label>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {Object.entries(elecLabels).map(([v, l]) => (
                      <button key={v} onClick={() => set('electronics', v)}
                        style={{ flex: 1, minWidth: 120, padding: '10px 12px', borderRadius: 8, border: `1.5px solid ${form.electronics === v ? '#2E3192' : '#D1D5DB'}`, background: form.electronics === v ? '#EEF0FC' : '#fff', color: form.electronics === v ? '#2E3192' : '#6B7280', fontSize: 13, fontWeight: form.electronics === v ? 600 : 400, fontFamily: 'Poppins,sans-serif', cursor: 'pointer', transition: 'all .2s', textAlign: 'center' }}>
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button onClick={calculate}
                style={{ width: '100%', marginTop: 24, height: 52, background: '#2E3192', color: '#fff', fontFamily: 'Poppins,sans-serif', fontSize: 15, fontWeight: 700, border: 'none', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all .2s' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                Calcular BTU recomendado
              </button>

              {/* Result */}
              {result && (
                <div style={{ marginTop: 24, background: 'linear-gradient(135deg,#EEF0FC,#D4D8F7)', borderRadius: 12, padding: 24, border: '1.5px solid #A9B1EF' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: '#2E3192', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#2E3192' }}>Resultado da simulação</div>
                  </div>
                  <div style={{ display: 'flex', gap: 24, marginBottom: 16 }} className="result-stats">
                    <div style={{ flex: 1, background: '#fff', borderRadius: 10, padding: '16px 20px', textAlign: 'center', boxShadow: '0 2px 8px rgba(46,49,146,.08)' }}>
                      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6B7280', marginBottom: 4 }}>BTU recomendado</div>
                      <div style={{ fontSize: '2rem', fontWeight: 800, color: '#2E3192', letterSpacing: '-0.03em' }}>{result.btu.toLocaleString('pt-BR')}</div>
                      <div style={{ fontSize: 12, color: '#6B7280' }}>BTU/h</div>
                    </div>
                    <div style={{ flex: 1, background: '#fff', borderRadius: 10, padding: '16px 20px', textAlign: 'center', boxShadow: '0 2px 8px rgba(46,49,146,.08)' }}>
                      <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6B7280', marginBottom: 4 }}>Faixa sugerida</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1A1A2E', letterSpacing: '-0.02em' }}>{result.range[0].toLocaleString('pt-BR')}–{result.range[1].toLocaleString('pt-BR')}</div>
                      <div style={{ fontSize: 12, color: '#6B7280' }}>BTU/h</div>
                    </div>
                  </div>
                  <div style={{ background: 'rgba(247,148,29,.1)', border: '1px solid rgba(247,148,29,.3)', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: '#9F4B04', marginBottom: 16 }}>
                    Este valor é uma estimativa. O orçamento pode variar após análise no local.
                  </div>
                  <BtnWhatsApp onClick={() => openWhatsApp(wappMsg)} style={{ width: '100%', justifyContent: 'center', fontSize: 14 }}>
                    <WAppIcon size={17} />
                    Solicitar orçamento com base nesse cálculo
                  </BtnWhatsApp>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Standalone page wrapper
function SimuladorPage({ navigate }) {
  return (
    <div>
      <div style={{ background: 'linear-gradient(135deg,#1C1F6E,#2E3192)', padding: '48px 0 32px' }}>
        <div className="container">
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#F7941D' }}>Ferramenta gratuita</span>
          <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, color: '#fff', marginTop: 8 }}>Simulador de BTU</h1>
        </div>
      </div>
      <SimuladorSection navigate={navigate} standalone />
    </div>
  );
}

// ── DIAGNOSTIC ───────────────────────────────────────────────────────────────
function DiagnosticSection() {
  const [selected, setSelected] = React.useState(null);
  const problems = [
    {
      id: 'gelando', label: 'Não está gelando', icon: '🧊',
      causes: ['Gás refrigerante baixo ou vazio — precisa de recarga', 'Filtros sujos bloqueando a circulação de ar', 'Evaporador ou condensador com acúmulo de sujeira', 'Problema no compressor ou no termostato'],
    },
    {
      id: 'agua', label: 'Vazando água', icon: '💧',
      causes: ['Dreno de condensado entupido ou dobrado', 'Filtros muito sujos causando congelamento', 'Instalação fora de nível (inclinação errada)', 'Bandeja de dreno com problema ou rachada'],
    },
    {
      id: 'barulho', label: 'Fazendo barulho', icon: '🔊',
      causes: ['Suporte de fixação frouxo ou vibrando', 'Peças internas soltas (tampas, parafusos)', 'Acúmulo de sujeira nas pás do ventilador', 'Compressor com desgaste — precisa de avaliação'],
    },
  ];

  const sel = problems.find(p => p.id === selected);

  return (
    <section style={{ background: '#F8F9FB', padding: '96px 0' }}>
      <div className="container">
        <SectionHeader label="Diagnóstico" title="Seu ar condicionado está com problema?" subtitle="Clique no sintoma e veja as possíveis causas. Depois fale com a gente." />
        <div style={{ maxWidth: 720, marginInline: 'auto' }}>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
            {problems.map(p => (
              <button key={p.id} onClick={() => setSelected(selected === p.id ? null : p.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 24px', borderRadius: 999, border: `2px solid ${selected === p.id ? '#2E3192' : '#D1D5DB'}`, background: selected === p.id ? '#EEF0FC' : '#fff', color: selected === p.id ? '#2E3192' : '#6B7280', fontSize: 14, fontWeight: 600, fontFamily: 'Poppins,sans-serif', cursor: 'pointer', transition: 'all .2s', boxShadow: selected === p.id ? '0 4px 16px rgba(46,49,146,.12)' : 'none' }}>
                <span style={{ fontSize: 20 }}>{p.icon}</span> {p.label}
              </button>
            ))}
          </div>

          {sel && (
            <div style={{ background: '#fff', borderRadius: 16, padding: 28, boxShadow: '0 4px 24px rgba(46,49,146,.10)', border: '1.5px solid #EEF0FC' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A2E', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 22 }}>{sel.icon}</span> Possíveis causas — {sel.label}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                {sel.causes.map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 16px', background: '#F8F9FB', borderRadius: 8, borderLeft: '3px solid #2E3192' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E3192" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12"/></svg>
                    <span style={{ fontSize: 14, color: '#374151', lineHeight: 1.5 }}>{c}</span>
                  </div>
                ))}
              </div>
              <BtnWhatsApp onClick={() => openWhatsApp(`Olá! Meu ar condicionado está com um problema: ${sel.label.toLowerCase()}. Preciso de ajuda.`)} style={{ width: '100%', justifyContent: 'center', fontSize: 14 }}>
                <WAppIcon size={17} /> Falar com técnico agora
              </BtnWhatsApp>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── PRODUCTS GRID ────────────────────────────────────────────────────────────
const PRODUCT_CATEGORIES = [
  { id: 'hi-wall', label: 'Split Hi-Wall', badge: 'Mais vendido', bg: 'linear-gradient(135deg,#EEF0FC,#D4D8F7)', accent: '#2E3192', desc: '9.000–30.000 BTU · Alta eficiência energética' },
  { id: 'vrf', label: 'VRF', badge: 'Comercial', bg: 'linear-gradient(135deg,#E8F7FD,#C3EAFB)', accent: '#29ABE2', desc: 'A partir de 8TR · Múltiplos ambientes' },
  { id: 'mini-vrf', label: 'Mini VRF', badge: '', bg: 'linear-gradient(135deg,#F8F9FB,#E5E7EB)', accent: '#6B7280', desc: 'A partir de 3TR · Escritórios e lojas' },
  { id: 'piso-teto', label: 'Piso Teto', badge: '', bg: 'linear-gradient(135deg,#FFF5E8,#FFE4C0)', accent: '#F7941D', desc: '24.000–60.000 BTU · Instalação flexível' },
  { id: 'cassete', label: 'Cassete', badge: '', bg: 'linear-gradient(135deg,#EEF0FC,#A9B1EF)', accent: '#5462DF', desc: '18.000–60.000 BTU · Distribuição uniforme' },
  { id: 'splitao', label: 'Splitão', badge: 'Industrial', bg: 'linear-gradient(135deg,#EEF0FC,#7E89E7)', accent: '#2E3192', desc: '36.000–60.000 BTU · Alta capacidade' },
];

function ProductsSection({ navigate }) {
  return (
    <section style={{ background: '#fff', padding: '96px 0' }} id="produtos">
      <div className="container">
        <SectionHeader label="Catálogo" title="Equipamentos para cada necessidade" subtitle="Residencial, comercial ou industrial — temos a solução certa para o seu espaço." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="products-grid-3">
          {PRODUCT_CATEGORIES.map(cat => <ProductCard key={cat.id} cat={cat} navigate={navigate} />)}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <button onClick={() => navigate('produtos')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'none', color: '#2E3192', fontFamily: 'Poppins,sans-serif', fontSize: 14, fontWeight: 600, border: '1.5px solid #2E3192', borderRadius: 8, padding: '12px 24px', cursor: 'pointer', transition: 'all .2s' }}>
            Ver catálogo completo <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ cat, navigate }) {
  const [hov, setHov] = React.useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={() => navigate('categoria', { category: cat })}
      style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: hov ? '0 8px 32px rgba(46,49,146,.14)' : '0 2px 12px rgba(46,49,146,.08)', transform: hov ? 'translateY(-3px)' : 'none', transition: 'all .25s', cursor: 'pointer' }}>
      <div style={{ height: 140, background: cat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <ACIllustration color={cat.accent} />
        {cat.badge && <span style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(46,49,146,.9)', color: '#fff', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '3px 9px', borderRadius: 999 }}>{cat.badge}</span>}
      </div>
      <div style={{ padding: '16px 18px 18px' }}>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: cat.accent, marginBottom: 4 }}>{cat.label}</div>
        <div style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 12 }}>{cat.desc}</div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#2E3192' }}>
          Ver modelos <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
        </div>
      </div>
    </div>
  );
}

function ACIllustration({ color = '#2E3192', size = 52 }) {
  return (
    <svg width={size * 1.5} height={size} viewBox="0 0 120 60" fill="none" style={{ opacity: .55 }}>
      <rect x="5" y="12" width="110" height="36" rx="8" fill={color} fillOpacity=".15" stroke={color} strokeWidth="2"/>
      <rect x="18" y="24" width="6" height="12" rx="2" fill={color}/>
      <rect x="28" y="22" width="6" height="16" rx="2" fill={color} fillOpacity=".7"/>
      <rect x="38" y="18" width="6" height="20" rx="2" fill={color}/>
      <rect x="48" y="22" width="6" height="16" rx="2" fill={color} fillOpacity=".7"/>
      <rect x="58" y="26" width="6" height="10" rx="2" fill={color} fillOpacity=".5"/>
      <circle cx="96" cy="30" r="10" fill={color} fillOpacity=".2" stroke={color} strokeWidth="1.5"/>
      <path d="M92 30h8M96 26v8" stroke={color} strokeWidth="1.5"/>
    </svg>
  );
}

// ── TESTIMONIALS ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { name: 'Maria Oliveira', loc: 'Cascavel · Residencial', initial: 'M', color: '#2E3192', text: 'Atendimento super rápido e serviço impecável. Instalou no mesmo dia que entrei em contato. Muito profissional!' },
  { name: 'Carlos Mendes', loc: 'Cascavel · Comercial', initial: 'C', color: '#1478AA', text: 'Instalei 4 splits no meu escritório. Preço justo, trabalho limpo e com garantia. Com certeza vou chamar de novo!' },
  { name: 'Ana Costa', loc: 'Cascavel · Residencial', initial: 'A', color: '#E07A08', text: 'Manutenção preventiva feita com muito cuidado. O aparelho ficou como novo. Profissional de confiança!' },
  { name: 'Roberto Lima', loc: 'Cascavel · Comercial', initial: 'R', color: '#16A34A', text: 'Sistema VRF instalado no meu comércio. Ficou perfeito, dentro do prazo. Recomendo sem hesitar.' },
  { name: 'Fernanda Dias', loc: 'Toledo · Residencial', initial: 'F', color: '#7C3AED', text: 'Fui indicada por uma amiga e não me arrependo. Serviço de qualidade e preço honesto. Obrigada!' },
];

function TestimonialsSection() {
  return (
    <section style={{ background: '#F8F9FB', padding: '96px 0' }}>
      <div className="container">
        <SectionHeader label="Depoimentos" title="O que nossos clientes dizem" subtitle="Atendimento direto, confiança e qualidade — clientes que recomendam." />
        <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none' }}>
          {TESTIMONIALS.map(t => <TestimonialCard key={t.name} t={t} />)}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t }) {
  return (
    <div style={{ minWidth: 280, maxWidth: 320, flexShrink: 0, background: '#fff', borderRadius: 12, padding: 22, boxShadow: '0 2px 12px rgba(46,49,146,.08)' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: '#DCFCE7', color: '#16A34A', fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 999, marginBottom: 12 }}>
        <WAppIcon size={10} color="#16A34A" /> Via WhatsApp
      </div>
      <div style={{ color: '#F7941D', fontSize: 14, letterSpacing: 2, marginBottom: 10 }}>★★★★★</div>
      <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.65, fontStyle: 'italic', marginBottom: 14 }}>
        <span style={{ color: '#F7941D', fontSize: 20, lineHeight: 0, verticalAlign: -6, marginRight: 2 }}>"</span>
        {t.text}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 999, background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{t.initial}</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1A2E', lineHeight: 1.2 }}>{t.name}</div>
          <div style={{ fontSize: 11, color: '#9CA3AF' }}>{t.loc}</div>
        </div>
      </div>
    </div>
  );
}

// ── ABOUT SECTION ─────────────────────────────────────────────────────────────
function AboutSection({ navigate }) {
  const highlights = ['Atendimento direto com quem executa', 'Mais de 13 anos de experiência', 'Orçamento transparente e sem surpresas', 'Garantia em todos os serviços'];
  return (
    <section style={{ background: '#fff', padding: '96px 0' }} id="sobre">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="about-grid">
          {/* Visual */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{ background: 'linear-gradient(135deg,#EEF0FC,#D4D8F7)', borderRadius: 20, overflow: 'hidden', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', width: '100%' }}>
              <MascotAvatar size={260} />
              <div style={{ position: 'absolute', bottom: 16, right: 16, background: '#F7941D', borderRadius: 999, padding: '8px 16px', fontSize: 13, fontWeight: 700, color: '#fff' }}>13+ anos</div>
            </div>
            <div style={{ position: 'absolute', top: -12, left: -12, background: '#2E3192', color: '#fff', borderRadius: 12, padding: '10px 14px', fontSize: 12, fontWeight: 600, boxShadow: '0 4px 16px rgba(46,49,146,.2)' }}>
              Cascavel e região
            </div>
          </div>
          {/* Text */}
          <div>
            <span style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#F7941D', marginBottom: 10 }}>Sobre nós</span>
            <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.4rem)', fontWeight: 800, color: '#1A1A2E', letterSpacing: '-0.03em', marginBottom: 16 }}>
              Você fala direto com<br /><span style={{ color: '#2E3192' }}>quem executa o serviço</span>
            </h2>
            <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.8, marginBottom: 24 }}>
              Com mais de 13 anos de experiência em climatização, a Split House nasceu do compromisso com a qualidade e o atendimento direto. Não há intermediários — você fala, negocia e é atendido pelo próprio profissional.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
              {highlights.map(h => (
                <div key={h} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 999, background: '#EEF0FC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2E3192" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>{h}</span>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('sobre')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#2E3192', color: '#fff', fontFamily: 'Poppins,sans-serif', fontSize: 14, fontWeight: 600, border: 'none', borderRadius: 8, padding: '12px 22px', cursor: 'pointer', transition: 'all .2s' }}>
              Conheça nossa história <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── CTA FINAL ─────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section style={{ background: 'linear-gradient(135deg,#1C1F6E,#2E3192,#3d52c4)', padding: '96px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px)', backgroundSize: '48px 48px' }}></div>
      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: 16 }}>
          Pronto para respirar ar<br />mais limpo e fresco?
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,.65)', marginBottom: 36, maxWidth: 500, marginInline: 'auto' }}>
          Fale diretamente com o profissional. Orçamento grátis, sem compromisso. Atendimento em Cascavel e região do Paraná.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <BtnWhatsApp onClick={() => openWhatsApp()} style={{ fontSize: 16, height: 56, padding: '0 32px' }}>
            <WAppIcon size={20} /> Falar no WhatsApp agora
          </BtnWhatsApp>
          <button onClick={() => document.getElementById('simulador') && document.getElementById('simulador').scrollIntoView({ behavior: 'smooth' })}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: '#fff', fontFamily: 'Poppins,sans-serif', fontSize: 15, fontWeight: 600, border: '1.5px solid rgba(255,255,255,.35)', borderRadius: 8, padding: '0 24px', height: 56, cursor: 'pointer', transition: 'all .2s' }}>
            Simular meu BTU
          </button>
        </div>
      </div>
    </section>
  );
}

// ── HOME PAGE ─────────────────────────────────────────────────────────────────
function HomePage({ navigate }) {
  return (
    <div>
      <HeroSection navigate={navigate} />
      <StatsSection />
      <ServicesSection navigate={navigate} />
      <SimuladorSection navigate={navigate} />
      <DiagnosticSection />
      <ProductsSection navigate={navigate} />
      <TestimonialsSection />
      <AboutSection navigate={navigate} />
      <CTASection />
    </div>
  );
}

Object.assign(window, { HomePage, SimuladorPage, PRODUCT_CATEGORIES, ACIllustration, MascotAvatar, MascotSVG });
