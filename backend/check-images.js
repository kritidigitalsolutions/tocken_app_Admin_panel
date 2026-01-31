const mongoose = require('mongoose');
require('dotenv').config();

async function checkImages() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    const Property = require('./models/property.model');
    
    // Find property with non-empty images
    const propWithImages = await Property.findOne({ 
      images: { $exists: true, $ne: [] } 
    }).select('_id images listingType').lean();
    
    console.log('\n--- Property with images ---');
    console.log(JSON.stringify(propWithImages, null, 2));
    
    // Count properties with images
    const countWithImages = await Property.countDocuments({ 
      images: { $exists: true, $ne: [] } 
    });
    console.log('\nTotal properties with images:', countWithImages);
    
    // Get first 3 properties to check images field
    const first3 = await Property.find().limit(3).select('_id images listingType').lean();
    console.log('\n--- First 3 properties images field ---');
    first3.forEach((p, i) => {
      console.log(`Property ${i+1} (${p._id}): images =`, p.images);
    });
    
    mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err);
    mongoose.disconnect();
  }
}

checkImages();
