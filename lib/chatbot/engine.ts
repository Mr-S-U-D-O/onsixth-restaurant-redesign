import { hasIntent } from './nlp';
import { checkAllergens, WINE_PAIRINGS } from './menuData';

export type ChatState = {
  userName: string | null;
  flowState: 'IDLE' | 'BOOKING_PARTY_SIZE' | 'BOOKING_DATE' | 'BOOKING_TIME';
  booking: {
    partySize: string | null;
    date: string | null;
    time: string | null;
  };
};

export type EngineResponse = {
  text: string;
  suggestions: string[];
  newState: ChatState;
};

// Check if the restaurant is currently open
function getStatusString(): string {
  const now = new Date();
  const hours = now.getHours();
  const day = now.getDay(); // 0 = Sunday
  
  if (hours < 12) return "We open at 12:00 PM today.";
  
  // Sundays close at 18:00
  if (day === 0 && hours >= 18) return "We are currently closed. We reopen tomorrow at 12:00 PM.";
  
  // Friday/Saturday close at 22:00
  if ((day === 5 || day === 6) && hours >= 22) return "We are currently closed for the night.";
  
  // Mon-Thu close at 21:00
  if (day >= 1 && day <= 4 && hours >= 21) return "We are currently closed for the night.";
  
  return "We are currently **open**! We'd love to host you.";
}

function getTimeOfDayGreeting(): string {
  const hours = new Date().getHours();
  if (hours < 12) return "Good morning";
  if (hours < 17) return "Good afternoon";
  return "Good evening";
}

export function processInput(input: string, currentState: ChatState, pathname: string): EngineResponse {
  const state = { ...currentState };

  const normalized = input.toLowerCase();

  // 1. Handle in-progress Booking Flow
  if (state.flowState === 'BOOKING_PARTY_SIZE') {
    state.booking.partySize = input;
    state.flowState = 'BOOKING_DATE';
    return {
      text: `Great, a table for ${input}. What **date** would you like to book? (e.g., "Tomorrow", "Next Friday", or "12th Oct")`,
      suggestions: ["Today", "Tomorrow", "This Friday"],
      newState: state
    };
  }
  
  if (state.flowState === 'BOOKING_DATE') {
    state.booking.date = input;
    state.flowState = 'BOOKING_TIME';
    return {
      text: `Got it, ${input}. And what **time** do you prefer? (We are open from 12:00 PM)`,
      suggestions: ["18:00", "19:00", "19:30", "20:00"],
      newState: state
    };
  }

  if (state.flowState === 'BOOKING_TIME') {
    state.booking.time = input;
    state.flowState = 'IDLE';
    // Generate WhatsApp link
    const text = encodeURIComponent(`Hi, I'd like to book a table for ${state.booking.partySize} on ${state.booking.date} at ${state.booking.time}.`);
    const waLink = `https://wa.me/27114251668?text=${text}`;
    
    // Clear booking state
    state.booking = { partySize: null, date: null, time: null };

    return {
      text: `Perfect! I've prepared your booking request. \n\n<a href="${waLink}" target="_blank" class="btn btn-whatsapp" style="display:inline-flex;margin-top:8px;">Send Booking via WhatsApp</a>`,
      suggestions: ["Show me the menu", "Where are you located?"],
      newState: state
    };
  }

  // 2. Command Palette Mode
  if (normalized.startsWith('/')) {
    if (normalized === '/menu') return { text: "You can view our full menu [here](/menu).", suggestions: [], newState: state };
    if (normalized === '/hours') return { text: getStatusString(), suggestions: ["Book a table"], newState: state };
    if (normalized === '/book') {
      state.flowState = 'BOOKING_PARTY_SIZE';
      return { text: "Let's book a table! How many people are in your party?", suggestions: ["2", "4", "6", "8+ (Private Function)"], newState: state };
    }
  }

  // 3. Name memory extraction
  const nameMatch = normalized.match(/my name is (\w+)|i am (\w+)|i'm (\w+)/);
  if (nameMatch) {
    const name = nameMatch[1] || nameMatch[2] || nameMatch[3];
    state.userName = name.charAt(0).toUpperCase() + name.slice(1);
    const responseText = `Nice to meet you, ${state.userName}! How can I assist you today?`;
    return { text: responseText, suggestions: ["Book a table", "View menu"], newState: state };
  }

  // 4. Intent parsing
  const isGreeting = hasIntent(input, ["hello", "hi", "hey", "greetings", "morning", "afternoon", "evening"]);
  const isBooking = hasIntent(input, ["reserve", "book", "table", "reservation"]);
  const isLocation = hasIntent(input, ["location", "where", "address", "find", "map", "directions"]);
  const isHours = hasIntent(input, ["open", "closed", "hours", "time"]);
  const isFaq = hasIntent(input, ["parking", "dress", "code", "corkage", "halal", "kosher"]);
  const isMenu = hasIntent(input, ["menu", "food", "eat", "dish", "recommend"]);
  
  // Check allergens specifically
  const allergenInfo = checkAllergens(input);
  if (allergenInfo) {
    return { text: allergenInfo, suggestions: ["View full menu", "Book a table"], newState: state };
  }

  // Check wine pairings
  for (const [food, pairing] of Object.entries(WINE_PAIRINGS)) {
    if (normalized.includes(food)) {
      return { text: pairing, suggestions: ["Book a table", "View full menu"], newState: state };
    }
  }

  if (isBooking) {
    // If they ask for Friday at 7pm in one go (Availability simulation)
    if (normalized.includes('friday') && (normalized.includes('7') || normalized.includes('19'))) {
       return { 
         text: "Friday at 19:00 is one of our peak times! I highly recommend securing your table right now. Should I start the booking process?", 
         suggestions: ["Yes, let's book", "No, just looking"], 
         newState: state 
       };
    }

    if (normalized.includes('yes') && state.flowState === 'IDLE') {
      state.flowState = 'BOOKING_PARTY_SIZE';
      return { text: "Excellent. Let's start with your **Party Size**.", suggestions: ["2", "4", "6"], newState: state };
    }

    state.flowState = 'BOOKING_PARTY_SIZE';
    return {
      text: "I can help you reserve a table right here. **How many people** will be joining?",
      suggestions: ["2 Guests", "4 Guests", "6 Guests", "8+ Guests"],
      newState: state
    };
  }

  if (isLocation) {
    return {
      text: "We are located at **Cocoa Bean Centre, Shop A1**, Cnr 2nd St & 6th Ave, Northmead, Benoni.\n\n[Open in Google Maps](https://maps.google.com/?q=On+Sixth+Restaurant+Cocoa+Bean+Centre+Northmead+Benoni)",
      suggestions: ["Are you open?", "Book a table"],
      newState: state
    };
  }

  if (isHours) {
    return {
      text: `${getStatusString()} Our normal hours are:\n- Mon-Thu: 12:00 – 21:00\n- Fri-Sat: 12:00 – 22:00\n- Sun: 12:00 – 18:00`,
      suggestions: ["Book a table", "View location"],
      newState: state
    };
  }

  if (isFaq) {
    if (normalized.includes("parking")) return { text: "We have secure, free parking available right outside the Cocoa Bean Centre.", suggestions: [], newState: state };
    if (normalized.includes("dress")) return { text: "Our dress code is **smart casual**. Come as you are, but many guests enjoy dressing up for the evening.", suggestions: [], newState: state };
    if (normalized.includes("corkage")) return { text: "We offer a wide selection of premium wines, but if you have a special bottle, our corkage fee is **R80 per bottle**.", suggestions: [], newState: state };
  }

  if (isMenu) {
    return {
      text: "Our menu features premium **Sushi & Sashimi**, artisanal wood-fired **Pizzaladière**, and high-end grills.\n\nAre you looking for something specific, or would you like a wine pairing recommendation?",
      suggestions: ["Show me Sushi", "Show me Pizza", "Wine Pairings"],
      newState: state
    };
  }

  if (isGreeting) {
    const greeting = getTimeOfDayGreeting();
    const nameStr = state.userName ? ` ${state.userName}` : '';
    
    // Page aware context
    let contextStr = "How can I assist you today?";
    if (pathname === '/menu') contextStr = "Looking for a specific dish recommendation or allergen info?";
    if (pathname === '/reservations') contextStr = "Need help finding the perfect time or seating arrangement?";
    if (pathname === '/contact') contextStr = "Need directions or our phone number?";

    return {
      text: `${greeting}${nameStr}! ${contextStr}`,
      suggestions: ["Book a table", "View menu highlights", "Where are you located?"],
      newState: state
    };
  }

  // Fallback
  return {
    text: "I'm sorry, I didn't quite catch that. I can help you book a table, answer questions about our menu, or give you directions.",
    suggestions: ["Book a table", "Menu information", "Operating hours"],
    newState: state
  };
}
