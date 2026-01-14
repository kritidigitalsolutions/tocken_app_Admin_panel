const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    // ===== BASIC =====
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    listingType: {
      type: String,
      enum: ["RENT", "SELL", "LEASE", "PG"],
      required: true
    },

    propertyCategory: {
      type: String,
      enum: ["RESIDENTIAL", "COMMERCIAL"],
      required: true
    },

    propertyType: {
      type: String,
      default: "APARTMENT"
    },

    status: {
      type: String,
      enum: ["DRAFT", "ACTIVE", "REJECTED", "BLOCKED"],
      default: "DRAFT"
    },

    // ===== APARTMENT DETAILS (Image matched) =====
    apartmentDetails: {
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
        fridge: Number
      },

      facing: String,
      flooring: String,

      area: {
        builtUp: Number,
        carpet: Number
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

    // ===== PRICING =====
    pricing: {
      rentAmount: Number,
      isNegotiable: Boolean,
      depositType: String,
      depositAmount: Number,
      noticePeriod: Number,
      lockInPeriod: String
    },

    // ===== LOCATION =====
    location: {
      city: String,
      locality: String,
      society: String
    },

    // ===== CONTACT & AMENITIES =====
    contact: {
      phoneNumber: String,
      isPhonePrivate: Boolean
    },

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
          startDate: { type: Date },
          endDate: { type: Date },
          planName: { type: String }, // Gold / Platinum / Trial
          boostRank: { type: Number, default: 0 } // ranking power
        }

  },

  { timestamps: true }
);
propertySchema.index({ status: 1 });
propertySchema.index({ listingType: 1 });
propertySchema.index({ "location.city": 1 });
propertySchema.index({ listingScore: -1 });
propertySchema.index({ isPremium: -1 });
propertySchema.index({ createdAt: -1 });

module.exports = mongoose.model("Property", propertySchema);
