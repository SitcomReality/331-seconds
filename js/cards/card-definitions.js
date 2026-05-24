export const CARD_DEFINITIONS = {
  // Privileged cards
  trustFund: {
    id: 'trustFund',
    name: 'Trust Fund',
    type: 'action',
    description: 'Inherited wealth provides steady income.',
    effects: { capital: 20, fulfillment: -5 },
    color: 45,
    quality: 'wealthy'
  },
  
  legacy: {
    id: 'legacy',
    name: 'Legacy Admission',
    type: 'action',
    description: 'Doors open automatically.',
    effects: { capital: 15, fulfillment: 10 },
    color: 50,
    quality: 'wealthy'
  },
  
  // Disadvantaged cards
  debt: {
    id: 'debt',
    name: 'Generational Debt',
    type: 'event',
    description: 'The weight of the past.',
    effects: { capital: -15, vitality: -5 },
    color: 0,
    quality: 'poor'
  },
  
  struggle: {
    id: 'struggle',
    name: 'Daily Struggle',
    type: 'action',
    description: 'Work exhausts, barely sustains.',
    effects: { capital: 5, vitality: -10, fulfillment: -5 },
    color: 15,
    quality: 'poor'
  },
  
  // Neutral cards
  education: {
    id: 'education',
    name: 'Study',
    type: 'action',
    description: 'Knowledge accumulates slowly.',
    effects: { capital: 10, fulfillment: 5 },
    color: 200,
    quality: 'neutral'
  },
  
  rest: {
    id: 'rest',
    name: 'Rest',
    type: 'action',
    description: 'Recovery takes time.',
    effects: { vitality: 15, capital: -5 },
    color: 220,
    quality: 'neutral'
  }
};