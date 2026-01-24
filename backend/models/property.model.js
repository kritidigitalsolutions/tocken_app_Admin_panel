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
      propertytype: String, //for others case
      constructionStatus: String, //for others case
      expectedPossession: String, // Plot case
      constructionType: String,
      ageOfProperty: String,
      bhkType: String,
      bathrooms: Number,
      balconies: Number,
      additionalRooms: [String],
      allfurnishType: {
        furnishType: String,
        service: [
          {
            nameOfAminities: String,
            numberOfamenities: Number,
          }

        ]
      },

      facing: String,
      flooring: String,
      ownership: String,

      area: {
        buitUpArea: {
          count: Number,
          unit: String,
        },
        carpetArea: {
          count: Number,
          unit: String,
        },
        plotArea: {
          count: Number,
          unit: String,
          dimensions: {
            length: Number,
            width: Number,
          },
          road: {
            count: Number,
            unit: String,
          }
        },

      },
      openSide: String,
      isConstruction: String,
      boundaryWall: Boolean,
      cornerPlot: Boolean,
      allowBrokers: Boolean,

      parking: {
        name: String,
        count: Number,
      },

      totalFloors: Number,
      yourFloor: Number,
      preferredTenant: [String],
      availableFrom: Date
    },

    // ===== COMMERCIAL PROPERTY DETAILS =====
    commercialDetails: {
      propertytype: String, //for others case
      constructionStatus: String,  //for others case
      expectedPossession: String,
      month: String,
      ageOfProperty: String,
      locationHub: String,
      washrooms: Number,
      suitableFor: [String],
      zoneType: String,
      propertyCondition: String, // Ready to Use, Bare Shell
      available: Date,
      constructionStatusOfWall: String,
      facing: String,
      flooring: String,
      ownership: String,
      area: {
        buitUpArea: {
          count: Number,
          unit: String,
        },
        carpetArea: {
          count: Number,
          unit: String,
        },
        plotArea: {
          count: Number,
          unit: String,
          dimensions: {
            length: Number,
            width: Number,
          },
          road: {
            count: Number,
            unit: String,
          }
        },

      },
      openSide: String,
      isConstruction: String,
      constructionType: String,
      facing: String,
      boundaryWall: Boolean,
      cornerPlot: Boolean,
      allowBrokers: Boolean,
      totalFloors: Number,
      yourFloor: Number,
      fireSafety: [String], // Fire Extinguisher, Fire Sensors, Sprinkles, Firehose
      occupancyCertificate: Boolean,
      nocCertified: Boolean,
      allowBrokers: Boolean,

      // for office space
      cabin: Number,
      meetingRoom: Number,
      seats: Number,

      confrenceRoom: Boolean,
      washrooms: Boolean,
      furnished: Boolean,
      receptionArea: Boolean,
      pantry: Boolean,
      ac: Boolean,
      ups: Boolean,
      oxygen: Boolean,
      passangerLift: String,
      serviceLift: String,
      ParkingType: {
        type: String,
        privateParkingBasement: Boolean,
        privateParkingOutside: Boolean,
        publicParking: Boolean,
      },
      numberOfParking: Number,



      
    },

    // ===== PG DETAILS =====
    pgDetails: {
      pgName: String,
      pgFor: String, // Male, Female, All
      bestSuitedFor: [String], // Working, Student, Business, Other
      totalFloors: Number,
      roomSharingType: [
        {
          RoomType: [String],
          rentAmount: Number,  //rant amount for private, twin, triple, quad
          securityDeposit: String, //security for private, twin, triple, quad
          amount: Number, //amount for private, twin, triple, quad
          NumberOfRooms: Number,
          attachedBathroom: Boolean,
          attachedBalcony: Boolean,
        },
      ],
      allfurnishType: {
        furnishType: String,
        service: [
          {
            nameOfAminities: String,
            numberOfamenities: Number,
          }

        ]
      },

      parking: {
        covered: Number,
        open: Number
      },

      managedBy: String,
      managerStaysAtPG: Boolean,
      availableDate: Date,
      addMoreRentdetails: [
        {
          moreChanges: {
            maintenance: Number,
            booking: Number,
            other: Number,
          },
          isPriceNgotiable: Boolean,
          isElectricicyChanges: Boolean,
        }
      ],

      includedServices: [String],

      foodIncluded: Boolean,
      mealsAvailable: [
        {
          selectMeals: String,
          mealType: String,
          availableWeekday: [String],
          availableWeekend: [String],
          mealAmount: Number
        }
      ], // Breakfast, Lunch, Dinner
    },

    // ===== CO-LIVING DETAILS (Need Roommate / Need Room) =====
    coLivingDetails: {
      profileImage: String,
      name: String,
      mobileNumber: String,
      isPhonePrivate: {
        type: Boolean,
        default: false
      },
      dateOfBirth: Date,
      gender: String, // Male, Female, Other
      occupation: String,
      occupationName: String,
      languages: String,
      hobbies: String,
      // if select Need Room/Flat
      availableFrom: Date, //----

      bhk: String,
      allfurnishType: {
        furnishType: String,
        service: [
          {
            nameOfAminities: String,
            numberOfamenities: Number,
          }

        ]
      },
      addmoreFurnishing: {
        service: [
          {
            nameOfAminities: String,
            numberOfamenities: Number,
          }

        ]
      },
      roomDetails: [String],
      totalFloores: Number,
      yourFloor: Number,
      amenities: [String],
      rentAmount: Number,
      addMoreRentdetails: [
        {
          isPriceNgotiable: Boolean,
          isElectricicyChanges: Boolean,
          moreChanges: {
            maintenance: Number,
            booking: Number,
            other: Number,
          },
        }
      ],
      lookingToShiftBy: Date,
      budgetRange: {
        min: Number,
        max: Number
      },
      partnerGender: String,
      ageLimit: {
        min: String,
        max: String,
      },
      partnerOccupation: [String],

    },

    // ===== PRICING =====
    pricing: {
      rentType: String,
      leaseYear: Number,
      rentAmount: Number,
      // Pricing
      pricePerSquare: Number,
      ExpectedPrice: Number,
      deal: Boolean,
      discounttype: [
        {
          type: String,
          discount: Number
        }
      ],
      valid: Date,
      available: Boolean,
      addMorePricedetails: [
        {
          morePricing: {
            booking: Number,
            anualDuePay: Number,
            other: Number,
          },
          isPriceNgotiable: Boolean,
          isUpsAndDgChanges: Boolean,
          isElectricity: Boolean,
          isTaxAndGovChanges: Boolean,
        }
      ],
      securityDepositType: String,
      securityDepositAmount: Number,
      noticePeriod: Number,
      lockInPeriodType: String,
      lockInPeriodAmount: Number,

      salePrice: Number,
      depositAmount: Number,
      maintenanceAmount: Number,
      maintenanceType: String, // Monthly, Quarterly, Yearly
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
      email: String,
      entryTime: String,
      about: String,
      instaLink: String,
      facebookLink: String,
      LinkedinLink: String,
      amenities: [String],
      preferences: [String],
      pgRules: [String],
      area: [String],
    },

    // ===== AMENITIES & PREFERENCES =====
    // ===== PHOTOS =====
    // photos: [
    //   {
    //     publicId: String
    //   }
    // ],
    
    image: String,
    Description: String,


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
