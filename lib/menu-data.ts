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
        chefNotes: 'Our most-ordered starter — the smoky chorizo against the squeaky halloumi is a flavour contrast we're proud of.',
        imagePlaceholder: 'Grilled skewers with halloumi, chorizo and peppadews on a dark slate board',
      },
      {
        id: 'bruschetta',
        name: 'Bruschetta Trio',
        description:
          'Wood-fired ciabatta with heirloom tomato & basil, whipped ricotta & honey, and avocado & seed mix',
        price: '95.00',
        tags: ['vegetarian'],
        imagePlaceholder: 'Three pieces of bruschetta with colourful toppings on a wooden board',
      },
      {
        id: 'calamari',
        name: 'Salt & Pepper Calamari',
        description:
          'Lightly dusted rings with lemon aioli and fresh chilli',
        price: '115.00',
        tags: ['chef-pick'],
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
        imagePlaceholder: 'Elegant salmon sashimi tower with avocado and tobiko on black slate',
      },
      {
        id: 'california-roll',
        name: 'California Roll (8 pcs)',
        description:
          'Crab sticks, avocado & cucumber, rolled in toasted sesame seeds',
        price: '115.00',
        tags: ['gluten-free'],
        imagePlaceholder: 'Eight California rolls garnished with sesame seeds on a white plate',
      },
      {
        id: 'spicy-tuna-roll',
        name: 'Spicy Tuna Roll (8 pcs)',
        description:
          'Freshly diced tuna, sriracha mayo, spring onion & crispy shallots',
        price: '135.00',
        tags: ['spicy', 'gluten-free'],
        imagePlaceholder: 'Spicy tuna rolls with sriracha drizzle and spring onion garnish',
      },
      {
        id: 'rainbow-roll',
        name: 'Rainbow Roll (8 pcs)',
        description:
          'California roll base topped with alternating salmon, tuna & avocado slices',
        price: '155.00',
        tags: ['chef-pick', 'gluten-free'],
        imagePlaceholder: 'Colourful rainbow roll with alternating fish and avocado toppings',
      },
      {
        id: 'salmon-nigiri',
        name: 'Salmon Nigiri (4 pcs)',
        description: 'Hand-pressed sushi rice topped with fresh Norwegian salmon',
        price: '98.00',
        tags: ['gluten-free'],
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
        imagePlaceholder: 'Oblong wood-fired pizza with fig, prosciutto and mozzarella on slate',
      },
      {
        id: 'margherita-bianca',
        name: 'Margherita Bianca',
        description:
          'Garlic cream base, fior di latte, heirloom cherry tomatoes, fresh basil & EVOO drizzle',
        price: '135.00',
        tags: ['vegetarian', 'vegan'],
        imagePlaceholder: 'Classic white margherita pizza with fresh basil and cherry tomatoes',
      },
      {
        id: 'bbq-chicken-avocado',
        name: 'BBQ Chicken & Avocado',
        description:
          'Smoky BBQ base, grilled chicken strips, creamy avocado, caramelised onion & jalapeño',
        price: '155.00',
        tags: ['spicy'],
        imagePlaceholder: 'BBQ chicken pizza with avocado slices and jalapeño',
      },
      {
        id: 'four-cheese',
        name: 'Quattro Formaggi',
        description:
          'Fior di latte, gorgonzola, pecorino romano & aged parmesan with truffle honey drizzle',
        price: '158.00',
        tags: ['vegetarian', 'chef-pick'],
        imagePlaceholder: 'Four-cheese pizza with truffle honey drizzle on rustic board',
      },
      {
        id: 'pepperoni-hot',
        name: 'Double Pepperoni',
        description:
          'Rich tomato base, double layer cupped pepperoni, fior di latte & chilli oil finish',
        price: '148.00',
        tags: ['spicy', 'chef-pick'],
        imagePlaceholder: 'Loaded double pepperoni pizza with cupped pepperoni and chilli oil',
      },
      {
        id: 'vegan-roasted-veg',
        name: 'Roasted Garden Veg',
        description:
          'Vegan cream base, roasted courgette, red pepper, artichoke, olives & dukkah crust',
        price: '138.00',
        tags: ['vegan', 'gluten-free'],
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
        imagePlaceholder: 'Thick sirloin steak with char marks, served with chips and sauce',
      },
      {
        id: 'pasta-arrabiata',
        name: 'Penne Arrabiata',
        description:
          'Al-dente penne, fire-roasted tomato, garlic, fresh chilli & parmesan shavings',
        price: '118.00',
        tags: ['vegetarian', 'spicy'],
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
        imagePlaceholder: 'Warm malva pudding with caramel sauce and ice cream in dark bowl',
      },
      {
        id: 'chocolate-lava',
        name: 'Dark Chocolate Lava Cake',
        description:
          'Warm 70% cacao fondant with molten centre, served with Oreo crumb & mascarpone',
        price: '88.00',
        tags: ['vegetarian'],
        imagePlaceholder: 'Chocolate lava cake with molten centre pouring onto plate',
      },
      {
        id: 'cheesecake',
        name: 'New York Vanilla Cheesecake',
        description:
          'Baked Philadelphia cream cheese, berry compote & crushed amaretti base',
        price: '82.00',
        tags: ['vegetarian'],
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
        imagePlaceholder: 'Colourful fruit crushes in glasses with fresh fruit garnish',
      },
      {
        id: 'mocktails',
        name: 'Signature Mocktail',
        description: 'Ask your server for today\'s featured zero-proof creation',
        price: '65.00',
        tags: ['vegan'],
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
        imagePlaceholder: 'Limoncello spritz cocktail in a wine glass with fresh lemon and mint',
      },
      {
        id: 'negroni',
        name: 'Classic Negroni',
        description: 'Gin, Campari & sweet vermouth stirred over a large ice block',
        price: '125.00',
        imagePlaceholder: 'Dark red Negroni in a rocks glass with orange peel garnish',
      },
      {
        id: 'passion-mojito',
        name: 'Passion Fruit Mojito',
        description: 'White rum, fresh lime, passionfruit pulp, mint & soda',
        price: '115.00',
        tags: ['spicy'],
        imagePlaceholder: 'Passion fruit mojito in a highball glass with mint and lime',
      },
      {
        id: 'wine-red',
        name: 'House Red Wine (Glass)',
        description: 'Rotating selection from South Africa\'s premier wine estates',
        price: '68.00',
        imagePlaceholder: 'Deep red wine in an elegant glass',
      },
      {
        id: 'wine-white',
        name: 'House White Wine (Glass)',
        description: 'Crisp Sauvignon Blanc or Chardonnay — ask your server',
        price: '65.00',
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

// ── Helper: Get category by ID ──
export function getCategoryById(id: string): MenuCategory | undefined {
  return menuData.find((cat) => cat.id === id);
}
