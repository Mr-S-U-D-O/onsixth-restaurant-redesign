export const MENU_DATA = [
  {
    name: "Rock Shandy",
    price: "R50.00",
    tags: ["drink", "beverage", "refreshing", "mocktail"],
    allergens: []
  },
  {
    name: "Pizzaladiere",
    price: "R120.00",
    tags: ["pizza", "wood-fired", "main", "oblong"],
    allergens: ["dairy", "gluten"]
  },
  {
    name: "Premium Salmon Sashimi",
    price: "R150.00",
    tags: ["sushi", "salmon", "raw", "fish", "starter"],
    allergens: ["fish", "soy"]
  },
  {
    name: "Beef Fillet Steak",
    price: "R280.00",
    tags: ["steak", "beef", "meat", "main", "grill"],
    allergens: []
  },
  {
    name: "Mushroom Truffle Risotto",
    price: "R160.00",
    tags: ["risotto", "mushroom", "vegetarian", "main"],
    allergens: ["dairy"]
  }
];

export const WINE_PAIRINGS: Record<string, string> = {
  "steak": "I highly recommend pairing our Beef Fillet with the **Rupert & Rothschild Classique** or a robust **Cabernet Sauvignon**.",
  "beef": "Our beef dishes pair beautifully with a strong **Shiraz** or a **Cabernet Sauvignon**.",
  "sushi": "For sushi, a crisp **Sauvignon Blanc** or a chilled **Chardonnay** complements the fresh fish perfectly.",
  "salmon": "Salmon pairs exceptionally well with a lightly oaked **Chardonnay** or a dry **Rosé**.",
  "pizza": "Our wood-fired pizzas go great with an Italian-style **Sangiovese** or a light **Pinot Noir**.",
  "risotto": "The earthy truffle in our risotto is beautifully enhanced by a **Pinot Noir**."
};

export function checkAllergens(input: string): string | null {
  const normalized = input.toLowerCase();
  
  if (normalized.includes("dairy") || normalized.includes("milk") || normalized.includes("cheese")) {
    return "Our Pizzaladiere and Mushroom Risotto contain dairy. Most of our sushi and steaks can be prepared dairy-free.";
  }
  if (normalized.includes("gluten") || normalized.includes("wheat") || normalized.includes("bread")) {
    return "Our Pizzas contain gluten. However, we offer gluten-free bases on request, and our sushi (without soy sauce) is a great gluten-free option.";
  }
  if (normalized.includes("nut") || normalized.includes("peanut")) {
    return "While we don't have peanuts in our main dishes, our kitchen handles various tree nuts for desserts. Please inform your waiter when you arrive.";
  }
  if (normalized.includes("vegan") || normalized.includes("vegetarian")) {
    return "We have excellent vegetarian options, like our Mushroom Truffle Risotto. We can also prepare vegan sushi rolls upon request.";
  }
  
  return null;
}
