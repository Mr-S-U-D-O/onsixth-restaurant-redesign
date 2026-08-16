'use client';

import { useState, useRef } from 'react';
import { menuData, type DietaryTag, type MenuItem, type MenuCategory } from '@/lib/menu-data';
import { formatPrice } from '@/lib/time-utils';
import { X, Download, Wine } from 'lucide-react';

// ── Dietary filter config ──
const FILTERS: { tag: DietaryTag; label: string; emoji: string }[] = [
  { tag: 'chef-pick',     label: "Chef's Pick",  emoji: '⭐' },
  { tag: 'vegan',         label: 'Vegan',        emoji: '🌿' },
  { tag: 'gluten-free',   label: 'Gluten-Free',  emoji: '🌾' },
  { tag: 'vegetarian',    label: 'Vegetarian',   emoji: '🥦' },
  { tag: 'spicy',         label: 'Spicy',        emoji: '🔥' },
];

// ── Dish Modal ──────────────────────────────────────────────────
function DishModal({
  item,
  categoryName,
  onClose,
}: {
  item: MenuItem;
  categoryName: string;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dish-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-modal)' as never,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-4)',
        background: 'rgba(18,19,22,0.85)',
        backdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass"
        style={{
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-8)',
          maxWidth: '540px',
          width: '100%',
          maxHeight: '85vh',
          overflowY: 'auto',
          animation: 'scaleIn 0.3s var(--ease-spring) both',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close dish details"
          style={{
            position: 'absolute',
            top: 'var(--space-4)',
            right: 'var(--space-4)',
            color: 'var(--muted)',
            padding: 'var(--space-1)',
          }}
        >
          <X size={20} />
        </button>

        {/* Category tag */}
        <span className="badge badge-gold" style={{ marginBottom: 'var(--space-4)' }}>
          {categoryName}
        </span>

        {/* Title */}
        <h2
          id="dish-modal-title"
          className="text-heading-card"
          style={{ marginBottom: 'var(--space-3)' }}
        >
          {item.name}
        </h2>

        {/* Dietary badges */}
        {item.tags && item.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
            {item.tags.map((tag) => {
              const f = FILTERS.find((fi) => fi.tag === tag);
              return f ? (
                <span key={tag} className={`badge badge-${tag === 'chef-pick' ? 'chef' : tag === 'gluten-free' ? 'gf' : tag}`}>
                  {f.emoji} {f.label}
                </span>
              ) : null;
            })}
          </div>
        )}

        {/* Description */}
        {item.description && (
          <p className="text-body" style={{ marginBottom: 'var(--space-5)' }}>
            {item.description}
          </p>
        )}

        {/* Chef's notes */}
        {item.chefNotes && (
          <div
            style={{
              background: 'var(--gold-subtle)',
              border: '1px solid rgba(212,175,55,0.2)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-4)',
              marginBottom: 'var(--space-4)',
            }}
          >
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--gold)', fontWeight: 600, letterSpacing: 'var(--tracking-widest)', textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>
              Chef&apos;s Notes
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--cream-dim)', fontStyle: 'italic', lineHeight: 'var(--leading-relaxed)' }}>
              &ldquo;{item.chefNotes}&rdquo;
            </p>
          </div>
        )}

        {/* Wine pairing */}
        {item.wineParingNote && (
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-3)',
              alignItems: 'flex-start',
              marginBottom: 'var(--space-5)',
            }}
          >
            <Wine size={16} style={{ color: 'var(--terracotta)', marginTop: '2px', flexShrink: 0 }} />
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-light)', fontStyle: 'italic' }}>
              {item.wineParingNote}
            </p>
          </div>
        )}

        {/* Price */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--space-5)' }}>
          {item.price ? (
            <div className="dish-card__price" style={{ fontSize: 'var(--text-2xl)' }}>
              <span>ZAR</span>{formatPrice(item.price)}
            </div>
          ) : item.options ? (
            <div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginBottom: 'var(--space-3)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase' }}>
                Available Options
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {item.options.map((opt) => (
                  <div key={opt.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)' }}>
                    <span style={{ color: 'var(--cream-dim)' }}>{opt.name}</span>
                    <span style={{ color: 'var(--gold)', fontWeight: 600 }}>{formatPrice(opt.price)}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

// ── Dish Card ───────────────────────────────────────────────────
function DishCard({ item, categoryName, onOpen }: {
  item: MenuItem;
  categoryName: string;
  onOpen: (item: MenuItem, cat: string) => void;
}) {
  return (
    <article
      className="dish-card"
      onClick={() => onOpen(item, categoryName)}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(item, categoryName)}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${item.name}`}
    >
      {/* Image placeholder */}
      <div className="dish-card__image-wrap">
        <div
          aria-hidden="true"
          style={{
            width: '100%',
            height: '100%',
            background: `
              radial-gradient(ellipse 60% 60% at 50% 50%,
                rgba(${item.tags?.includes('spicy') ? '201,122,86' : item.tags?.includes('vegan') ? '74,222,128' : '212,175,55'},0.15) 0%,
                transparent 70%),
              var(--slate-mid)
            `,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '64px',
          }}
        >
          {item.imagePlaceholder?.includes('sushi') || item.imagePlaceholder?.includes('salmon') || item.imagePlaceholder?.includes('sashimi') || item.imagePlaceholder?.includes('roll') || item.imagePlaceholder?.includes('nigiri') ? '🍣'
            : item.imagePlaceholder?.includes('pizza') || item.imagePlaceholder?.includes('crust') ? '🍕'
            : item.imagePlaceholder?.includes('skewer') ? '🍢'
            : item.imagePlaceholder?.includes('steak') ? '🥩'
            : item.imagePlaceholder?.includes('pasta') ? '🍝'
            : item.imagePlaceholder?.includes('cocktail') || item.imagePlaceholder?.includes('mojito') || item.imagePlaceholder?.includes('negroni') || item.imagePlaceholder?.includes('wine') || item.imagePlaceholder?.includes('limoncello') ? '🍸'
            : item.imagePlaceholder?.includes('crush') || item.imagePlaceholder?.includes('shandy') || item.imagePlaceholder?.includes('mocktail') ? '🥤'
            : item.imagePlaceholder?.includes('cheesecake') || item.imagePlaceholder?.includes('pudding') || item.imagePlaceholder?.includes('lava') ? '🍮'
            : '🍽️'}
        </div>

        {/* Dietary badges on image */}
        {item.tags && item.tags.length > 0 && (
          <div className="dish-card__badges">
            {item.tags.slice(0, 2).map((tag) => {
              const f = FILTERS.find((fi) => fi.tag === tag);
              return f ? (
                <span key={tag} className={`badge badge-${tag === 'chef-pick' ? 'chef' : tag === 'gluten-free' ? 'gf' : tag}`} style={{ fontSize: '10px' }}>
                  {f.emoji}
                </span>
              ) : null;
            })}
          </div>
        )}
      </div>

      <div className="dish-card__body">
        <h3 className="dish-card__name">{item.name}</h3>
        {item.description && <p className="dish-card__desc">{item.description}</p>}
        <div className="dish-card__footer">
          {item.price ? (
            <div className="dish-card__price">
              <span>R</span>{parseFloat(item.price).toFixed(2)}
            </div>
          ) : item.options ? (
            <div className="dish-card__price">
              <span>from R</span>{Math.min(...item.options.map((o) => parseFloat(o.price))).toFixed(2)}
            </div>
          ) : null}
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--gold)', letterSpacing: 'var(--tracking-wide)' }}>
            View Details →
          </span>
        </div>
      </div>
    </article>
  );
}

// ── Main Client Component ───────────────────────────────────────
export default function MenuPageClient() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeFilters, setActiveFilters] = useState<Set<DietaryTag>>(new Set());
  const [selectedDish, setSelectedDish] = useState<{ item: MenuItem; cat: string } | null>(null);
  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});

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

  // Filter items
  const getFilteredItems = (items: MenuItem[]) => {
    if (activeFilters.size === 0) return items;
    return items.filter((item) =>
      [...activeFilters].every((f) => item.tags?.includes(f))
    );
  };

  const filteredCategories: MenuCategory[] = menuData
    .map((cat) => ({ ...cat, items: getFilteredItems(cat.items) }))
    .filter((cat) => cat.items.length > 0);

  return (
    <>
      {/* Sticky Category Nav */}
      <nav className="menu-category-nav" aria-label="Menu categories">
        <div className="container">
          <div className="menu-category-nav-inner">
            <button
              className={`menu-cat-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => scrollToCategory('all')}
            >
              All
            </button>
            {menuData.map((cat) => (
              <button
                key={cat.id}
                className={`menu-cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => scrollToCategory(cat.id)}
              >
                <span aria-hidden="true">{cat.emoji}</span> {cat.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Filter Bar */}
      <div style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="filter-bar" role="group" aria-label="Dietary filters">
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', alignSelf: 'center', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              Filter:
            </span>
            {FILTERS.map((f) => (
              <button
                key={f.tag}
                className={`filter-chip ${activeFilters.has(f.tag) ? 'active' : ''}`}
                onClick={() => toggleFilter(f.tag)}
                aria-pressed={activeFilters.has(f.tag)}
              >
                <span aria-hidden="true">{f.emoji}</span> {f.label}
              </button>
            ))}
            {activeFilters.size > 0 && (
              <button
                className="filter-chip"
                onClick={() => setActiveFilters(new Set())}
                style={{ borderColor: 'rgba(239,68,68,0.3)', color: '#f87171' }}
              >
                <X size={12} /> Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="container" style={{ paddingBlock: 'var(--space-12)' }}>
        {filteredCategories.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-16) 0' }}>
            <div style={{ fontSize: '64px', marginBottom: 'var(--space-4)' }}>🔍</div>
            <h2 className="text-heading-card" style={{ marginBottom: 'var(--space-3)' }}>No dishes match those filters</h2>
            <p className="text-body" style={{ marginBottom: 'var(--space-6)' }}>Try removing a filter or two.</p>
            <button className="btn btn-secondary" onClick={() => setActiveFilters(new Set())}>
              Clear All Filters
            </button>
          </div>
        ) : (
          filteredCategories.map((category) => (
            <section
              key={category.id}
              ref={(el) => { categoryRefs.current[category.id] = el; }}
              style={{ marginBottom: 'var(--space-16)', scrollMarginTop: '130px' }}
              aria-labelledby={`cat-heading-${category.id}`}
            >
              {/* Category header */}
              <div style={{ marginBottom: 'var(--space-8)', borderBottom: '1px solid var(--border)', paddingBottom: 'var(--space-5)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                  <span style={{ fontSize: 'var(--text-3xl)' }} aria-hidden="true">{category.emoji}</span>
                  <h2
                    id={`cat-heading-${category.id}`}
                    className="text-heading-section"
                    style={{ fontSize: 'var(--text-3xl)' }}
                  >
                    {category.name}
                  </h2>
                </div>
                {category.description && (
                  <p className="text-body" style={{ maxWidth: '560px' }}>{category.description}</p>
                )}
              </div>

              {/* Dish grid */}
              <div className="dish-grid">
                {category.items.map((item) => (
                  <DishCard
                    key={item.id}
                    item={item}
                    categoryName={category.name}
                    onOpen={(item, cat) => setSelectedDish({ item, cat })}
                  />
                ))}
              </div>
            </section>
          ))
        )}

        {/* PDF download fallback */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: 'var(--space-10)',
            display: 'flex',
            gap: 'var(--space-4)',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="/OnSixth_Menu.pdf"
            download
            className="btn btn-ghost btn-sm"
            aria-label="Download printable PDF menu"
          >
            <Download size={14} />
            Download Print Menu (PDF)
          </a>
          <a
            href="/menu#cocktails"
            className="btn btn-secondary btn-sm"
          >
            <Wine size={14} />
            View Wine & Cocktails
          </a>
        </div>
      </div>

      {/* Dish Modal */}
      {selectedDish && (
        <DishModal
          item={selectedDish.item}
          categoryName={selectedDish.cat}
          onClose={() => setSelectedDish(null)}
        />
      )}
    </>
  );
}
