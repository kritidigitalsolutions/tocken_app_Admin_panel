const Property = require("../models/property.model");

/**
 * FILTER PROPERTIES API
 * GET /api/properties/filter
 * 
 * This API supports all filter options from Flutter app:
 * - Rent/Lease, Co-living, PG, Buy, Plot/Land tabs
 * - Property Type, BHK, Budget, Area, Furnish, etc.
 */
exports.filterProperties = async (req, res) => {
    try {
        const {
            // Tab selection
            listingType,        // RENT, SELL, Co-Living, PG

            // Location
            city,
            locality,

            // Property Category
            propertyType,       // RESIDENTIAL, COMMERCIAL
            propertyCategory,   // Apartment, Builder Floor, Villa, etc.

            // Rent/Buy specific
            preferredTenant,    // Family, Male, Female, Others (array)
            bhkType,            // 1BHK, 2BHK, 3BHK, etc. (array)
            furnishType,        // Fully Furnished, Semi Furnished, Unfurnished

            // Budget range
            minBudget,
            maxBudget,

            // Area range
            minArea,
            maxArea,

            // Property condition (for Buy)
            propertyCondition,  // Ready to move, Under Construction

            // PG specific
            pgFor,              // Male, Female, All
            roomSharingType,    // Private, Twin, Triple, Quad
            withMeals,          // true/false
            attachedBathroom,   // true/false
            attachedBalcony,    // true/false
            availabilityDate,   // Immediately, Within 15 days

            // Co-living specific
            lookingFor,         // Room/Flat, Roommate
            preferredGender,    // Male, Female, All
            preferringFor,      // Student, Working Professional, Other

            // View filters
            withImages,         // true = only with images
            forLease,           // true = for lease properties

            // Sorting
            sortBy,             // price_low, price_high, newest, oldest, score

            // Pagination
            page = 1,
            limit = 20
        } = req.query;

        // Build query
        const query = {
            status: "ACTIVE",
            isDeleted: false
        };

        // ===== TAB FILTER =====
        if (listingType) {
            query.listingType = listingType;
        }

        // ===== LOCATION FILTER =====
        if (city) {
            query["location.city"] = { $regex: city, $options: "i" };
        }
        if (locality) {
            query["location.locality"] = { $regex: locality, $options: "i" };
        }

        // ===== PROPERTY TYPE FILTER =====
        if (propertyType) {
            query.propertyType = propertyType;
        }
        if (propertyCategory) {
            // Support multiple categories
            const categories = Array.isArray(propertyCategory)
                ? propertyCategory
                : propertyCategory.split(",");
            query.propertyCategory = { $in: categories };
        }

        // ===== RESIDENTIAL FILTERS =====
        if (listingType === "RENT" || listingType === "SELL") {

            // BHK Type
            if (bhkType) {
                const bhkArray = Array.isArray(bhkType) ? bhkType : bhkType.split(",");
                query["residentialDetails.bhkType"] = { $in: bhkArray };
            }

            // Preferred Tenant
            if (preferredTenant) {
                const tenants = Array.isArray(preferredTenant)
                    ? preferredTenant
                    : preferredTenant.split(",");
                query["residentialDetails.preferredTenant"] = { $in: tenants };
            }

            // Furnish Type
            if (furnishType) {
                const furnishTypes = Array.isArray(furnishType)
                    ? furnishType
                    : furnishType.split(",");
                query["residentialDetails.furnishType"] = { $in: furnishTypes };
            }

            // Property Condition (for Buy)
            if (propertyCondition) {
                query["commercialDetails.constructionStatus"] = propertyCondition;
            }

            // Budget filter (RENT = rentAmount, SELL = salePrice)
            if (minBudget || maxBudget) {
                const priceField = listingType === "RENT"
                    ? "pricing.rentAmount"
                    : "pricing.salePrice";

                if (minBudget && maxBudget) {
                    query[priceField] = {
                        $gte: parseInt(minBudget),
                        $lte: parseInt(maxBudget)
                    };
                } else if (minBudget) {
                    query[priceField] = { $gte: parseInt(minBudget) };
                } else if (maxBudget) {
                    query[priceField] = { $lte: parseInt(maxBudget) };
                }
            }

            // Area filter
            if (minArea || maxArea) {
                const areaQuery = {};
                if (minArea) areaQuery.$gte = parseInt(minArea);
                if (maxArea) areaQuery.$lte = parseInt(maxArea);
                query["residentialDetails.area.builtUp"] = areaQuery;
            }
        }

        // ===== PG FILTERS =====
        if (listingType === "PG") {
            if (pgFor) {
                query["pgDetails.pgFor"] = pgFor;
            }
            if (roomSharingType) {
                const sharingTypes = Array.isArray(roomSharingType)
                    ? roomSharingType
                    : roomSharingType.split(",");
                query["pgDetails.roomSharingType"] = { $in: sharingTypes };
            }
            if (withMeals === "true") {
                query["pgDetails.foodIncluded"] = true;
            }
            if (preferringFor) {
                const suitedFor = Array.isArray(preferringFor)
                    ? preferringFor
                    : preferringFor.split(",");
                query["pgDetails.bestSuitedFor"] = { $in: suitedFor };
            }

            // Budget for PG
            if (minBudget || maxBudget) {
                const priceQuery = {};
                if (minBudget) priceQuery.$gte = parseInt(minBudget);
                if (maxBudget) priceQuery.$lte = parseInt(maxBudget);
                query["pricing.rentAmount"] = priceQuery;
            }
        }

        // ===== CO-LIVING FILTERS =====
        if (listingType === "Co-Living") {
            if (lookingFor) {
                query["coLivingDetails.lookingFor"] = lookingFor;
            }
            if (preferredGender) {
                query["coLivingDetails.gender"] = preferredGender;
            }
            if (preferringFor) {
                query["coLivingDetails.occupation"] = { $regex: preferringFor, $options: "i" };
            }

            // Budget for Co-living
            if (minBudget || maxBudget) {
                const budgetQuery = {};
                if (minBudget) budgetQuery.$gte = parseInt(minBudget);
                if (maxBudget) budgetQuery.$lte = parseInt(maxBudget);
                query["coLivingDetails.budgetRange.max"] = budgetQuery;
            }
        }

        // ===== PLOT/LAND FILTERS =====
        if (listingType === "PLOT_LAND" || propertyCategory === "Plot/Land") {
            // Plot Type (Residential/Commercial)
            if (propertyType) {
                query.propertyType = propertyType;
            }

            // Facing
            if (req.query.facing) {
                query["plotDetails.facing"] = req.query.facing;
            }

            // Corner Plot
            if (req.query.cornerPlot === "true") {
                query["plotDetails.cornerPlot"] = true;
            }

            // Boundary Wall
            if (req.query.boundaryWall === "true") {
                query["plotDetails.boundaryWall"] = true;
            }

            // Plot Area filter
            if (minArea || maxArea) {
                const areaQuery = {};
                if (minArea) areaQuery.$gte = parseInt(minArea);
                if (maxArea) areaQuery.$lte = parseInt(maxArea);
                query["plotDetails.plotArea"] = areaQuery;
            }

            // Budget for Plot/Land
            if (minBudget || maxBudget) {
                const priceQuery = {};
                if (minBudget) priceQuery.$gte = parseInt(minBudget);
                if (maxBudget) priceQuery.$lte = parseInt(maxBudget);
                query["pricing.salePrice"] = priceQuery;
            }
        }

        // ===== HOT DEALS / PREMIUM FILTER =====
        if (req.query.hotDeals === "true") {
            query.isPremium = true;
        }

        // ===== COMMON FILTERS =====

        // Only with images
        if (withImages === "true") {
            query["photos.0"] = { $exists: true };
        }

        // ===== SORTING =====
        let sortOption = { createdAt: -1 }; // Default: newest first

        // Premium properties first, then by sort option
        const sortPipeline = [
            { isPremium: -1 },
            { "premium.boostRank": -1 }
        ];

        switch (sortBy) {
            case "price_low":
                sortOption = { "pricing.rentAmount": 1, "pricing.salePrice": 1 };
                break;
            case "price_high":
                sortOption = { "pricing.rentAmount": -1, "pricing.salePrice": -1 };
                break;
            case "newest":
                sortOption = { createdAt: -1 };
                break;
            case "oldest":
                sortOption = { createdAt: 1 };
                break;
            case "score":
                sortOption = { listingScore: -1 };
                break;
        }

        // ===== EXECUTE QUERY =====
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const [properties, totalCount] = await Promise.all([
            Property.find(query)
                .populate("userId", "name phone profileImage")
                .sort({ isPremium: -1, "premium.boostRank": -1, ...sortOption })
                .skip(skip)
                .limit(parseInt(limit))
                .lean(),
            Property.countDocuments(query)
        ]);

        // ===== RESPONSE =====
        res.status(200).json({
            success: true,
            properties,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalCount / parseInt(limit)),
                totalProperties: totalCount,
                hasMore: (parseInt(page) * parseInt(limit)) < totalCount
            },
            filters: {
                applied: Object.keys(query).length - 2, // Exclude status and isDeleted
                query: req.query
            }
        });

    } catch (error) {
        console.error("Filter properties error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to filter properties",
            error: error.message
        });
    }
};

/**
 * SEARCH PROPERTIES API
 * GET /api/properties/search?q=keyword
 * 
 * Search by city, locality, society, landmark
 */
exports.searchProperties = async (req, res) => {
    try {
        const { q, listingType, page = 1, limit = 20 } = req.query;

        if (!q) {
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            });
        }

        const searchRegex = { $regex: q, $options: "i" };

        const query = {
            status: "ACTIVE",
            isDeleted: false,
            $or: [
                { "location.city": searchRegex },
                { "location.locality": searchRegex },
                { "location.society": searchRegex },
                { "location.landmark": searchRegex },
                { propertyCategory: searchRegex }
            ]
        };

        if (listingType) {
            query.listingType = listingType;
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const [properties, totalCount] = await Promise.all([
            Property.find(query)
                .populate("userId", "name phone profileImage")
                .sort({ isPremium: -1, listingScore: -1, createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit))
                .lean(),
            Property.countDocuments(query)
        ]);

        res.status(200).json({
            success: true,
            properties,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalCount / parseInt(limit)),
                totalProperties: totalCount,
                hasMore: (parseInt(page) * parseInt(limit)) < totalCount
            }
        });

    } catch (error) {
        console.error("Search properties error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to search properties",
            error: error.message
        });
    }
};

/**
 * GET NEARBY PROPERTIES
 * GET /api/properties/nearby?lat=28.5&lng=77.2&radius=5
 * 
 * Get properties within radius (km)
 */
exports.getNearbyProperties = async (req, res) => {
    try {
        const { lat, lng, radius = 5, listingType, page = 1, limit = 20 } = req.query;

        if (!lat || !lng) {
            return res.status(400).json({
                success: false,
                message: "Latitude and longitude are required"
            });
        }

        // Convert radius from km to degrees (approximate)
        const radiusInDegrees = parseFloat(radius) / 111;

        const query = {
            status: "ACTIVE",
            isDeleted: false,
            "location.coordinates.lat": {
                $gte: parseFloat(lat) - radiusInDegrees,
                $lte: parseFloat(lat) + radiusInDegrees
            },
            "location.coordinates.lng": {
                $gte: parseFloat(lng) - radiusInDegrees,
                $lte: parseFloat(lng) + radiusInDegrees
            }
        };

        if (listingType) {
            query.listingType = listingType;
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const [properties, totalCount] = await Promise.all([
            Property.find(query)
                .populate("userId", "name phone profileImage")
                .sort({ isPremium: -1, createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit))
                .lean(),
            Property.countDocuments(query)
        ]);

        res.status(200).json({
            success: true,
            properties,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalCount / parseInt(limit)),
                totalProperties: totalCount
            }
        });

    } catch (error) {
        console.error("Nearby properties error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to get nearby properties",
            error: error.message
        });
    }
};

/**
 * GET PROPERTY DETAILS
 * GET /api/properties/:id
 */
exports.getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id)
            .populate("userId", "name phone profileImage userType");

        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found"
            });
        }

        res.status(200).json({
            success: true,
            property
        });

    } catch (error) {
        console.error("Get property error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to get property",
            error: error.message
        });
    }
};

/**
 * GET MY PROPERTIES
 * GET /api/properties/my
 * 
 * Get properties created by logged in user
 */
exports.getMyProperties = async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;

        const query = {
            userId: req.user.id,
            isDeleted: false
        };

        if (status) {
            query.status = status;
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const [properties, totalCount] = await Promise.all([
            Property.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit))
                .lean(),
            Property.countDocuments(query)
        ]);

        res.status(200).json({
            success: true,
            properties,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalCount / parseInt(limit)),
                totalProperties: totalCount
            }
        });

    } catch (error) {
        console.error("Get my properties error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to get your properties",
            error: error.message
        });
    }
};
