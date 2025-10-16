// One-off Firestore seeding script. Do NOT bundle into the app.
// Usage:
//   1) Create a Firebase service account (Owner/Editor) and download the JSON key
//   2) Set env: set GOOGLE_APPLICATION_CREDENTIALS=path\to\service-account.json (Windows)
//      or export GOOGLE_APPLICATION_CREDENTIALS=... (macOS/Linux)
//   3) Run: npm run seed:firestore

import * as admin from 'firebase-admin';

const credsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (!credsPath) {
  console.error('GOOGLE_APPLICATION_CREDENTIALS env var not set. Aborting.');
  process.exit(1);
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const db = admin.firestore();

const products = [
  {
    name: 'Premium Fish Feed',
    description: 'Expertly balanced with proteins, vitamins, and essential minerals to support rapid growth.',
    price: 29.99,
    category: 'Fish Feed',

    features: ['High protein', 'Fast growth', 'Balanced minerals'],
    image: 'https://images.unsplash.com/photo-1573821663912-1c94c6a59b89?q=80&w=1600&auto=format&fit=crop',
  },
  {
    name: 'Complete Dog Food',
    description: 'Formulated to promote a shiny coat, strong teeth, and optimal digestion.',
    price: 39.99,
    category: 'Dog Food',

    features: ['Shiny coat', 'Strong teeth', 'Easy digestion'],
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1600&auto=format&fit=crop',
  },
  {
    name: 'Groundnut Meal',
    description: 'A rich source of healthy fats and proteins to energize and sustain animal growth.',
    price: 24.5,
    category: 'Groundnut Meal',

    features: ['Healthy fats', 'High protein', 'Energy boost'],
    image: 'https://images.unsplash.com/photo-1518030131755-46f2932ee0eb?q=80&w=1600&auto=format&fit=crop',
  },
  {
    name: 'Soybean Meal',
    description: 'Rich in essential amino acids for stronger, healthier livestock and fish.',
    price: 32.0,
    category: 'Soybean Meal',

    features: ['Amino acids', 'Muscle growth', 'Nutrient dense'],
    image: 'https://images.unsplash.com/photo-1546549039-53db8c5dfedb?q=80&w=1600&auto=format&fit=crop',
  },
];

async function main() {
  const batch = db.batch();
  const col = db.collection('products');

  for (const p of products) {
    const docRef = col.doc(p.name.toLowerCase().replace(/\s+/g, '-'));
    batch.set(docRef, { ...p, updatedAt: new Date(), createdAt: new Date() }, { merge: true });
  }
  await batch.commit();
  console.log('Seeded products to Firestore.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
