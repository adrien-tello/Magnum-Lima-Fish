import { Product, BlogPost } from '../types';

// All product prices are aligned to 22,000 FCFA for display.
// With the default conversion rate VITE_USD_TO_XAF=600, that equals ~36.6667 USD.
const USD_FOR_22000_XAF = 22000 / (Number(import.meta.env.VITE_USD_TO_XAF ?? 600));

export const products: Product[] = [
  {
    id: '1',
    name: 'Fish Feed',
    description: 'Advanced biotechnology solution for sustainable agriculture',
    price: USD_FOR_22000_XAF,
    image: 'https://www.lima-biotech.com/wp-content/uploads/2024/08/Fish-Health-Guard_%E5%89%AF%E6%9C%AC.png?auto=compress&cs=tinysrgb&w=500',
    category: 'Fish Feed',
    features: ['Organic certified', 'High yield', 'Weather resistant']
  },
  {
    id: '2',
    name: 'Dog Food',
    description: 'Premium genetically optimized seeds for modern farming',
    price: USD_FOR_22000_XAF,
    image: 'https://i.pinimg.com/736x/cd/06/3d/cd063daa660c3064f91221ba2a5f0470.jpg?auto=compress&cs=tinysrgb&w=500',
    category: 'Dog Food',
    features: ['Fast growth', 'Disease resistant', 'High nutrition']
  },
  {
    id: '3',
    name: 'Groundnut Meal',
    description: 'Innovative water management technology for crops',
    price: USD_FOR_22000_XAF,
    image: 'https://thumbs.dreamstime.com/b/peanut-groundnut-bag-isolated-white-background-burlap-heap-sack-full-burlap-72552931.jpg?auto=compress&cs=tinysrgb&w=500',
    category: 'Groundnut Meal',
    features: ['Smart irrigation', 'Water saving', 'Remote monitoring']
  },
  {
    id: '4',
    name: 'Soybean Meal',
    description: 'Natural fertilizer blend for enhanced crop production',
    price: USD_FOR_22000_XAF,
    image: 'https://i.pinimg.com/1200x/b4/7b/9d/b47b9d25d4de92954cb5fdb051dc4db3.jpg?auto=compress&cs=tinysrgb&w=500',
    category: 'Soybean Meal',
    features: ['100% natural', 'Soil enrichment', 'Long lasting']
  },
  {
    id: '5',
    name: 'Dog Food',
    description: 'Premium genetically optimized seeds for modern farming',
    price: USD_FOR_22000_XAF,
    image: 'https://img.petfoodindustry.com/files/base/wattglobalmedia/all/image/2016/04/pfi.Prolamina-Pro-Dura-polypropylene-woven-bags.png?auto=format%2Ccompress&q=70&w=400?auto=compress&cs=tinysrgb&w=300',
    category: 'Dog Food',
    features: ['Fast growth', 'Disease resistant', 'High nutrition']
  },
  {
    id: '1-dup',
    name: 'Fish Feed',
    description: 'Advanced biotechnology solution for sustainable agriculture',
    price: USD_FOR_22000_XAF,
    image: 'https://www.lima-biotech.com/wp-content/uploads/2024/08/aquatic-animal-growth-prompter.png?auto=compress&cs=tinysrgb&w=500',
    category: 'Fish Feed',
    features: ['Organic certified', 'High yield', 'Weather resistant']
  },
  {
    id: '2-dup',
    name: 'Dog Food',
    description: 'Premium genetically optimized seeds for modern farming',
    price: USD_FOR_22000_XAF,
    image: 'https://www.lima-biotech.com/wp-content/uploads/2024/08/anti-stress-king-lima-biotech.png?auto=compress&cs=tinysrgb&w=500',
    category: 'Dog Food',
    features: ['Fast growth', 'Disease resistant', 'High nutrition']
  },
  {
    id: '3-dup',
    name: 'Groundnut Meal',
    description: 'Innovative water management technology for crops',
    price: USD_FOR_22000_XAF,
    image: 'https://5.imimg.com/data5/XM/GB/QJ/SELLER-93677435/groundnut-shell-500x500.jpg?auto=compress&cs=tinysrgb&w=500',
    category: 'Groundnut Meal',
    features: ['Smart irrigation', 'Water saving', 'Remote monitoring']
  },
  {
    id: '4-dup',
    name: 'Soybean Meal',
    description: 'Natural fertilizer blend for enhanced crop production',
    price: USD_FOR_22000_XAF,
    image: 'https://flyfarm.com.au/wp-content/uploads/2020/12/waste-soy-waste-600x338.jpg?auto=compress&cs=tinysrgb&w=500',
    category: 'Soybean Meal',
    features: ['100% natural', 'Soil enrichment', 'Long lasting']
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Sustainable Agriculture',
    excerpt: 'Exploring innovative biotechnology solutions that are shaping the future of farming',
    image: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=500',
    date: '2024-01-15',
    author: 'Dr. Sarah Johnson'
  },
  {
    id: '2',
    title: 'Smart Farming Technologies',
    excerpt: 'How AI and IoT are revolutionizing agricultural practices worldwide',
    image: 'https://images.pexels.com/photos/1407269/pexels-photo-1407269.jpeg?auto=compress&cs=tinysrgb&w=500',
    date: '2024-01-10',
    author: 'Mike Chen'
  },
  {
    id: '3',
    title: 'Global Food Security Solutions',
    excerpt: 'Addressing world hunger through innovative biotechnology approaches',
    image: 'https://images.pexels.com/photos/1459339/pexels-photo-1459339.jpeg?auto=compress&cs=tinysrgb&w=500',
    date: '2024-01-05',
    author: 'Emma Rodriguez'
  }
];
