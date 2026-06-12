/**
 * Seed script — populates the database with a known admin, a test user, and
 * sample categories / subcategories / brands / products (with generated
 * placeholder images) so the storefront is not empty.
 *
 *   npm run seed
 */
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const sharp = require('sharp');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const { uploadBuffer } = require('../config/cloudinary');
const User = require('../models/userModel');
const Category = require('../models/categoryModel');
const SubCategory = require('../models/subCategoryModel');
const Brand = require('../models/brandModel');
const Product = require('../models/productModel');

const COLORS = ['#3F4F44', '#A27B5C', '#2C3930', '#DCD7C9', '#5C8374', '#7C444F'];

// Generate a labeled placeholder JPEG, upload it to Cloudinary and return its URL.
async function makePlaceholder(folder, label, prefix) {
  const bg = COLORS[Math.abs(hashCode(label)) % COLORS.length];
  const safe = String(label).replace(/[<>&]/g, '').slice(0, 22);
  const svg = `
    <svg width="600" height="600" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="600" fill="${bg}"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="40"
        fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${safe}</text>
    </svg>`;

  const filename = `${prefix}-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  const buffer = await sharp(Buffer.from(svg)).jpeg({ quality: 85 }).toBuffer();
  return uploadBuffer(buffer, folder, filename);
}

function hashCode(str) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return h;
}

const CATEGORIES = ['إلكترونيات', 'ملابس', 'أحذية', 'إكسسوارات'];
const BRANDS = ['Apple', 'Samsung', 'Nike', 'Adidas', 'Sony'];

async function seed() {
  await mongoose.connect(process.env.DB_URI);
  console.log('✅ Connected to DB for seeding');

  // Wipe existing data
  await Promise.all([
    User.deleteMany({}),
    Category.deleteMany({}),
    SubCategory.deleteMany({}),
    Brand.deleteMany({}),
    Product.deleteMany({}),
  ]);
  console.log('🧹 Cleared existing collections');

  // Users (passwords hashed by the model pre-save hook)
  await User.create({
    name: 'Admin',
    email: 'admin@gmail.com',
    password: 'pass123',
    phone: '01000000000',
    role: 'admin',
  });
  await User.create({
    name: 'Test User',
    email: 'user@gmail.com',
    password: 'pass123',
    phone: '01111111111',
    role: 'user',
  });
  console.log('👤 Created admin@gmail.com / pass123 and user@gmail.com / pass123');

  // Categories
  const categories = [];
  for (const name of CATEGORIES) {
    const image = await makePlaceholder('categories', name, 'category');
    // eslint-disable-next-line no-await-in-loop
    const cat = await Category.create({ name, slug: slugifyish(name), image });
    categories.push(cat);
  }
  console.log(`📂 Created ${categories.length} categories`);

  // Subcategories (2 per category)
  const subcategories = [];
  for (const cat of categories) {
    for (let i = 1; i <= 2; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const sub = await SubCategory.create({
        name: `${cat.name} - فرع ${i}`,
        slug: slugifyish(`${cat.name}-${i}`),
        category: cat._id,
      });
      subcategories.push(sub);
    }
  }
  console.log(`🗂️  Created ${subcategories.length} subcategories`);

  // Brands
  const brands = [];
  for (const name of BRANDS) {
    const image = await makePlaceholder('brands', name, 'brand');
    // eslint-disable-next-line no-await-in-loop
    const brand = await Brand.create({ name, slug: slugifyish(name), image });
    brands.push(brand);
  }
  console.log(`🏷️  Created ${brands.length} brands`);

  // Products (5 per category = 20)
  let count = 0;
  for (const cat of categories) {
    const catSubs = subcategories.filter(
      (s) => s.category.toString() === cat._id.toString()
    );
    for (let i = 1; i <= 5; i += 1) {
      const title = `${cat.name} منتج ${i}`;
      // eslint-disable-next-line no-await-in-loop
      const imageCover = await makePlaceholder('products', title, 'product');
      // eslint-disable-next-line no-await-in-loop
      const img1 = await makePlaceholder('products', `${title} A`, 'product');
      const brand = brands[count % brands.length];
      // eslint-disable-next-line no-await-in-loop
      await Product.create({
        title,
        slug: slugifyish(`${cat.name}-${i}`),
        description: `وصف تفصيلي رائع للمنتج رقم ${i} من فئة ${cat.name}. منتج عالي الجودة بسعر مناسب.`,
        quantity: 10 + i * 3,
        sold: i,
        price: 100 + i * 50,
        priceAfterDiscount: i % 2 === 0 ? 90 + i * 50 : undefined,
        availableColors: COLORS.slice(0, (i % 3) + 1),
        imageCover,
        images: [img1],
        category: cat._id,
        subcategory: catSubs.map((s) => s._id),
        brand: brand._id,
        ratingsAverage: ((i % 5) + 1),
        ratingsQuantity: i * 2,
      });
      count += 1;
    }
  }
  console.log(`🛍️  Created ${count} products`);

  console.log('🎉 Seeding complete!');
  await mongoose.disconnect();
  process.exit(0);
}

// Lightweight slug (kept dependency-free in the seed).
function slugifyish(str) {
  return String(str).trim().toLowerCase().replace(/\s+/g, '-');
}

seed().catch(async (err) => {
  console.error('❌ Seeding failed:', err);
  await mongoose.disconnect();
  process.exit(1);
});
