import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Plus, MoveRight } from 'lucide-react';
import TextReveal from '@/components/ui/TextReveal';

export const metadata: Metadata = {
  title: 'Our Story & Heritage',
  description:
    'Discover On Sixth\'s story — a tribute to Benoni\'s 19th century gold-rush heritage, combined with 21st century gastronomy. Meet our open kitchen philosophy and culinary journey.',
};

const TIMELINE = [
  {
    year: '1887',
    title: 'Benoni\'s Gold Rush',
    desc: 'The discovery of gold in Ekurhuleni transforms a quiet grassland into a bustling mining town. The spirit of craft, community and the pursuit of excellence is born.',
  },
  {
    year: 'July 2015',
    title: 'On Sixth Opens',
    desc: 'On Sixth Restaurant opens its doors at the Cocoa Bean Centre, Northmead — bringing artisanal cuisine to the heart of Benoni with an open-plan kitchen and a passion for locally-inspired dishes.',
  },
  {
    year: '2019',
    title: 'The Sushi Programme Launches',
    desc: 'Our Japanese-inspired menu expands. The Salmon Sashimi Tower becomes an instant classic — and our most photographed dish to date.',
  },
  {
    year: '2021',
    title: 'Best of Ekurhuleni Awards',
    desc: 'Voted Best Romantic Restaurant and Best Neighbourhood Eatery by thousands of Ekurhuleni readers. A milestone that humbled and energised our entire team.',
  },
  {
    year: '2023',
    title: 'Best Upmarket Restaurant',
    desc: 'Added a third Readers\' Choice Award — Best Upmarket Restaurant in Ekurhuleni — cementing our position as the premier fine-casual dining destination in Benoni.',
  },
  {
    year: 'Today',
    title: '4.8★ & Still Cooking',
    desc: 'Over 1,200 five-star reviews. The same open kitchen. The same devotion to craft. Every dish is a love letter to Benoni and the diners who make this place what it is.',
  },
];

export default function ExperiencePage() {
  return (
    <>
      {/* Strict Typography Hero */}
      <div
        style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'var(--bg-primary)',
          paddingTop: 'var(--space-32)',
          paddingBottom: 'var(--space-20)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="container" style={{ maxWidth: 'var(--container-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
            <div style={{ width: '32px', height: '1px', background: 'var(--obsidian)' }} />
            <span style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', fontWeight: 600, color: 'var(--slate-mid)' }}>
              Rooted in Ekurhuleni&apos;s Golden Era
            </span>
          </div>
          
          <h1
            className="text-heading-hero"
            style={{ 
              color: 'var(--obsidian)',
              marginBottom: 'var(--space-8)',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              lineHeight: 1.05
            }}
          >
            Refined for the Modern <span className="text-highlight">Palate.</span>
          </h1>
          
          <p className="text-body" style={{ fontSize: 'var(--text-lg)', color: 'var(--slate-mid)', maxWidth: '480px' }}>
            A tribute to Benoni&apos;s 19th-century gold-rush heritage, combined with 21st-century culinary precision.
          </p>
        </div>
      </div>

      {/* Asymmetrical Bento Grid */}
      <section style={{ background: 'var(--bg-secondary)', padding: 'var(--space-24) 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-10)' }}>
            
            {/* Card 1 */}
            <div style={{ 
              background: 'var(--bg-primary)', 
              border: '1px solid var(--border)', 
              borderRadius: '8px', 
              padding: 'var(--space-10)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <span style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', color: 'var(--slate-mid)', marginBottom: 'var(--space-16)' }}>
                01 / The Heritage
              </span>
              <h2 className="text-heading-section" style={{ color: 'var(--obsidian)', fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-6)' }}>
                Walls That Tell Stories
              </h2>
              <TextReveal className="text-body" style={{ color: 'var(--slate-mid)', marginBottom: 'var(--space-4)' }}>
                Step inside On Sixth and you'll see them immediately — authentic mining-era newspaper clippings, sepia photographs, and vintage Benoni memorabilia covering every surface. This isn't decoration. It's devotion.
              </TextReveal>
              <TextReveal className="text-body" style={{ color: 'var(--slate-mid)' }}>
                Benoni was built on gold, community, and the pioneering spirit of people who believed in something bigger than themselves. That's the energy we carry into our kitchen every day.
              </TextReveal>
            </div>

            {/* Card 2 */}
            <div style={{ 
              background: 'var(--bg-primary)', 
              border: '1px solid var(--border)', 
              borderRadius: '8px', 
              padding: 'var(--space-10)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <span style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-widest)', color: 'var(--slate-mid)', marginBottom: 'var(--space-16)' }}>
                02 / The Philosophy
              </span>
              <h2 className="text-heading-section" style={{ color: 'var(--obsidian)', fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-6)' }}>
                Nothing to Hide
              </h2>
              <TextReveal className="text-body" style={{ color: 'var(--slate-mid)', marginBottom: 'var(--space-4)' }}>
                Our entire kitchen is open to you. Watch the salmon get sliced. See the pizza dough get stretched over the oblong stone. Watch the cocktails get built layer by layer at the bar.
              </TextReveal>
              <TextReveal className="text-body" style={{ color: 'var(--slate-mid)', marginBottom: 'var(--space-8)' }}>
                We believe transparency creates trust. And trust creates loyalty. Over 7 years, our regulars have become family — because they've seen exactly how much care goes into every plate.
              </TextReveal>
              <div style={{ marginTop: 'auto', display: 'flex', gap: 'var(--space-3)' }}>
                <Link href="/menu" style={{ fontSize: 'var(--text-sm)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--obsidian)' }}>
                  Explore Menu <MoveRight size={14} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Structural Timeline */}
      <section style={{ background: 'var(--bg-primary)', padding: 'var(--space-32) 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--border)', paddingBottom: 'var(--space-6)', marginBottom: 'var(--space-12)' }}>
            <h2 className="text-heading-section" style={{ color: 'var(--obsidian)' }}>The Journey</h2>
            <Clock size={20} style={{ color: 'var(--slate-mid)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
            {TIMELINE.map((item, i) => (
              <div key={item.year} style={{ display: 'flex', gap: 'var(--space-8)' }}>
                <div style={{ width: '80px', flexShrink: 0, paddingTop: '4px' }}>
                  <span style={{ 
                    fontFamily: 'var(--font-mono, monospace)', 
                    fontSize: 'var(--text-sm)', 
                    color: 'var(--slate-mid)',
                    fontWeight: 500
                  }}>
                    {item.year}
                  </span>
                </div>
                
                <div style={{ flex: 1, display: 'flex', gap: 'var(--space-6)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', border: '1px solid var(--obsidian)', background: 'var(--bg-primary)' }} />
                    {i !== TIMELINE.length - 1 && (
                      <div style={{ flex: 1, width: '1px', background: 'var(--border)' }} />
                    )}
                  </div>
                  
                  <div style={{ paddingBottom: i === TIMELINE.length - 1 ? 0 : 'var(--space-12)' }}>
                    <h3 className="text-heading-card" style={{ fontSize: 'var(--text-xl)', color: 'var(--obsidian)', marginBottom: 'var(--space-3)' }}>
                      {item.title}
                    </h3>
                    <p className="text-body" style={{ color: 'var(--slate-mid)', maxWidth: '440px' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
