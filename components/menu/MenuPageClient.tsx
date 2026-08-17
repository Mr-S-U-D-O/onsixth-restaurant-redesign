'use client';

import { useState, useRef, useEffect } from 'react';
import { menuData, type DietaryTag, type MenuItem, type MenuCategory } from '@/lib/menu-data';
import { formatPrice } from '@/lib/time-utils';
import { X, Download, Wine, Check } from 'lucide-react';
import { motion } from 'framer-motion';

// ── Dietary filter config ──
const FILTERS: { tag: DietaryTag; label: string; abbr: string }[] = [
  { tag: 'chef-pick',     label: "Chef's Pick",  abbr: 'CP' },
  { tag: 'vegan',         label: 'Vegan',        abbr: 'V' },
  { tag: 'gluten-free',   label: 'Gluten-Free',  abbr: 'GF' },
  { tag: 'vegetarian',    label: 'Vegetarian',   abbr: 'VG' },
  { tag: 'spicy',         label: 'Spicy',        abbr: 'S' },
];

// ── Dish Modal ──────────────────────────────────────────────────
function DishModal({
  item,
  categoryName,
  onClose,
  triggerRef
}: {
  item: MenuItem;
  categoryName: string;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus trap & Escape to close
  useEffect(() => {
    const focusable = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusable?.[0] as HTMLElement;
    const lastElement = focusable?.[focusable.length - 1] as HTMLElement;

    // Focus first element on open
    firstElement?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      }
    };
    
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      // Return focus on close
      triggerRef.current?.focus();
    };
  }, [onClose, triggerRef]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dish-modal-title"
      aria-describedby={item.description ? "dish-modal-desc" : undefined}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-modal)' as never,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-4)',
        background: 'rgba(252,252,252,0.85)',
        backdropFilter: 'blur(12px)',
      }}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg-primary)',
          border: '1px solid var(--border)',
          padding: 'var(--space-10)',
          maxWidth: '540px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          boxShadow: '0 24px 48px rgba(0,0,0,0.05)'
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close details"
          style={{
            position: 'absolute',
            top: 'var(--space-6)',
            right: 'var(--space-6)',
            color: 'var(--slate-mid)',
            padding: 'var(--space-2)',
          }}
        >
          <X size={24} />
        </button>

        <div style={{ color: 'var(--teal)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', marginBottom: 'var(--space-4)' }}>
          {categoryName}
        </div>

        {item.image && (
          <div 
            style={{ 
              width: '100%', 
              height: '220px', 
              backgroundImage: `url('${item.image}')`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center', 
              borderRadius: '4px',
              marginBottom: 'var(--space-6)',
              border: '1px solid var(--border)'
            }} 
          />
        )}

        <h2 id="dish-modal-title" style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', color: 'var(--obsidian)', marginBottom: 'var(--space-4)' }}>
          {item.name}
        </h2>

        {item.tags && item.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
            {item.tags.map((tag) => {
              const f = FILTERS.find((fi) => fi.tag === tag);
              return f ? (
                <span key={tag} style={{ border: '1px solid var(--border)', padding: 'var(--space-1) var(--space-3)', fontSize: 'var(--text-xs)', color: 'var(--slate-mid)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>
                  {f.label}
                </span>
              ) : null;
            })}
          </div>
        )}

        {item.description && (
          <p id="dish-modal-desc" style={{ fontSize: 'var(--text-base)', color: 'var(--slate-mid)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-8)' }}>
            {item.description}
          </p>
        )}

        {item.chefNotes && (
          <div style={{ padding: 'var(--space-6)', background: 'var(--bg-secondary)', borderLeft: '2px solid var(--gold)', marginBottom: 'var(--space-6)' }}>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--obsidian)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', marginBottom: 'var(--space-2)' }}>Chef&apos;s Notes</div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--slate-mid)', fontStyle: 'italic', lineHeight: 'var(--leading-relaxed)' }}>&ldquo;{item.chefNotes}&rdquo;</p>
          </div>
        )}

        {item.wineParingNote && (
          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start', marginBottom: 'var(--space-8)' }}>
            <Wine size={18} style={{ color: 'var(--slate-mid)', marginTop: '2px' }} />
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--slate-mid)', fontStyle: 'italic' }}>{item.wineParingNote}</p>
          </div>
        )}

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--space-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          {item.price ? (
            <div style={{ fontSize: 'var(--text-2xl)', color: 'var(--obsidian)', fontVariantNumeric: 'tabular-nums' }}>
              <span style={{ fontSize: 'var(--text-base)', color: 'var(--slate-mid)', marginRight: 'var(--space-1)' }}>ZAR</span>{formatPrice(item.price)}
            </div>
          ) : item.options ? (
            <div style={{ width: '100%' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--slate-mid)', marginBottom: 'var(--space-4)', letterSpacing: 'var(--tracking-widest)', textTransform: 'uppercase' }}>Options</div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', listStyle: 'none', padding: 0 }}>
                {item.options.map((opt) => (
                  <li key={opt.name} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted var(--border)', paddingBottom: 'var(--space-2)' }}>
                    <span style={{ color: 'var(--obsidian)' }}>{opt.name}</span>
                    <span style={{ color: 'var(--obsidian)', fontVariantNumeric: 'tabular-nums' }}>{formatPrice(opt.price)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

// ── Hover Image Preview ─────────────────────────────────────────
function HoverImagePreview({ activeItem, mousePos }: { activeItem: MenuItem | null, mousePos: { x: number, y: number } }) {
  if (!activeItem) return null;
  
  const bgImg = activeItem.image || '/hero_fire_kitchen.jpg';
  // Offset card so it appears to the right and slightly above the cursor
  const x = mousePos.x + 16;
  const y = mousePos.y - 160;

  return (
    <motion.div
      className="hidden-mobile"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 100,
        width: '240px',
        height: '300px',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        boxShadow: '0 16px 40px rgba(0,0,0,0.28)',
        background: 'var(--obsidian)',
        // Pass x and y to framer-motion so it combines correctly with scale
        x: x,
        y: y,
      }}
      key={activeItem.id}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    >
      <div 
        style={{
          width: '100%',
          height: '100%',
          backgroundImage: `url('${bgImg}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 'var(--space-4)',
            background: 'linear-gradient(to top, rgba(17,17,17,0.9) 0%, rgba(17,17,17,0.35) 60%, transparent 100%)',
            color: 'var(--cream)'
          }}
        >
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', fontWeight: 600 }}>
            {activeItem.price ? `ZAR ${activeItem.price}` : 'Artisanal Selection'}
          </div>
          <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, fontFamily: 'var(--font-heading)', marginTop: '2px' }}>
            {activeItem.name}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Client Component ───────────────────────────────────────
export default function MenuPageClient() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeFilters, setActiveFilters] = useState<Set<DietaryTag>>(new Set());
  const [selectedDish, setSelectedDish] = useState<{ item: MenuItem; cat: string } | null>(null);
  
  const [hoverDish, setHoverDish] = useState<MenuItem | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});
  const triggerRef = useRef<HTMLElement | null>(null);

  const handlePointerMove = (e: React.PointerEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const toggleFilter = (tag: DietaryTag) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    if (id === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    categoryRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const getFilteredItems = (items: MenuItem[]) => {
    if (activeFilters.size === 0) return items;
    return items.filter((item) => [...activeFilters].every((f) => item.tags?.includes(f)));
  };

  const filteredCategories: MenuCategory[] = menuData
    .map((cat) => ({ ...cat, items: getFilteredItems(cat.items) }))
    .filter((cat) => cat.items.length > 0);

  // We need to import motion for the hover preview. Since it might not be imported yet, we'll do it via require or just add it to the top.
  // Wait, I can just use 'framer-motion' if it's imported.
  return (
    <div onPointerMove={handlePointerMove}>
      {/* Editorial Filter Block */}
      <div className="container" style={{ paddingTop: 'var(--space-20)', paddingBottom: 'var(--space-8)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-8)' }}>
           <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 0.9, letterSpacing: '-0.02em', color: 'var(--obsidian)', margin: 0 }}>
             Curate<br/>Your <span className="text-highlight">Palate.</span>
           </h2>
           {activeFilters.size > 0 && (
              <button 
                onClick={() => setActiveFilters(new Set())} 
                style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', color: 'var(--obsidian)', borderBottom: '1px solid var(--obsidian)', paddingBottom: '2px', transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Clear Filters
              </button>
            )}
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1px', background: 'var(--border)', border: '1px solid var(--border)' }}>
          {FILTERS.map(f => (
            <button
              key={f.tag}
              onClick={() => toggleFilter(f.tag)}
              aria-pressed={activeFilters.has(f.tag)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                padding: 'var(--space-5)',
                background: activeFilters.has(f.tag) ? 'var(--obsidian)' : 'var(--bg-primary)',
                color: activeFilters.has(f.tag) ? 'var(--cream)' : 'var(--obsidian)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                minHeight: '120px',
                textAlign: 'left',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (!activeFilters.has(f.tag)) {
                  e.currentTarget.style.background = 'var(--bg-secondary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!activeFilters.has(f.tag)) {
                  e.currentTarget.style.background = 'var(--bg-primary)';
                }
              }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                width: '100%', 
                color: activeFilters.has(f.tag) ? 'var(--teal)' : 'var(--slate-mid)',
                marginBottom: 'var(--space-6)'
              }}>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: 'var(--tracking-widest)' }}>{f.abbr}</span>
                {activeFilters.has(f.tag) && <Check size={16} />}
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 500, letterSpacing: '-0.01em' }}>
                {f.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Menu Categories */}
      <div className="container" style={{ paddingBlock: 'var(--space-16)' }}>
        <div className="grid-sidebar-responsive">
          
          {/* Sticky Sidebar */}
          <aside style={{ position: 'sticky', top: '160px', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--slate-mid)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', marginBottom: 'var(--space-4)' }}>Sections</div>
            {filteredCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                style={{
                  textAlign: 'left',
                  padding: 'var(--space-2) 0',
                  fontSize: 'var(--text-sm)',
                  color: activeCategory === cat.id ? 'var(--obsidian)' : 'var(--slate-mid)',
                  fontWeight: activeCategory === cat.id ? 600 : 400,
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--tracking-widest)',
                  borderBottom: '1px solid',
                  borderColor: activeCategory === cat.id ? 'var(--obsidian)' : 'transparent',
                  transition: 'all 0.2s',
                  width: 'fit-content'
                }}
              >
                {cat.name}
              </button>
            ))}
          </aside>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-24)' }}>
            {filteredCategories.length === 0 ? (
            <div style={{ padding: 'var(--space-16) 0', color: 'var(--slate-mid)' }}>No dishes match the selected filters.</div>
          ) : (
            filteredCategories.map((cat) => (
              <section key={cat.id} ref={(el) => { categoryRefs.current[cat.id] = el; }} style={{ scrollMarginTop: '160px' }}>
                <header style={{ marginBottom: 'var(--space-12)' }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', color: 'var(--obsidian)', marginBottom: 'var(--space-4)' }}>{cat.name}</h2>
                  {cat.description && <p style={{ fontSize: 'var(--text-lg)', color: 'var(--slate-mid)', maxWidth: '600px' }}>{cat.description}</p>}
                </header>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-x) var(--space-16)', columnGap: 'var(--space-16)', rowGap: 'var(--space-8)' }}>
                  {cat.items.map((item) => (
                    <article 
                      key={item.id} 
                      style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}
                      onClick={(e) => { triggerRef.current = e.currentTarget; setSelectedDish({ item, cat: cat.name }); }}
                      onKeyDown={(e) => { if (e.key === 'Enter') { triggerRef.current = e.currentTarget; setSelectedDish({ item, cat: cat.name }); } }}
                      onPointerEnter={() => setHoverDish(item)}
                      onPointerLeave={() => setHoverDish(null)}
                      tabIndex={0}
                      role="button"
                      aria-label={`View details for ${item.name}`}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px dotted var(--border)', paddingBottom: 'var(--space-2)' }}>
                        <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--obsidian)', fontWeight: 500 }}>{item.name}</h3>
                        <span style={{ fontSize: 'var(--text-base)', color: 'var(--obsidian)', fontVariantNumeric: 'tabular-nums', paddingLeft: 'var(--space-4)' }}>
                          {item.price ? formatPrice(item.price) : item.options ? formatPrice(item.options[0].price) + '+' : ''}
                        </span>
                      </div>
                      
                      {item.description && (
                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--slate-mid)', lineHeight: 'var(--leading-relaxed)', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {item.description}
                        </p>
                      )}

                      {item.tags && item.tags.length > 0 && (
                        <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-1)' }}>
                          {item.tags.map(tag => {
                            const f = FILTERS.find(fi => fi.tag === tag);
                            return f ? <span key={tag} aria-label={f.label} style={{ fontSize: 'var(--text-xs)', color: 'var(--teal)', fontWeight: 600 }}>{f.abbr}</span> : null;
                          })}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            ))
          )}
          </div>
        </div>
      </div>

      {selectedDish && (
        <DishModal
          item={selectedDish.item}
          categoryName={selectedDish.cat}
          onClose={() => setSelectedDish(null)}
          triggerRef={triggerRef}
        />
      )}
      
      {/* Floating Hover Image Preview */}
      <HoverImagePreview activeItem={hoverDish} mousePos={mousePos} />
    </div>
  );
}
