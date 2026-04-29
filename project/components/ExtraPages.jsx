// ExtraPages.jsx — Produtos, Categoria, Produto, Serviços, Sobre, Contato
// Exports all page components to window

// ── PRODUCT DATA ─────────────────────────────────────────────────────────────
const MODELS = {
  'hi-wall': [
    { id: 'hw1', name: 'Split Hi-Wall Inverter 9000', brand: 'Electrolux', btu: '9.000', type: 'Residencial', use: 'Quartos e salas pequenas até 15m²', energy: 'A' },
    { id: 'hw2', name: 'Split Hi-Wall Inverter 12000', brand: 'Daikin', btu: '12.000', type: 'Residencial', use: 'Salas até 20m² e quartos médios', energy: 'A' },
    { id: 'hw3', name: 'Split Hi-Wall Inverter 18000', brand: 'Samsung', btu: '18.000', type: 'Residencial/Comercial', use: 'Salas até 28m² e ambientes médios', energy: 'A' },
    { id: 'hw4', name: 'Split Hi-Wall Inverter 24000', brand: 'Midea', btu: '24.000', type: 'Residencial/Comercial', use: 'Salas grandes e ambientes comerciais', energy: 'A' },
    { id: 'hw5', name: 'Split Hi-Wall Inverter 30000', brand: 'LG', btu: '30.000', type: 'Comercial', use: 'Escritórios e lojas de médio porte', energy: 'A' },
  ],
  'vrf': [
    { id: 'vrf1', name: 'Sistema VRF 8TR', brand: 'Carrier', btu: '96.000', type: 'Comercial/Industrial', use: 'Edifícios comerciais e hotéis', energy: 'A' },
    { id: 'vrf2', name: 'Sistema VRF 12TR', brand: 'Daikin', btu: '144.000', type: 'Comercial/Industrial', use: 'Grandes edifícios e centros comerciais', energy: 'A' },
    { id: 'vrf3', name: 'Sistema VRF 16TR', brand: 'Mitsubishi', btu: '192.000', type: 'Industrial', use: 'Complexos industriais e hospitalares', energy: 'A' },
  ],
  'mini-vrf': [
    { id: 'mvrf1', name: 'Mini VRF 3TR', brand: 'Samsung', btu: '36.000', type: 'Comercial', use: 'Escritórios e pequenas lojas', energy: 'A' },
    { id: 'mvrf2', name: 'Mini VRF 4TR', brand: 'LG', btu: '48.000', type: 'Comercial', use: 'Lojas e clínicas de médio porte', energy: 'A' },
    { id: 'mvrf3', name: 'Mini VRF 5TR', brand: 'Daikin', btu: '60.000', type: 'Comercial', use: 'Restaurantes e academias', energy: 'A' },
  ],
  'piso-teto': [
    { id: 'pt1', name: 'Piso Teto 24000', brand: 'Carrier', btu: '24.000', type: 'Comercial', use: 'Lojas, salas de reunião', energy: 'A' },
    { id: 'pt2', name: 'Piso Teto 36000', brand: 'Midea', btu: '36.000', type: 'Comercial', use: 'Restaurantes e showrooms', energy: 'A' },
    { id: 'pt3', name: 'Piso Teto 48000', brand: 'LG', btu: '48.000', type: 'Comercial/Industrial', use: 'Galpões e grandes lojas', energy: 'A' },
    { id: 'pt4', name: 'Piso Teto 60000', brand: 'Daikin', btu: '60.000', type: 'Industrial', use: 'Armazéns e espaços industriais', energy: 'A' },
  ],
  'cassete': [
    { id: 'cas1', name: 'Cassete 4 Vias 18000', brand: 'Daikin', btu: '18.000', type: 'Comercial', use: 'Escritórios e salas de reunião', energy: 'A' },
    { id: 'cas2', name: 'Cassete 4 Vias 24000', brand: 'Carrier', btu: '24.000', type: 'Comercial', use: 'Salas comerciais e lojas', energy: 'A' },
    { id: 'cas3', name: 'Cassete 4 Vias 36000', brand: 'Mitsubishi', btu: '36.000', type: 'Comercial', use: 'Grandes salas e halls', energy: 'A' },
    { id: 'cas4', name: 'Cassete 4 Vias 60000', brand: 'Samsung', btu: '60.000', type: 'Industrial', use: 'Supermercados e galpões', energy: 'A' },
  ],
  'splitao': [
    { id: 'sp1', name: 'Splitão 36000', brand: 'Electrolux', btu: '36.000', type: 'Comercial/Industrial', use: 'Oficinas e pequenos galpões', energy: 'B' },
    { id: 'sp2', name: 'Splitão 48000', brand: 'Samsung', btu: '48.000', type: 'Industrial', use: 'Galpões e fábricas', energy: 'B' },
    { id: 'sp3', name: 'Splitão 60000', brand: 'LG', btu: '60.000', type: 'Industrial', use: 'Grandes instalações industriais', energy: 'B' },
  ],
};

// ── PAGE HEADER ───────────────────────────────────────────────────────────────
function PageHeader({ label, title, subtitle }) {
  return (
    <div style={{ background: 'linear-gradient(135deg,#1C1F6E,#2E3192)', padding: '56px 0 40px' }}>
      <div className="container">
        <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#F7941D', display: 'block', marginBottom: 8 }}>{label}</span>
        <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', marginBottom: subtitle ? 10 : 0 }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 15, color: 'rgba(255,255,255,.65)', maxWidth: 520 }}>{subtitle}</p>}
      </div>
    </div>
  );
}

// ── PRODUTOS PAGE ─────────────────────────────────────────────────────────────
function ProdutosPage({ navigate }) {
  return (
    <div>
      <PageHeader label="Catálogo completo" title="Nossos Produtos" subtitle="Equipamentos para cada tipo de ambiente — residencial, comercial e industrial." />
      <section style={{ background: '#F8F9FB', padding: '64px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="products-grid-3">
            {PRODUCT_CATEGORIES.map(cat => (
              <div key={cat.id} onClick={() => navigate('categoria', { category: cat })}
                style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(46,49,146,.08)', cursor: 'pointer', transition: 'all .25s' }}
                className="product-hover-card">
                <div style={{ height: 160, background: cat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <ACIllustration color={cat.accent} size={64} />
                  {cat.badge && <span style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(46,49,146,.9)', color: '#fff', fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '3px 9px', borderRadius: 999 }}>{cat.badge}</span>}
                </div>
                <div style={{ padding: '20px 22px 24px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: cat.accent, marginBottom: 4 }}>{cat.label}</div>
                  <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 16, lineHeight: 1.5 }}>{cat.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#2E3192', display: 'flex', alignItems: 'center', gap: 4 }}>
                      Ver modelos <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                    </span>
                    <span style={{ fontSize: 11, color: '#9CA3AF' }}>{(MODELS[cat.id] || []).length} modelos</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48, background: 'linear-gradient(135deg,#EEF0FC,#D4D8F7)', borderRadius: 16, padding: '32px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#2E3192', marginBottom: 6 }}>Não encontrou o que procura?</div>
              <p style={{ fontSize: 14, color: '#6B7280', margin: 0 }}>Fale conosco — trabalhamos com todas as marcas e podemos conseguir qualquer modelo.</p>
            </div>
            <BtnWhatsApp onClick={() => openWhatsApp('Olá! Gostaria de informações sobre produtos de ar condicionado.')} style={{ flexShrink: 0 }}>
              <WAppIcon size={17} /> Consultar disponibilidade
            </BtnWhatsApp>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── CATEGORIA PAGE ─────────────────────────────────────────────────────────────
function CategoriaPage({ navigate, category }) {
  if (!category) return <ProdutosPage navigate={navigate} />;
  const models = MODELS[category.id] || [];

  return (
    <div>
      <PageHeader label="Catálogo" title={category.label} subtitle={category.desc} />
      <section style={{ background: '#F8F9FB', padding: '64px 0' }}>
        <div className="container">
          <button onClick={() => navigate('produtos')} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#2E3192', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Poppins,sans-serif', marginBottom: 32, padding: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg> Voltar aos produtos
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {models.map(m => (
              <div key={m.id} style={{ background: '#fff', borderRadius: 12, padding: '20px 24px', boxShadow: '0 2px 12px rgba(46,49,146,.08)', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                <div style={{ width: 72, height: 72, borderRadius: 12, background: category.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ACIllustration color={category.accent} size={40} />
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: category.accent, marginBottom: 2 }}>{m.brand}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#1A1A2E', marginBottom: 4 }}>{m.name}</div>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 12, color: '#6B7280' }}>{m.btu} BTU</span>
                    <span style={{ fontSize: 12, color: '#6B7280' }}>·</span>
                    <span style={{ fontSize: 12, color: '#6B7280' }}>{m.type}</span>
                    <span style={{ fontSize: 12, color: '#6B7280' }}>·</span>
                    <span style={{ fontSize: 12, color: '#16A34A', fontWeight: 600 }}>Eficiência {m.energy}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
                  <button onClick={() => navigate('produto', { product: { ...m, category } })}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#EEF0FC', color: '#2E3192', fontFamily: 'Poppins,sans-serif', fontSize: 13, fontWeight: 600, border: 'none', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', transition: 'all .2s' }}>
                    Ver detalhes
                  </button>
                  <BtnWhatsApp onClick={() => openWhatsApp(`Olá! Tenho interesse no ${m.name} (${m.btu} BTU). Pode me dar mais informações?`)} style={{ fontSize: 13, height: 40, padding: '0 16px' }}>
                    <WAppIcon size={14} /> Orçamento
                  </BtnWhatsApp>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── PRODUTO PAGE ──────────────────────────────────────────────────────────────
function ProdutoPage({ navigate, product }) {
  if (!product) return <ProdutosPage navigate={navigate} />;
  const { category } = product;

  const specs = [
    { label: 'Capacidade', value: `${product.btu} BTU/h` },
    { label: 'Tipo', value: product.type },
    { label: 'Marca', value: product.brand },
    { label: 'Eficiência', value: `Classificação ${product.energy}` },
    { label: 'Indicação', value: product.use },
    { label: 'Atendimento', value: 'Cascavel e região do Paraná' },
  ];

  return (
    <div>
      <PageHeader label={category?.label || 'Produto'} title={product.name} />
      <section style={{ background: '#F8F9FB', padding: '64px 0' }}>
        <div className="container">
          <button onClick={() => navigate('categoria', { category })} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#2E3192', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Poppins,sans-serif', marginBottom: 32, padding: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg> Voltar à categoria
          </button>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 40, alignItems: 'start' }} className="product-detail-grid">
            {/* Image */}
            <div style={{ background: category?.bg || '#EEF0FC', borderRadius: 16, aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              <ACIllustration color={category?.accent || '#2E3192'} size={100} />
              <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(22,163,74,.9)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 999 }}>
                Eficiência {product.energy}
              </div>
            </div>
            {/* Details */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: category?.accent || '#F7941D', marginBottom: 4 }}>{product.brand}</div>
              <h1 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 800, color: '#1A1A2E', marginBottom: 8 }}>{product.name}</h1>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#2E3192', marginBottom: 20 }}>{product.btu} BTU/h</div>
              <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7, marginBottom: 24 }}>
                <strong style={{ color: '#1A1A2E' }}>Indicação de uso:</strong> {product.use}
              </p>
              <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid #E5E7EB', marginBottom: 24 }}>
                {specs.map((s, i) => (
                  <div key={s.label} style={{ display: 'flex', padding: '14px 20px', borderBottom: i < specs.length - 1 ? '1px solid #F1F3F6' : 'none' }}>
                    <span style={{ fontSize: 13, color: '#6B7280', flex: '0 0 140px' }}>{s.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#1A1A2E', flex: 1 }}>{s.value}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <BtnWhatsApp onClick={() => openWhatsApp(`Olá! Tenho interesse no ${product.name} (${product.btu} BTU). Gostaria de um orçamento completo com instalação.`)} style={{ justifyContent: 'center' }}>
                  <WAppIcon size={18} /> Solicitar orçamento com instalação
                </BtnWhatsApp>
                <button onClick={() => openWhatsApp(`Olá! Tenho interesse no ${product.name}. Pode me informar mais detalhes?`)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#EEF0FC', color: '#2E3192', fontFamily: 'Poppins,sans-serif', fontSize: 14, fontWeight: 600, border: 'none', borderRadius: 8, height: 48, cursor: 'pointer', transition: 'all .2s' }}>
                  Tirar dúvidas antes de comprar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── SERVIÇOS PAGE ─────────────────────────────────────────────────────────────
function ServicosPage({ navigate }) {
  const services = [
    {
      icon: '⚡', title: 'Instalação', color: '#2E3192',
      desc: 'Instalação profissional de aparelhos residenciais e comerciais. Trabalhamos com splits Hi-Wall, cassete, piso teto, VRF e mini VRF.',
      when: ['Novo imóvel ou reforma', 'Primeiro ar condicionado', 'Troca de equipamento antigo', 'Expansão do sistema'],
      steps: ['Visita técnica gratuita para avaliação', 'Emissão do orçamento detalhado', 'Agendamento conforme sua disponibilidade', 'Instalação com mão de obra qualificada', 'Teste e entrega com garantia'],
    },
    {
      icon: '🔧', title: 'Manutenção', color: '#1478AA',
      desc: 'Manutenção preventiva e corretiva para garantir a eficiência e vida útil do seu equipamento. Limpeza, higienização, revisão de gás e mais.',
      when: ['A cada 6 meses (preventiva)', 'Aparelho parou de gelar', 'Fazendo barulho incomum', 'Vazando água', 'Consumo de energia aumentou'],
      steps: ['Diagnóstico completo do sistema', 'Limpeza e higienização dos filtros', 'Verificação de gás refrigerante', 'Limpeza das serpentinas', 'Relatório de condições do equipamento'],
    },
    {
      icon: '📦', title: 'Revenda', color: '#F7941D',
      desc: 'Venda e distribuição de equipamentos das principais marcas do mercado. Compramos de distribuidor e repassamos com preço justo.',
      when: ['Precisa comprar um ar condicionado', 'Quer instalar e já ter o equipamento', 'Busca marcas específicas', 'Projeto comercial ou industrial'],
      steps: ['Consulta sobre a necessidade do ambiente', 'Indicação do modelo ideal', 'Fornecimento do equipamento', 'Instalação profissional inclusa', 'Garantia do produto e do serviço'],
    },
    {
      icon: '🏢', title: 'Mini VRF', color: '#5462DF',
      desc: 'Instalação de sistemas multi-split Mini VRF para escritórios, lojas e edifícios comerciais de pequeno e médio porte.',
      when: ['Escritórios com múltiplas salas', 'Lojas e clínicas', 'Pequenos edifícios comerciais', 'Projetos com 2 a 8 ambientes'],
      steps: ['Visita técnica para levantamento', 'Dimensionamento do sistema', 'Instalação das unidades internas e externas', 'Conexão e teste do sistema', 'Entrega com garantia e orientações'],
    },
  ];

  return (
    <div>
      <PageHeader label="O que fazemos" title="Nossos Serviços" subtitle="Atendimento completo em climatização — do residencial ao industrial." />
      <section style={{ background: '#F8F9FB', padding: '64px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {services.map(s => <ServiceDetailCard key={s.title} service={s} />)}
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceDetailCard({ service: s }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(46,49,146,.08)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, padding: '28px 32px', cursor: 'pointer' }} onClick={() => setOpen(v => !v)}>
        <div style={{ width: 56, height: 56, borderRadius: 12, background: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>{s.icon}</div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1A1A2E', marginBottom: 8 }}>{s.title}</h3>
          <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
        </div>
        <div style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s', color: '#9CA3AF', flexShrink: 0, marginTop: 4 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
        </div>
      </div>
      {open && (
        <div style={{ padding: '0 32px 28px', borderTop: '1px solid #F1F3F6' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 24, marginBottom: 24 }} className="service-detail-grid">
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6B7280', marginBottom: 12 }}>Quando contratar</div>
              {s.when.map(w => (
                <div key={w} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="3" style={{ flexShrink: 0, marginTop: 3 }}><polyline points="20 6 9 17 4 12"/></svg>
                  <span style={{ fontSize: 13, color: '#374151', lineHeight: 1.5 }}>{w}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6B7280', marginBottom: 12 }}>Como funciona</div>
              {s.steps.map((st, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 20, height: 20, borderRadius: 999, background: s.color, color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                  <span style={{ fontSize: 13, color: '#374151', lineHeight: 1.5 }}>{st}</span>
                </div>
              ))}
            </div>
          </div>
          <BtnWhatsApp onClick={() => openWhatsApp(`Olá! Gostaria de um orçamento para o serviço de ${s.title.toLowerCase()}.`)} style={{ fontSize: 14, height: 44 }}>
            <WAppIcon size={16} /> Solicitar {s.title}
          </BtnWhatsApp>
        </div>
      )}
    </div>
  );
}

// ── SOBRE PAGE ────────────────────────────────────────────────────────────────
function SobrePage({ navigate }) {
  const diferenciais = [
    { icon: '🤝', title: 'Atendimento direto', desc: 'Você fala diretamente com quem vai executar o serviço. Sem intermediários, sem surpresas.' },
    { icon: '🏆', title: '13+ anos de experiência', desc: 'Mais de uma década dedicada à climatização em Cascavel e região, com clientes fiéis.' },
    { icon: '📋', title: 'Orçamento transparente', desc: 'Clareza total nos valores antes de começar. Sem taxas ocultas ou cobranças inesperadas.' },
    { icon: '✅', title: 'Garantia em tudo', desc: 'Todos os serviços têm garantia. A nossa reputação é construída serviço a serviço.' },
    { icon: '📍', title: 'Cascavel e região', desc: 'Cobrimos Cascavel, Toledo, Marechal Cândido Rondon, Foz do Iguaçu e toda a região oeste.' },
    { icon: '⚡', title: 'Agilidade', desc: 'Atendimento rápido para urgências. Sabemos que calor não espera.' },
  ];

  return (
    <div>
      <PageHeader label="Nossa história" title="Sobre a Split House" subtitle="Mais de 13 anos levando conforto térmico para Cascavel e região." />

      {/* Story */}
      <section style={{ background: '#fff', padding: '64px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', marginBottom: 80 }} className="about-story-grid">
            <div style={{ background: 'linear-gradient(135deg,#EEF0FC,#D4D8F7)', borderRadius: 20, aspectRatio: '4/3', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, position: 'relative' }}>
              <MascotAvatar size={220} />
              <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, display: 'flex', gap: 8, justifyContent: 'center' }}>
                <span style={{ background: '#fff', borderRadius: 999, padding: '6px 14px', fontSize: 12, fontWeight: 600, color: '#2E3192', boxShadow: '0 2px 8px rgba(46,49,146,.1)' }}>Cascavel, PR</span>
                <span style={{ background: '#F7941D', borderRadius: 999, padding: '6px 14px', fontSize: 12, fontWeight: 600, color: '#fff' }}>Desde 2011</span>
              </div>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#F7941D', marginBottom: 10 }}>Nossa história</span>
              <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 800, color: '#1A1A2E', marginBottom: 16 }}>De um técnico apaixonado ao referencial em climatização na região</h2>
              <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.8, marginBottom: 16 }}>
                A Split House nasceu da paixão por climatização e do compromisso com a qualidade. Começou como um serviço técnico individual e cresceu organicamente — sem anúncios, apenas com a força das recomendações de clientes satisfeitos.
              </p>
              <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.8, marginBottom: 24 }}>
                Com mais de 13 anos de atuação em Cascavel e região, construímos uma reputação sólida baseada na confiança, no atendimento direto e na qualidade que cada serviço merece.
              </p>
              <div style={{ background: '#EEF0FC', borderRadius: 12, padding: '16px 20px', borderLeft: '4px solid #2E3192' }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: '#2E3192', margin: 0, fontStyle: 'italic' }}>
                  "Você fala direto com quem executa o serviço. Essa é a nossa maior diferença."
                </p>
              </div>
            </div>
          </div>

          {/* Diferenciais */}
          <SectionHeader label="Por que nos escolher" title="Nossos diferenciais" subtitle="O que torna a Split House a melhor escolha para o seu conforto térmico." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="diferenciais-grid">
            {diferenciais.map(d => (
              <div key={d.title} style={{ background: '#F8F9FB', borderRadius: 12, padding: '24px 20px', border: '1px solid #E5E7EB' }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{d.icon}</div>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: '#1A1A2E', marginBottom: 8 }}>{d.title}</h4>
                <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6, margin: 0 }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg,#1C1F6E,#2E3192)', padding: '64px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', fontWeight: 800, color: '#fff', marginBottom: 16 }}>Vamos trabalhar juntos?</h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,.65)', marginBottom: 32, maxWidth: 400, marginInline: 'auto' }}>Entre em contato e conheça o atendimento que faz a diferença.</p>
          <BtnWhatsApp onClick={() => openWhatsApp()} style={{ fontSize: 16, height: 56, padding: '0 32px' }}>
            <WAppIcon size={20} /> Falar agora no WhatsApp
          </BtnWhatsApp>
        </div>
      </section>
    </div>
  );
}

// ── CONTATO PAGE ──────────────────────────────────────────────────────────────
function ContatoPage({ navigate }) {
  const [form, setForm] = React.useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = React.useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const sendWhatsApp = () => {
    if (!form.name || !form.message) return;
    const msg = `Olá! Meu nome é ${form.name}${form.phone ? ', telefone ' + form.phone : ''}.\n\n${form.message}`;
    openWhatsApp(msg);
    setSent(true);
  };

  const inputStyle = { width: '100%', padding: '14px 16px', fontFamily: 'Poppins,sans-serif', fontSize: 14, border: '1.5px solid #D1D5DB', borderRadius: 8, outline: 'none', color: '#1A1A2E', background: '#fff', transition: 'border-color .2s', marginTop: 6 };

  return (
    <div>
      <PageHeader label="Fale conosco" title="Contato" subtitle="Atendimento em Cascavel e região do Paraná." />
      <section style={{ background: '#F8F9FB', padding: '64px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }} className="contato-grid">

            {/* Left: WhatsApp + Info */}
            <div>
              <div style={{ background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 2px 12px rgba(46,49,146,.08)', marginBottom: 20, border: '2px solid #25D366' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 999, background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <WAppIcon size={24} />
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#1A1A2E' }}>WhatsApp</div>
                    <div style={{ fontSize: 13, color: '#6B7280' }}>Resposta rápida</div>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.6, marginBottom: 20 }}>
                  A forma mais rápida de falar conosco. Atendemos de segunda a sábado, das 8h às 18h. Urgências são atendidas o mais rápido possível.
                </p>
                <BtnWhatsApp onClick={() => openWhatsApp()} style={{ width: '100%', justifyContent: 'center', fontSize: 15, height: 52 }}>
                  <WAppIcon size={18} /> Falar no WhatsApp agora
                </BtnWhatsApp>
              </div>

              <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 2px 12px rgba(46,49,146,.08)' }}>
                {[
                  { label: 'Localização', value: 'Cascavel, Paraná, Brasil' },
                  { label: 'Atendimento', value: 'Cascavel e região do Paraná' },
                  { label: 'Horário', value: 'Seg – Sáb: 8h às 18h' },
                  { label: 'Telefone', value: '(45) 9 9999-0000' },
                ].map(c => (
                  <div key={c.label} style={{ display: 'flex', gap: 16, padding: '12px 0', borderBottom: '1px solid #F1F3F6' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', flex: '0 0 100px', marginTop: 2 }}>{c.label}</span>
                    <span style={{ fontSize: 14, color: '#1A1A2E', fontWeight: 500 }}>{c.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div style={{ background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 2px 12px rgba(46,49,146,.08)' }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div style={{ width: 64, height: 64, borderRadius: 999, background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginInline: 'auto', marginBottom: 16 }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1A1A2E', marginBottom: 8 }}>Mensagem enviada!</h3>
                  <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 24 }}>Você foi redirecionado ao WhatsApp. Aguarde nosso retorno em breve.</p>
                  <button onClick={() => setSent(false)} style={{ background: 'none', color: '#2E3192', fontFamily: 'Poppins,sans-serif', fontSize: 14, fontWeight: 600, border: '1.5px solid #2E3192', borderRadius: 8, padding: '10px 20px', cursor: 'pointer' }}>
                    Enviar nova mensagem
                  </button>
                </div>
              ) : (
                <>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1A1A2E', marginBottom: 6 }}>Envie uma mensagem</h3>
                  <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 24 }}>Preencha o formulário e seja redirecionado ao WhatsApp com a mensagem pronta.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Nome *</label>
                      <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Seu nome completo" style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Telefone</label>
                      <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="(45) 9 0000-0000" style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>Mensagem *</label>
                      <textarea value={form.message} onChange={e => set('message', e.target.value)} placeholder="Descreva o que você precisa..." style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }} />
                    </div>
                    <BtnWhatsApp onClick={sendWhatsApp} style={{ justifyContent: 'center', opacity: (!form.name || !form.message) ? 0.6 : 1 }}>
                      <WAppIcon size={18} /> Enviar via WhatsApp
                    </BtnWhatsApp>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { ProdutosPage, CategoriaPage, ProdutoPage, ServicosPage, SobrePage, ContatoPage, MODELS });
