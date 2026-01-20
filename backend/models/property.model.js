const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    // ===== BASIC INFO =====
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Step 1: User selects Listing Type
    listingType: {
      type: String,
      enum: ["RENT", "SELL", "Co-Living", "PG"],
      required: true
    },

    // Step 2: User selects Property Type (for RENT/SELL only)
    propertyType: {
      type: String, 
      enum: ["RESIDENTIAL", "COMMERCIAL"]
    },

    // Step 3: User selects Property Category based on propertyType
    // RESIDENTIAL: Apartment, Builder Floor, Independent House, Villa, 1RK/Studio, Others
    // COMMERCIAL: Retail Shop, Showroom, Warehouse, Office, Plot/Land
    propertyCategory: {
      type: String
    },

    status: {
      type: String,
      enum: ["DRAFT", "ACTIVE", "REJECTED", "BLOCKED"],
      default: "DRAFT"
    },

    // ===== RESIDENTIAL PROPERTY DETAILS =====
    residentialDetails: {
      ageOfProperty: String,
      bhkType: String,
      bathrooms: Number,
      balconies: Number,
      additionalRooms: [String],
      furnishType: String,
      furnishings: {
        fans: Number,
        ac: Number,
        beds: Number,
        wardrobe: Number,
        geyser: Number,
        sofa: Number,
        washingMachine: Number,
        fridge: Number,
        tv: Number,
        diningTable: Number
      },
      facing: String,
      flooring: String,
      area: {
        builtUp: Number,
        carpet: Number,
        superBuiltUp: Number
      },
      parking: {
        covered: Number,
        open: Number
      },
      totalFloors: Number,
      yourFloor: Number,
      preferredTenant: [String],
      availableFrom: Date
    },

    // ===== COMMERCIAL PROPERTY DETAILS =====
    commercialDetails: {
      constructionStatus: String, // Ready to Move, Under Construction
      expectedPossession: String,
      washrooms: Number,
      suitableFor: [String], // Jewellery, Gym, Medical/Clinic, Footwear Shop, etc.
      locationHub: String,
      zoneType: String,
      propertyCondition: String, // Ready to Use, Bare Shell
      facing: String,
      flooring: String,
      ownership: String,
      area: {
        builtUp: Number,
        carpet: Number
      },
      totalFloors: Number,
      yourFloor: Number,
      fireSafety: [String], // Fire Extinguisher, Fire Sensors, Sprinkles, Firehose
      occupancyCertificate: Boolean,
      nocCertified: Boolean,
      allowBrokers: Boolean
    },

    // ===== PLOT/LAND DETAILS =====
    plotDetails: {
      expectedPossession: String,
      zoneType: String,
      ownership: String,
      plotArea: Number,
      dimensions: {
        length: Number,
        width: Number
      },
      facingRoadWidth: Number,
      openSides: Number, // 1, 2, 3, 3+
      anyConstruction: Boolean,
      facing: String,
      boundaryWall: Boolean,
      cornerPlot: Boolean,
      allowBrokers: Boolean
    },

    // ===== PG DETAILS =====
    pgDetails: {
      pgName: String,
      pgFor: String, // Male, Female, All
      bestSuitedFor: [String], // Working, Student, Business, Other
      totalFloors: Number,
      roomSharingType: String, // Private, Twin, Triple, Quad
      roomsAvailable: {
        private: Number,
        twin: Number,
        triple: Number,
        quad: Number
      },
      furnishType: String,
      parking: {
        covered: Number,
        open: Number
      },
      managedBy: String,
      managerStaysAtPG: Boolean,
      availableDate: Date,
      amenities: [String],
      foodIncluded: Boolean,
      mealOptions: [String] // Breakfast, Lunch, Dinner
    },

    // ===== CO-LIVING DETAILS (Need Roommate / Need Room) =====
    coLivingDetails: {
      lookingFor: String, // Need Roommate, Need Room/Flat
      profileImage: String,
      name: String,
      mobileNumber: String,
      isMobilePrivate: Boolean,
      dateOfBirth: Date,
      gender: String, // Male, Female, Other
      occupation: String,
      languages: [String],
      hobbies: [String],
      lookingToShiftBy: Date,
      // Room preferences if looking for room
      preferredLocation: String,
      budgetRange: {
        min: Number,
        max: Number
      },
      roomType: String, // Private, Shared
      preferredRoommates: String // Male, Female, Any
    },

    // ===== PRICING =====
    pricing: {
      rentAmount: Number,
      salePrice: Number,
      isNegotiable: Boolean,
      depositType: String,
      depositAmount: Number,
      maintenanceAmount: Number,
      maintenanceType: String, // Monthly, Quarterly, Yearly
      noticePeriod: Number,
      lockInPeriod: String
    },

    // ===== LOCATION =====
    location: {
      city: String,
      locality: String,
      society: String,
      landmark: String,
      pincode: String,
      coordinates: {
        lat: Number,
        lng: Number
      }
    },

    // ===== CONTACT =====
    contact: {
      phoneNumber: String,
      isPhonePrivate: Boolean,
      alternatePhone: String,
      email: String
    },

    // ===== AMENITIES & PREFERENCES =====
    amenities: [String],
    preferences: [String],

    // ===== PHOTOS =====
    photos: [
      {
        url: String,
        publicId: String
      }
    ],

    // ===== ADMIN METRICS =====
    listingScore: {
      type: Number,
      default: 0
    },

    flags: {
      suspicious: { type: Boolean, default: false }
    },

    // ===== SOFT DELETE =====
    isDeleted: {
      type: Boolean,
      default: false
    },
    deletedAt: {
      type: Date,
      default: null
    },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null
    },

    // ===== PREMIUM / BOOST =====
    isPremium: {
      type: Boolean,
      default: false
    },
    premium: {
      startDate: Date,
      endDate: Date,
      planName: String,
      boostRank: { type: Number, default: 0 }
    }
  },
  { timestamps: true }
);

// Indexes
propertySchema.index({ status: 1 });
propertySchema.index({ listingType: 1 });
propertySchema.index({ propertyType: 1 });
propertySchema.index({ propertyCategory: 1 });
propertySchema.index({ "location.city": 1 });
propertySchema.index({ listingScore: -1 });
propertySchema.index({ isPremium: -1 });
propertySchema.index({ createdAt: -1 });
propertySchema.index({ userId: 1 });

module.exports = mongoose.model("Property", propertySchema);
