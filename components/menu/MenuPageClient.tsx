'use client';

import { useState, useRef, useEffect } from 'react';
import { menuData, type DietaryTag, type MenuItem, type MenuCategory } from '@/lib/menu-data';
import { formatPrice } from '@/lib/time-utils';
import { X, Download, Wine, Check } from 'lucide-react';

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

// ── Main Client Component ───────────────────────────────────────
export default function MenuPageClient() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeFilters, setActiveFilters] = useState<Set<DietaryTag>>(new Set());
  const [selectedDish, setSelectedDish] = useState<{ item: MenuItem; cat: string } | null>(null);
  
  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});
  const triggerRef = useRef<HTMLElement | null>(null);

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

  return (
    <>
      {/* Filters (Sticky below nav) */}
      <div style={{ position: 'sticky', top: '72px', zIndex: 'var(--z-raised)' as never, background: 'rgba(252,252,252,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)', paddingBlock: 'var(--space-3)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 'var(--space-3)', overflowX: 'auto', scrollbarWidth: 'none', alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--slate-mid)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)' }}>Filters:</span>
            {FILTERS.map(f => (
              <button
                key={f.tag}
                onClick={() => toggleFilter(f.tag)}
                aria-pressed={activeFilters.has(f.tag)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-2) var(--space-4)',
                  border: `1px solid ${activeFilters.has(f.tag) ? 'var(--obsidian)' : 'var(--border)'}`,
                  background: activeFilters.has(f.tag) ? 'var(--obsidian)' : 'transparent',
                  color: activeFilters.has(f.tag) ? 'var(--cream)' : 'var(--slate-mid)',
                  fontSize: 'var(--text-sm)',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                {activeFilters.has(f.tag) && <Check size={14} />} {f.label}
              </button>
            ))}
            {activeFilters.size > 0 && (
              <button onClick={() => setActiveFilters(new Set())} style={{ fontSize: 'var(--text-sm)', color: 'var(--slate-mid)', textDecoration: 'underline', marginLeft: 'var(--space-4)' }}>Clear</button>
            )}
          </div>
        </div>
      </div>

      {/* Menu Categories */}
      <div className="container" style={{ paddingBlock: 'var(--space-16)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-24)' }}>
          {filteredCategories.length === 0 ? (
            <div style={{ padding: 'var(--space-16) 0', color: 'var(--slate-mid)' }}>No dishes match the selected filters.</div>
          ) : (
            filteredCategories.map((cat) => (
              <section key={cat.id} ref={(el) => { categoryRefs.current[cat.id] = el; }} style={{ scrollMarginTop: '160px' }}>
                <header style={{ marginBottom: 'var(--space-12)' }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', color: 'var(--obsidian)', marginBottom: 'var(--space-4)' }}>{cat.name}</h2>
                  {cat.description && <p style={{ fontSize: 'var(--text-lg)', color: 'var(--slate-mid)', maxWidth: '600px' }}>{cat.description}</p>}
                </header>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-x) var(--space-16)', columnGap: 'var(--space-16)', rowGap: 'var(--space-8)' }}>
                  {cat.items.map((item) => (
                    <article 
                      key={item.id} 
                      style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}
                      onClick={(e) => { triggerRef.current = e.currentTarget; setSelectedDish({ item, cat: cat.name }); }}
                      onKeyDown={(e) => { if (e.key === 'Enter') { triggerRef.current = e.currentTarget; setSelectedDish({ item, cat: cat.name }); } }}
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

      {selectedDish && (
        <DishModal
          item={selectedDish.item}
          categoryName={selectedDish.cat}
          onClose={() => setSelectedDish(null)}
          triggerRef={triggerRef}
        />
      )}
    </>
  );
}
