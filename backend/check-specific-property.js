const mongoose = require('mongoose');
require('dotenv').config();

async function checkSpecificProperty() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    const Property = require('./models/property.model');
    
    // Check the specific property you just created
    const propertyId = '697d981a61e39eac327ae499';
    
    const property = await Property.findById(propertyId).select('_id images listingType').lean();
    
    console.log('\n=== Property Details ===');
    console.log('Property ID:', propertyId);
    console.log('Property found:', !!property);
    
    if (property) {
      console.log('Images field:', JSON.stringify(property.images, null, 2));
      console.log('Images count:', property.images?.length || 0);
    } else {
      console.log('Property not found!');
    }
    
    mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err);
    mongoose.disconnect();
  }
}

checkSpecificProperty();
