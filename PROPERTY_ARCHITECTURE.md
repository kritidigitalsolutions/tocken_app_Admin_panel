# Property Data Model Architecture

## Overview

Property model mein **4 different Listing Types** hain, aur har listing type ke liye alag data structure use hota hai.

```
listingType: ["RENT", "SELL", "Co-Living", "PG"]
```

---

## 1. RENT (Kirayedari)

### Description
Jab user apni property rent pe dena chahta hai (Residential ya Commercial)

### Flow
```
Step 1: listingType = "RENT"
Step 2: propertyType = "RESIDENTIAL" ya "COMMERCIAL"
Step 3: propertyCategory select karo
```

### Data Model Structure

```javascript
{
  // ===== REQUIRED FIELDS =====
  userId: ObjectId,           // User ka ID
  listingType: "RENT",
  propertyType: "RESIDENTIAL" | "COMMERCIAL",
  propertyCategory: String,   // Depends on propertyType
  status: "DRAFT" | "ACTIVE" | "REJECTED" | "BLOCKED",

  // ===== IF RESIDENTIAL =====
  // propertyCategory options: "Apartment", "Builder Floor", "Independent House", "Villa", "1RK/Studio", "Others"
  residentialDetails: {
    ageOfProperty: String,        // "0-1 Years", "1-3 Years", etc.
    bhkType: String,              // "1BHK", "2BHK", "3BHK", etc.
    bathrooms: Number,
    balconies: Number,
    additionalRooms: [String],    // ["Pooja Room", "Servant Room", "Study Room"]
    furnishType: String,          // "Fully Furnished", "Semi Furnished", "Unfurnished"
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
    facing: String,               // "North", "South", "East", "West"
    flooring: String,             // "Marble", "Tiles", "Wooden"
    area: {
      builtUp: Number,            // sq.ft
      carpet: Number,
      superBuiltUp: Number
    },
    parking: {
      covered: Number,
      open: Number
    },
    totalFloors: Number,
    yourFloor: Number,
    preferredTenant: [String],    // ["Family", "Bachelor", "Company"]
    availableFrom: Date
  },

  // ===== IF COMMERCIAL =====
  // propertyCategory options: "Retail Shop", "Showroom", "Warehouse", "Office"
  commercialDetails: {
    constructionStatus: String,   // "Ready to Move", "Under Construction"
    expectedPossession: String,
    washrooms: Number,
    suitableFor: [String],        // ["Jewellery", "Gym", "Medical/Clinic"]
    locationHub: String,
    zoneType: String,
    propertyCondition: String,    // "Ready to Use", "Bare Shell"
    facing: String,
    flooring: String,
    ownership: String,
    area: {
      builtUp: Number,
      carpet: Number
    },
    totalFloors: Number,
    yourFloor: Number,
    fireSafety: [String],         // ["Fire Extinguisher", "Fire Sensors"]
    occupancyCertificate: Boolean,
    nocCertified: Boolean,
    allowBrokers: Boolean
  },

  // ===== PRICING (RENT ke liye) =====
  pricing: {
    rentAmount: Number,           // ✅ Monthly Rent
    isNegotiable: Boolean,
    depositType: String,          // "Fixed", "X Months Rent"
    depositAmount: Number,
    maintenanceAmount: Number,
    maintenanceType: String,      // "Monthly", "Quarterly", "Yearly"
    noticePeriod: Number,         // Days
    lockInPeriod: String
  },

  // ===== COMMON FIELDS =====
  location: {
    city: String,
    locality: String,
    society: String,
    landmark: String,
    pincode: String,
    coordinates: { lat: Number, lng: Number }
  },
  contact: {
    phoneNumber: String,
    isPhonePrivate: Boolean,
    alternatePhone: String,
    email: String
  },
  amenities: [String],
  photos: [{ url: String, publicId: String }]
}
```

### Visual Flow (RENT)
```
┌─────────────────────────────────────────────────────────────┐
│                      RENT LISTING                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────────┐     ┌─────────────────┐              │
│   │   RESIDENTIAL   │     │   COMMERCIAL    │              │
│   └────────┬────────┘     └────────┬────────┘              │
│            │                       │                        │
│            ▼                       ▼                        │
│   ┌─────────────────┐     ┌─────────────────┐              │
│   │ Categories:     │     │ Categories:     │              │
│   │ • Apartment     │     │ • Retail Shop   │              │
│   │ • Builder Floor │     │ • Showroom      │              │
│   │ • Independent   │     │ • Warehouse     │              │
│   │ • Villa         │     │ • Office        │              │
│   │ • 1RK/Studio    │     └────────┬────────┘              │
│   │ • Others        │              │                        │
│   └────────┬────────┘              │                        │
│            │                       │                        │
│            ▼                       ▼                        │
│   ┌─────────────────┐     ┌─────────────────┐              │
│   │residentialDetails│    │commercialDetails│              │
│   └────────┬────────┘     └────────┬────────┘              │
│            │                       │                        │
│            └───────────┬───────────┘                        │
│                        ▼                                    │
│            ┌─────────────────────┐                          │
│            │ pricing.rentAmount  │                          │
│            │ + location + photos │                          │
│            └─────────────────────┘                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. SELL (Bikri)

### Description
Jab user apni property bechna chahta hai (Residential, Commercial, ya Plot/Land)

### Flow
```
Step 1: listingType = "SELL"
Step 2: propertyType = "RESIDENTIAL" ya "COMMERCIAL"
Step 3: propertyCategory select karo (Plot/Land bhi available)
```

### Data Model Structure

```javascript
{
  // ===== REQUIRED FIELDS =====
  userId: ObjectId,
  listingType: "SELL",
  propertyType: "RESIDENTIAL" | "COMMERCIAL",
  propertyCategory: String,
  status: "DRAFT" | "ACTIVE" | "REJECTED" | "BLOCKED",

  // ===== IF RESIDENTIAL =====
  // Same as RENT residential
  residentialDetails: { /* same structure */ },

  // ===== IF COMMERCIAL =====
  // Same as RENT commercial
  commercialDetails: { /* same structure */ },

  // ===== IF PLOT/LAND =====
  // propertyCategory = "Plot/Land"
  plotDetails: {
    expectedPossession: String,
    zoneType: String,              // "Industrial", "Commercial", "Residential"
    ownership: String,             // "Freehold", "Leasehold"
    plotArea: Number,              // sq.ft or sq.yards
    dimensions: {
      length: Number,
      width: Number
    },
    facingRoadWidth: Number,       // feet
    openSides: Number,             // 1, 2, 3, 3+
    anyConstruction: Boolean,
    facing: String,
    boundaryWall: Boolean,
    cornerPlot: Boolean,
    allowBrokers: Boolean
  },

  // ===== PRICING (SELL ke liye) =====
  pricing: {
    salePrice: Number,             // ✅ Total Sale Price
    isNegotiable: Boolean
    // Note: rentAmount, deposit, maintenance NOT used in SELL
  },

  // ===== COMMON FIELDS =====
  location: { /* same */ },
  contact: { /* same */ },
  amenities: [String],
  photos: [{ url: String, publicId: String }]
}
```

### Visual Flow (SELL)
```
┌─────────────────────────────────────────────────────────────┐
│                      SELL LISTING                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────────┐     ┌─────────────────┐              │
│   │   RESIDENTIAL   │     │   COMMERCIAL    │              │
│   └────────┬────────┘     └────────┬────────┘              │
│            │                       │                        │
│            ▼                       ▼                        │
│   ┌─────────────────┐     ┌─────────────────┐              │
│   │ Categories:     │     │ Categories:     │              │
│   │ • Apartment     │     │ • Retail Shop   │              │
│   │ • Builder Floor │     │ • Showroom      │              │
│   │ • Independent   │     │ • Warehouse     │              │
│   │ • Villa         │     │ • Office        │              │
│   │ • 1RK/Studio    │     │ • Plot/Land ◄───┼──── Special  │
│   │ • Others        │     └────────┬────────┘              │
│   └────────┬────────┘              │                        │
│            │                       │                        │
│            ▼                       ▼                        │
│   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   │
│   │residential   │   │commercial    │   │plotDetails   │   │
│   │Details       │   │Details       │   │              │   │
│   └──────┬───────┘   └──────┬───────┘   └──────┬───────┘   │
│          │                  │                  │            │
│          └──────────────────┼──────────────────┘            │
│                             ▼                               │
│               ┌─────────────────────┐                       │
│               │ pricing.salePrice   │                       │
│               │ + location + photos │                       │
│               └─────────────────────┘                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. PG (Paying Guest)

### Description
Jab user PG listing banana chahta hai (Hostel type accommodation)

### Flow
```
Step 1: listingType = "PG"
Step 2: NO propertyType needed
Step 3: Directly fill pgDetails
```

### Data Model Structure

```javascript
{
  // ===== REQUIRED FIELDS =====
  userId: ObjectId,
  listingType: "PG",
  // propertyType: NOT REQUIRED ❌
  // propertyCategory: NOT REQUIRED ❌
  status: "DRAFT" | "ACTIVE" | "REJECTED" | "BLOCKED",

  // ===== PG SPECIFIC DETAILS =====
  pgDetails: {
    pgName: String,                // PG ka naam
    pgFor: String,                 // "Male", "Female", "All"
    bestSuitedFor: [String],       // ["Working", "Student", "Business", "Other"]
    totalFloors: Number,
    roomSharingType: String,       // "Private", "Twin", "Triple", "Quad"
    roomsAvailable: {
      private: Number,             // Kitne private rooms available
      twin: Number,                // Kitne 2-sharing rooms
      triple: Number,              // Kitne 3-sharing rooms
      quad: Number                 // Kitne 4-sharing rooms
    },
    furnishType: String,           // "Fully Furnished", "Semi Furnished"
    parking: {
      covered: Number,
      open: Number
    },
    managedBy: String,             // "Owner", "Caretaker"
    managerStaysAtPG: Boolean,
    availableDate: Date,
    amenities: [String],           // ["WiFi", "AC", "Laundry", "Meals"]
    foodIncluded: Boolean,
    mealOptions: [String]          // ["Breakfast", "Lunch", "Dinner"]
  },

  // ===== PRICING (PG ke liye) =====
  pricing: {
    rentAmount: Number,            // ✅ Per Bed/Room Monthly Rent
    depositAmount: Number,
    maintenanceAmount: Number,     // If separate
    // Note: salePrice NOT used in PG
  },

  // ===== COMMON FIELDS =====
  location: { /* same */ },
  contact: { /* same */ },
  photos: [{ url: String, publicId: String }]

  // ===== NOT USED IN PG =====
  // residentialDetails: ❌
  // commercialDetails: ❌
  // plotDetails: ❌
}
```

### Visual Flow (PG)
```
┌─────────────────────────────────────────────────────────────┐
│                       PG LISTING                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────────────────────────────────────┐          │
│   │           listingType = "PG"                │          │
│   │                                             │          │
│   │   ⚠️ NO propertyType selection needed      │          │
│   │   ⚠️ NO propertyCategory selection needed  │          │
│   └──────────────────┬──────────────────────────┘          │
│                      │                                      │
│                      ▼                                      │
│   ┌─────────────────────────────────────────────┐          │
│   │              pgDetails                      │          │
│   ├─────────────────────────────────────────────┤          │
│   │ • pgName: "ABC PG"                          │          │
│   │ • pgFor: "Male" / "Female" / "All"          │          │
│   │ • bestSuitedFor: ["Working", "Student"]     │          │
│   │ • roomSharingType: "Twin"                   │          │
│   │ • roomsAvailable: { twin: 5, triple: 3 }    │          │
│   │ • furnishType: "Fully Furnished"            │          │
│   │ • foodIncluded: true                        │          │
│   │ • mealOptions: ["Breakfast", "Dinner"]      │          │
│   └──────────────────┬──────────────────────────┘          │
│                      │                                      │
│                      ▼                                      │
│   ┌─────────────────────────────────────────────┐          │
│   │    pricing.rentAmount (per bed/room)        │          │
│   │    + location + contact + photos            │          │
│   └─────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Co-Living (Roommate/Flatmate)

### Description
Jab koi roommate dhundh raha hai ya room dhundh raha hai

### Flow
```
Step 1: listingType = "Co-Living"
Step 2: NO propertyType needed
Step 3: Directly fill coLivingDetails
```

### Data Model Structure

```javascript
{
  // ===== REQUIRED FIELDS =====
  userId: ObjectId,
  listingType: "Co-Living",
  // propertyType: NOT REQUIRED ❌
  // propertyCategory: NOT REQUIRED ❌
  status: "DRAFT" | "ACTIVE" | "REJECTED" | "BLOCKED",

  // ===== CO-LIVING SPECIFIC DETAILS =====
  coLivingDetails: {
    lookingFor: String,            // ✅ "Need Roommate" | "Need Room/Flat"
    
    // ===== PROFILE INFO (About the person) =====
    profileImage: String,          // Photo URL
    name: String,
    mobileNumber: String,
    isMobilePrivate: Boolean,
    dateOfBirth: Date,
    gender: String,                // "Male", "Female", "Other"
    occupation: String,            // "Working Professional", "Student"
    languages: [String],           // ["Hindi", "English", "Marathi"]
    hobbies: [String],             // ["Reading", "Gaming", "Music"]
    lookingToShiftBy: Date,        // Kab tak shift hona hai

    // ===== ROOM PREFERENCES (if "Need Room/Flat") =====
    preferredLocation: String,
    budgetRange: {
      min: Number,
      max: Number
    },
    roomType: String,              // "Private", "Shared"
    preferredRoommates: String     // "Male", "Female", "Any"
  },

  // ===== PRICING (if "Need Roommate") =====
  pricing: {
    rentAmount: Number,            // Kitna rent dena hoga roommate ko
    depositAmount: Number
  },

  // ===== LOCATION (Existing location if "Need Roommate") =====
  location: { /* same */ },

  // ===== COMMON FIELDS =====
  contact: { /* same */ },
  photos: [{ url: String, publicId: String }]  // Room photos if sharing

  // ===== NOT USED IN CO-LIVING =====
  // residentialDetails: ❌
  // commercialDetails: ❌
  // plotDetails: ❌
  // pgDetails: ❌
}
```

### Visual Flow (Co-Living)
```
┌─────────────────────────────────────────────────────────────┐
│                    CO-LIVING LISTING                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────────────────────────────────────────┐          │
│   │         listingType = "Co-Living"           │          │
│   │                                             │          │
│   │   ⚠️ NO propertyType selection needed      │          │
│   │   ⚠️ NO propertyCategory selection needed  │          │
│   └──────────────────┬──────────────────────────┘          │
│                      │                                      │
│                      ▼                                      │
│   ┌─────────────────────────────────────────────┐          │
│   │        coLivingDetails.lookingFor           │          │
│   └──────────────────┬──────────────────────────┘          │
│                      │                                      │
│          ┌───────────┴───────────┐                         │
│          ▼                       ▼                          │
│   ┌──────────────┐       ┌──────────────┐                  │
│   │ NEED ROOMMATE│       │ NEED ROOM    │                  │
│   │ (Room hai,   │       │ (Room chahiye│                  │
│   │  partner     │       │  rehne ke    │                  │
│   │  chahiye)    │       │  liye)       │                  │
│   └──────┬───────┘       └──────┬───────┘                  │
│          │                      │                           │
│          ▼                      ▼                           │
│   ┌──────────────┐       ┌──────────────┐                  │
│   │ Profile Info │       │ Profile Info │                  │
│   │ + Location   │       │ + Preferences│                  │
│   │ + Rent       │       │ + Budget     │                  │
│   │ + Photos     │       │ Range        │                  │
│   └──────────────┘       └──────────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Complete Architecture Summary

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         PROPERTY MODEL                                   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│                        ┌─────────────────┐                              │
│                        │   listingType   │                              │
│                        └────────┬────────┘                              │
│                                 │                                        │
│         ┌───────────┬───────────┼───────────┬───────────┐               │
│         ▼           ▼           ▼           ▼           │               │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │               │
│   │   RENT   │ │   SELL   │ │    PG    │ │ Co-Living│  │               │
│   └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘  │               │
│        │            │            │            │         │               │
│        ▼            ▼            │            │         │               │
│   ┌─────────────────────┐       │            │         │               │
│   │    propertyType     │       │            │         │               │
│   │ RESIDENTIAL/COMMERCIAL│     │            │         │               │
│   └──────────┬──────────┘       │            │         │               │
│              │                   │            │         │               │
│              ▼                   ▼            ▼         │               │
│   ┌─────────────────────────────────────────────────┐  │               │
│   │              DETAILS OBJECTS                    │  │               │
│   ├─────────────────────────────────────────────────┤  │               │
│   │ • residentialDetails  (RENT/SELL + RESIDENTIAL) │  │               │
│   │ • commercialDetails   (RENT/SELL + COMMERCIAL)  │  │               │
│   │ • plotDetails         (SELL + Plot/Land)        │  │               │
│   │ • pgDetails           (PG only)                 │  │               │
│   │ • coLivingDetails     (Co-Living only)          │  │               │
│   └─────────────────────────────────────────────────┘  │               │
│                                                         │               │
│   ┌─────────────────────────────────────────────────┐  │               │
│   │              COMMON FIELDS (All Types)          │  │               │
│   ├─────────────────────────────────────────────────┤  │               │
│   │ • pricing (rentAmount/salePrice)                │  │               │
│   │ • location                                      │  │               │
│   │ • contact                                       │  │               │
│   │ • photos                                        │  │               │
│   │ • amenities                                     │  │               │
│   │ • status                                        │  │               │
│   │ • isPremium                                     │  │               │
│   │ • listingScore                                  │  │               │
│   └─────────────────────────────────────────────────┘  │               │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Quick Reference Table

| Field                | RENT | SELL | PG | Co-Living |
|---------------------|------|------|-----|-----------|
| propertyType        | ✅   | ✅   | ❌  | ❌        |
| propertyCategory    | ✅   | ✅   | ❌  | ❌        |
| residentialDetails  | ✅*  | ✅*  | ❌  | ❌        |
| commercialDetails   | ✅** | ✅** | ❌  | ❌        |
| plotDetails         | ❌   | ✅***| ❌  | ❌        |
| pgDetails           | ❌   | ❌   | ✅  | ❌        |
| coLivingDetails     | ❌   | ❌   | ❌  | ✅        |
| pricing.rentAmount  | ✅   | ❌   | ✅  | ✅        |
| pricing.salePrice   | ❌   | ✅   | ❌  | ❌        |
| pricing.deposit     | ✅   | ❌   | ✅  | ✅        |
| location            | ✅   | ✅   | ✅  | ✅        |
| amenities           | ✅   | ✅   | ✅  | ❌        |

**Legend:**
- `*` = When propertyType is RESIDENTIAL
- `**` = When propertyType is COMMERCIAL
- `***` = When propertyCategory is Plot/Land

---

## Example Documents

### Example 1: 2BHK Apartment for RENT
```javascript
{
  userId: "user123",
  listingType: "RENT",
  propertyType: "RESIDENTIAL",
  propertyCategory: "Apartment",
  status: "ACTIVE",
  residentialDetails: {
    bhkType: "2BHK",
    bathrooms: 2,
    furnishType: "Semi Furnished",
    area: { carpet: 850 },
    yourFloor: 3,
    totalFloors: 10,
    preferredTenant: ["Family"]
  },
  pricing: {
    rentAmount: 25000,
    depositAmount: 50000,
    maintenanceAmount: 3000
  },
  location: {
    city: "Mumbai",
    locality: "Andheri West"
  }
}
```

### Example 2: Office Space for SELL
```javascript
{
  userId: "user456",
  listingType: "SELL",
  propertyType: "COMMERCIAL",
  propertyCategory: "Office",
  status: "ACTIVE",
  commercialDetails: {
    constructionStatus: "Ready to Move",
    area: { carpet: 1200 },
    washrooms: 2,
    fireSafety: ["Fire Extinguisher", "Fire Sensors"]
  },
  pricing: {
    salePrice: 15000000,
    isNegotiable: true
  },
  location: {
    city: "Pune",
    locality: "Hinjewadi"
  }
}
```

### Example 3: PG Listing
```javascript
{
  userId: "owner789",
  listingType: "PG",
  status: "ACTIVE",
  pgDetails: {
    pgName: "Shree Krishna PG",
    pgFor: "Male",
    bestSuitedFor: ["Working", "Student"],
    roomsAvailable: { twin: 5, triple: 3 },
    furnishType: "Fully Furnished",
    foodIncluded: true,
    mealOptions: ["Breakfast", "Dinner"]
  },
  pricing: {
    rentAmount: 8000,
    depositAmount: 8000
  },
  location: {
    city: "Bangalore",
    locality: "Koramangala"
  }
}
```

### Example 4: Co-Living (Need Roommate)
```javascript
{
  userId: "person101",
  listingType: "Co-Living",
  status: "ACTIVE",
  coLivingDetails: {
    lookingFor: "Need Roommate",
    name: "Rahul Sharma",
    gender: "Male",
    occupation: "Working Professional",
    languages: ["Hindi", "English"],
    lookingToShiftBy: "2026-02-01"
  },
  pricing: {
    rentAmount: 12000
  },
  location: {
    city: "Delhi",
    locality: "Hauz Khas"
  }
}
```

---

## Frontend Form Logic

```javascript
// Pseudo code for form handling

function getFormFields(listingType, propertyType, propertyCategory) {
  
  switch(listingType) {
    case "RENT":
    case "SELL":
      // Show propertyType selection first
      // Then show propertyCategory based on propertyType
      // Then show appropriate details form
      if (propertyType === "RESIDENTIAL") {
        return residentialDetailsForm;
      } else if (propertyCategory === "Plot/Land") {
        return plotDetailsForm;
      } else {
        return commercialDetailsForm;
      }
      
    case "PG":
      // Skip propertyType, directly show PG form
      return pgDetailsForm;
      
    case "Co-Living":
      // Skip propertyType, directly show Co-Living form
      return coLivingDetailsForm;
  }
}
```

---

## Validation Rules

1. **RENT/SELL**: `propertyType` aur `propertyCategory` required hai
2. **PG/Co-Living**: Sirf `listingType` required hai, baaki details accordingly
3. **Pricing**: 
   - RENT: `rentAmount` required
   - SELL: `salePrice` required
   - PG: `rentAmount` required
   - Co-Living: Optional based on `lookingFor`
4. **Photos**: At least 1 photo recommended for all types
