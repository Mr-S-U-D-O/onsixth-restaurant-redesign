// ============================================================
// ON SIXTH RESTAURANT — FULL MENU DATA
// Structured TypeScript menu with all categories and items
// Prices in ZAR (South African Rand)
// ============================================================

export type DietaryTag = 'vegan' | 'gluten-free' | 'chef-pick' | 'spicy' | 'vegetarian';

export interface MenuOption {
  name: string;
  price: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price?: string;          // Fixed price
  options?: MenuOption[];  // Variable (e.g. sizes / flavours)
  tags?: DietaryTag[];
  chefNotes?: string;
  wineParingNote?: string;
  image?: string;          // Direct image URL for hover reveal & modal
  imagePlaceholder?: string; // Alt text for generated image
}

export interface MenuCategory {
  id: string;
  name: string;
  emoji: string;
  description?: string;
  items: MenuItem[];
}

export const menuData: MenuCategory[] = [
  // ─────────────────────────────────────────
  // STARTERS & SHARING
  // ─────────────────────────────────────────
  {
    id: 'starters',
    name: 'Starters & Sharing',
    emoji: '🍽️',
    description: 'Begin your On Sixth experience with our artisanal small plates',
    items: [
      {
        id: 'on-sixth-skewers',
        name: 'On Sixth Signature Skewers',
        description:
          'Grilled halloumi, chorizo sausage, whole peppadews & balsamic glaze on wood skewers',
        price: '145.00',
        tags: ['chef-pick', 'gluten-free'],
        chefNotes: "Our most-ordered starter — the smoky chorizo against the squeaky halloumi is a flavour contrast we're proud of.",
        image: '/dishes/on-sixth-skewers.jpg',
        imagePlaceholder: 'Grilled skewers with halloumi, chorizo and peppadews on a dark slate board',
      },
      {
        id: 'bruschetta',
        name: 'Bruschetta Trio',
        description:
          'Wood-fired ciabatta with heirloom tomato & basil, whipped ricotta & honey, and avocado & seed mix',
        price: '95.00',
        tags: ['vegetarian'],
        image: '/dishes/bruschetta.jpg',
        imagePlaceholder: 'Three pieces of bruschetta with colourful toppings on a wooden board',
      },
      {
        id: 'calamari',
        name: 'Salt & Pepper Calamari',
        description:
          'Lightly dusted rings with lemon aioli and fresh chilli',
        price: '115.00',
        tags: ['chef-pick'],
        image: '/dishes/calamari.jpg',
        imagePlaceholder: 'Golden calamari rings with aioli dip and lemon wedge',
      },
    ],
  },

  // ─────────────────────────────────────────
  // SUSHI & SASHIMI
  // ─────────────────────────────────────────
  {
    id: 'sushi',
    name: 'Sushi & Sashimi',
    emoji: '🍣',
    description: 'Freshly prepared daily in our open kitchen using premium-grade ingredients',
    items: [
      {
        id: 'salmon-sashimi-tower',
        name: 'Salmon Sashimi Tower',
        description:
          'Layered Norwegian salmon, creamy avocado, Japanese cucumber, tobiko & Kewpie drizzle',
        price: '185.00',
        tags: ['chef-pick', 'gluten-free'],
        chefNotes: 'Slice, stack, savour. Built to impress and disappear fast — our signature dish.',
        wineParingNote: 'Pairs beautifully with a crisp Sauvignon Blanc from Stellenbosch.',
        image: '/dishes/salmon-sashimi-tower.jpg',
        imagePlaceholder: 'Elegant salmon sashimi tower with avocado and tobiko on black slate',
      },
      {
        id: 'california-roll',
        name: 'California Roll (8 pcs)',
        description:
          'Crab sticks, avocado & cucumber, rolled in toasted sesame seeds',
        price: '115.00',
        tags: ['gluten-free'],
        image: '/dishes/california-roll.jpg',
        imagePlaceholder: 'Eight California rolls garnished with sesame seeds on a white plate',
      },
      {
        id: 'spicy-tuna-roll',
        name: 'Spicy Tuna Roll (8 pcs)',
        description:
          'Freshly diced tuna, sriracha mayo, spring onion & crispy shallots',
        price: '135.00',
        tags: ['spicy', 'gluten-free'],
        image: '/dishes/spicy-tuna-roll.jpg',
        imagePlaceholder: 'Spicy tuna rolls with sriracha drizzle and spring onion garnish',
      },
      {
        id: 'rainbow-roll',
        name: 'Rainbow Roll (8 pcs)',
        description:
          'California roll base topped with alternating salmon, tuna & avocado slices',
        price: '155.00',
        tags: ['chef-pick', 'gluten-free'],
        image: '/dishes/rainbow-roll.jpg',
        imagePlaceholder: 'Colourful rainbow roll with alternating fish and avocado toppings',
      },
      {
        id: 'salmon-nigiri',
        name: 'Salmon Nigiri (4 pcs)',
        description: 'Hand-pressed sushi rice topped with fresh Norwegian salmon',
        price: '98.00',
        tags: ['gluten-free'],
        image: '/dishes/salmon-nigiri.jpg',
        imagePlaceholder: 'Four pieces of salmon nigiri with wasabi on the side',
      },
      {
        id: 'sashimi-platter',
        name: 'Mixed Sashimi Platter',
        description:
          'Chef\'s selection of 12 premium slices — salmon, tuna & yellowtail',
        price: '225.00',
        tags: ['chef-pick', 'gluten-free'],
        chefNotes: 'Sliced to order. A showcase of what our open kitchen does best.',
        image: '/dishes/sashimi-platter.jpg',
        imagePlaceholder: 'Elegant mixed sashimi platter with garnish on dark ceramic',
      },
    ],
  },

  // ─────────────────────────────────────────
  // PIZZALADIÈRE (Wood-fired Oblong Pizzas)
  // ─────────────────────────────────────────
  {
    id: 'pizza',
    name: 'Pizzaladière',
    emoji: '🍕',
    description:
      'Our signature oblong wood-fired thin-crust pizzas — a French-Italian fusion. Vegan base available on all.',
    items: [
      {
        id: 'fig-prosciutto',
        name: 'Fig & Prosciutto',
        description:
          'Wood-fired thin oblong crust, fig preserve, prosciutto crudo, fior di latte & balsamic reduction',
        price: '168.00',
        tags: ['chef-pick'],
        chefNotes: 'Sweet, salty, smoky — the most romanticised pizza in Benoni.',
        image: '/dishes/fig-prosciutto.jpg',
        imagePlaceholder: 'Oblong wood-fired pizza with fig, prosciutto and mozzarella on slate',
      },
      {
        id: 'margherita-bianca',
        name: 'Margherita Bianca',
        description:
          'Garlic cream base, fior di latte, heirloom cherry tomatoes, fresh basil & EVOO drizzle',
        price: '135.00',
        tags: ['vegetarian', 'vegan'],
        image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80',
        imagePlaceholder: 'Classic white margherita pizza with fresh basil and cherry tomatoes',
      },
      {
        id: 'bbq-chicken-avocado',
        name: 'BBQ Chicken & Avocado',
        description:
          'Smoky BBQ base, grilled chicken strips, creamy avocado, caramelised onion & jalapeño',
        price: '155.00',
        tags: ['spicy'],
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
        imagePlaceholder: 'BBQ chicken pizza with avocado slices and jalapeño',
      },
      {
        id: 'four-cheese',
        name: 'Quattro Formaggi',
        description:
          'Fior di latte, gorgonzola, pecorino romano & aged parmesan with truffle honey drizzle',
        price: '158.00',
        tags: ['vegetarian', 'chef-pick'],
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
        imagePlaceholder: 'Four-cheese pizza with truffle honey drizzle on rustic board',
      },
      {
        id: 'pepperoni-hot',
        name: 'Double Pepperoni',
        description:
          'Rich tomato base, double layer cupped pepperoni, fior di latte & chilli oil finish',
        price: '148.00',
        tags: ['spicy', 'chef-pick'],
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
        imagePlaceholder: 'Loaded double pepperoni pizza with cupped pepperoni and chilli oil',
      },
      {
        id: 'vegan-roasted-veg',
        name: 'Roasted Garden Veg',
        description:
          'Vegan cream base, roasted courgette, red pepper, artichoke, olives & dukkah crust',
        price: '138.00',
        tags: ['vegan', 'gluten-free'],
        image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80',
        imagePlaceholder: 'Colourful roasted vegetable pizza with dukkah herb crust',
      },
    ],
  },

  // ─────────────────────────────────────────
  // MAINS
  // ─────────────────────────────────────────
  {
    id: 'mains',
    name: 'Mains',
    emoji: '🥩',
    description: 'Hearty signature dishes prepared fresh in our open kitchen',
    items: [
      {
        id: 'sirloin-steak',
        name: '300g Sirloin Steak',
        description:
          'Grain-fed SA sirloin, hand-cut chips, seasonal veg, and your choice of sauce',
        price: '295.00',
        tags: ['gluten-free', 'chef-pick'],
        chefNotes: 'We recommend medium-rare for maximum flavour retention.',
        image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
        imagePlaceholder: 'Thick sirloin steak with char marks, served with chips and sauce',
      },
      {
        id: 'pasta-arrabiata',
        name: 'Penne Arrabiata',
        description:
          'Al-dente penne, fire-roasted tomato, garlic, fresh chilli & parmesan shavings',
        price: '118.00',
        tags: ['vegetarian', 'spicy'],
        image: 'https://images.unsplash.com/photo-1621996346565-e3d5d62817ee?auto=format&fit=crop&w=800&q=80',
        imagePlaceholder: 'Pasta arrabiata with parmesan shavings in a dark ceramic bowl',
      },
      {
        id: 'grilled-salmon',
        name: 'Grilled Atlantic Salmon',
        description:
          'Pan-seared fillet with lemon butter, wilted spinach, roasted baby potatoes & capers',
        price: '245.00',
        tags: ['gluten-free', 'chef-pick'],
        wineParingNote: 'Excellent with an unoaked Chardonnay or crisp Rosé.',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
        imagePlaceholder: 'Pan-seared salmon fillet with lemon butter and spinach',
      },
    ],
  },

  // ─────────────────────────────────────────
  // DESSERTS
  // ─────────────────────────────────────────
  {
    id: 'desserts',
    name: 'Desserts',
    emoji: '🍮',
    description: 'Sweet finales crafted to leave a lasting impression',
    items: [
      {
        id: 'malva-pudding',
        name: 'Malva Pudding',
        description:
          'Classic SA malva with salted caramel sauce, vanilla bean ice cream & candied pecan',
        price: '78.00',
        tags: ['vegetarian', 'chef-pick'],
        image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
        imagePlaceholder: 'Warm malva pudding with caramel sauce and ice cream in dark bowl',
      },
      {
        id: 'chocolate-lava',
        name: 'Dark Chocolate Lava Cake',
        description:
          'Warm 70% cacao fondant with molten centre, served with Oreo crumb & mascarpone',
        price: '88.00',
        tags: ['vegetarian'],
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
        imagePlaceholder: 'Chocolate lava cake with molten centre pouring onto plate',
      },
      {
        id: 'cheesecake',
        name: 'New York Vanilla Cheesecake',
        description:
          'Baked Philadelphia cream cheese, berry compote & crushed amaretti base',
        price: '82.00',
        tags: ['vegetarian'],
        image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
        imagePlaceholder: 'New York cheesecake slice with berry compote on white plate',
      },
    ],
  },

  // ─────────────────────────────────────────
  // DRINKS — NON-ALCOHOLIC
  // ─────────────────────────────────────────
  {
    id: 'drinks-non-alcoholic',
    name: 'Non-Alcoholic Drinks',
    emoji: '🥤',
    items: [
      {
        id: 'rock-shandy',
        name: 'Rock Shandy',
        price: '50.00',
        tags: ['vegan'],
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
        imagePlaceholder: 'Rock shandy in a tall glass with ice and lemon',
      },
      {
        id: 'fruit-teazer-crushes',
        name: 'Fruit Teazer Crushes',
        description: 'Fresh fruit crushes made with Oros and soda',
        tags: ['vegan'],
        options: [
          { name: 'Lemon & Mint Crush',  price: '52.00' },
          { name: 'Strawberry Crush',    price: '52.00' },
          { name: 'Granadilla Crush',    price: '52.00' },
          { name: 'Mango Crush',         price: '52.00' },
        ],
        image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=800&q=80',
        imagePlaceholder: 'Colourful fruit crushes in glasses with fresh fruit garnish',
      },
      {
        id: 'mocktails',
        name: 'Signature Mocktail',
        description: 'Ask your server for today\'s featured zero-proof creation',
        price: '65.00',
        tags: ['vegan'],
        image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
        imagePlaceholder: 'Elegant mocktail in a coupe glass with fresh herbs',
      },
    ],
  },

  // ─────────────────────────────────────────
  // DRINKS — COCKTAILS
  // ─────────────────────────────────────────
  {
    id: 'cocktails',
    name: 'Cocktails & Spirits',
    emoji: '🍸',
    description: 'Handcrafted cocktails featuring Limoncello and artisan spirits',
    items: [
      {
        id: 'limoncello-spritz',
        name: 'Limoncello Spritz',
        description:
          'House-made Limoncello, Prosecco, fresh lemon, mint & soda over ice',
        price: '115.00',
        tags: ['chef-pick'],
        chefNotes: 'Our house Limoncello — a labour of love, steeped for 30 days.',
        image: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&w=800&q=80',
        imagePlaceholder: 'Limoncello spritz cocktail in a wine glass with fresh lemon and mint',
      },
      {
        id: 'negroni',
        name: 'Classic Negroni',
        description: 'Gin, Campari & sweet vermouth stirred over a large ice block',
        price: '125.00',
        image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=800&q=80',
        imagePlaceholder: 'Dark red Negroni in a rocks glass with orange peel garnish',
      },
      {
        id: 'passion-mojito',
        name: 'Passion Fruit Mojito',
        description: 'White rum, fresh lime, passionfruit pulp, mint & soda',
        price: '115.00',
        tags: ['spicy'],
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
        imagePlaceholder: 'Passion fruit mojito in a highball glass with mint and lime',
      },
      {
        id: 'wine-red',
        name: 'House Red Wine (Glass)',
        description: 'Rotating selection from South Africa\'s premier wine estates',
        price: '68.00',
        image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80',
        imagePlaceholder: 'Deep red wine in an elegant glass',
      },
      {
        id: 'wine-white',
        name: 'House White Wine (Glass)',
        description: 'Crisp Sauvignon Blanc or Chardonnay — ask your server',
        price: '65.00',
        image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=800&q=80',
        imagePlaceholder: 'Chilled white wine in an elegant glass',
      },
    ],
  },
];

// ── Helper: Get all items flat ──
export function getAllMenuItems(): MenuItem[] {
  return menuData.flatMap((cat) => cat.items);
}

// ── Helper: Filter by dietary tag ──
export function filterByTag(tag: DietaryTag): MenuItem[] {
  return getAllMenuItems().filter((item) => item.tags?.includes(tag));
}

// ── Helper: Get category by ID 
export function getCategoryById(id: string): MenuCategory | undefined {
  return menuData.find((cat) => cat.id === id);
}
