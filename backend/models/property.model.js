const mongoose = require("mongoose");

/* ===== COMMON SUB-SCHEMAS ===== */

const furnishingSchema = {
  type: {
    type: String,
    enum: ["none", "semiFurnished", "fullyFurnished"],
    default: "none"
  },
  amenities: [
    {
      name: String,        // Fan, AC, Bed
      quantity: Number
    }
  ]
};

const parkingSchema = {
  parkingDetails:[
    {
    label: String,
    value: Number 
  }
  ]
}

const areaSchema = {
  builtUp: {
    value: Number,
    unit: { type: String, enum: ["sqft", "sqm"] }
  },
  carpet: {
    value: Number,
    unit: { type: String, enum: ["sqft", "sqm"] }
  },
  plot: {
    value: Number,
    unit: { type: String, enum: ["sqft", "sqm"] },
    length: Number,
    width: Number,
    roadWidth: Number
  }
};

/* ===== MAIN SCHEMA ===== */

const propertySchema = new mongoose.Schema(
  {
    /* ===== BASIC ===== */
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    listingType: {
      type: String,
      enum: ["RENT", "SELL", "PG", "CO_LIVING"],
      required: true
    },

    propertyType: {
      type: String,
      enum: ["RESIDENTIAL", "COMMERCIAL"]
    },

    propertyCategory: String,

    status: {
      type: String,
      enum: ["DRAFT", "ACTIVE", "REJECTED", "BLOCKED"],
      default: "DRAFT"
    },

    /* ===== RESIDENTIAL ===== */
    residentialDetails: {
      ageOfProperty: String,
      bhkType: String,
      bathrooms: Number,
      balconies: Number,
      additionalRooms: [String],

      furnishing: furnishingSchema,

      facing: String,
      flooring: String,
      ownership: String,
      constructionStatus: String,

      area: areaSchema,

      parking: parkingSchema,

      totalFloors: Number,
      yourFloor: Number,

      preferredTenants: [String],
      availableFrom: Date
    },

    /* ===== COMMERCIAL ===== */
    commercialDetails: {
      propertyCondition: {
        type: String,
        enum: ["readyToUse", "bareShell"]
      },

      suitableFor: [String],
      washrooms: Number,
      zoneType: String,
      ageOfProperty: String,
      constructionStatus: String,

      furnishing: furnishingSchema,
      area: areaSchema,

      facing: String,
      flooring: String,
      ownership: String,

      fireSafety: [String],
      occupancyCertificate: Boolean,
      nocCertified: Boolean,

      officeSetup: {
        cabins: Number,
        seats: Number,
        meetingRooms: Number,
        reception: Boolean,
        pantry: Boolean
      },

      lifts: {
        passenger: Boolean,
        service: Boolean
      },

      parking: {
        basement: Number,
        open: Number
      },

      totalFloors: Number,
      yourFloor: Number,
      availableFrom: Date
    },

    /* ===== PG ===== */
    pgDetails: {
      pgName: String,
      pgFor: {
        type: String,
        enum: ["male", "female", "all"]
      },
      bestSuitedFor: [String],
      totalFloors: Number,

      roomTypes: [
        {
          sharingType: String,
          rent: Number,
          deposit: Number,
          roomsAvailable: Number,
          attachedBathroom: Boolean,
          attachedBalcony: Boolean
        }
      ],

      furnishing: furnishingSchema,

      food: {
        included: Boolean,
        meals: [String]
      },

      parking: {
        covered: Number,
        open: Number
      },
      managedBy: String,
      managerStaysAtPG: Boolean,
      includedServices: [String],
      availableFrom: Date
    },

    /* ===== CO-LIVING ===== */
    coLivingDetails: {
      profileImage: String,
      name: String,
      mobileNumber: String,
      isPhonePrivate: { type: Boolean, default: false },
      dateOfBirth: Date,
      gender: String,
      occupation: String,
      occupationName: String,
      languages: String,
      hobbies: String,

      bhk: String,
      furnishing: furnishingSchema,
      roomDetails: [String],
      totalFloors: Number,
      yourFloor: Number,
      amenities: [String],
      rentAmount: Number,

      lookingToShiftBy: Date,
      budgetRange: {
        min: Number,
        max: Number
      },
      partnerGender: String,
      ageLimit: {
        min: String,
        max: String
      },
      partnerOccupation: [String],
      availableFrom: Date
    },

    /* ===== PRICING ===== */
    pricing: {
      rent: {
        label: String,
        amount: Number,
        isElectricity: Boolean,
        isNegotiable: Boolean
      },
      salePrice: Number,
      
      amenities: [
        {
          label: String,
          amount: Number
        }
      ],
      
      securityDeposit: {
        label: String,
        amount: Number
      },

      noticePeriod: Number,
      
      lockInPeriod: {
        label: String,
        month: Number
      },
      
      additionalCharges: {
        booking: Number,
        electricity: Boolean,
        other: Number
      }
    },

    /* ===== LOCATION ===== */
    location: {
      city: String,
      locality: String,
      society: String
    },

    /* ===== CONTACT ===== */
    contact: {
      phone: String,
      email: String,
      phonePrivate: Boolean
    },

    /* ===== MEDIA ===== */
    images: [
      {
        _id: false,
        url: String,
        publicId: String,
        isPrimary: { type: Boolean, default: false }
      }
    ],
    description: String,

    /* ===== ADMIN ===== */
    listingScore: { type: Number, default: 0 },

    flags: {
      suspicious: { type: Boolean, default: false }
    },

    /* ===== SOFT DELETE ===== */
    isDeleted: { type: Boolean, default: false },

    /* ===== PREMIUM ===== */
    isPremium: { type: Boolean, default: false },
    premium: {
      startDate: Date,
      endDate: Date,
      plan: String
    }
  },
  { timestamps: true }
);

/* ===== INDEXES ===== */
propertySchema.index({ listingType: 1 });
propertySchema.index({ status: 1 });
propertySchema.index({ "location.city": 1 });
propertySchema.index({ listingScore: -1 });
propertySchema.index({ createdAt: -1 });

module.exports = mongoose.model("Property", propertySchema);
