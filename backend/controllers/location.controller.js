const axios = require("axios");
const User = require("../models/user.model");

/**
 * GET /api/location/search?query=kamla+nagar+agra
 * Search locations using OpenStreetMap Nominatim API
 * 
 * Note: Use + or %20 for spaces in query
 * ✅ Correct: ?query=kamla+nagar+agra
 * ❌ Wrong:  ?query=kamla&nagar&agra (& separates different query params)
 */
exports.getLocation = async (req, res) => {
    try {
        const { query, countrycode } = req.query;

        if (!query || query.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Query is required. Use + for spaces (e.g., ?query=kamla+nagar+agra)"
            });
        }

        const response = await axios.get(
            "https://nominatim.openstreetmap.org/search",
            {
                params: {
                    q: query,
                    format: "json",
                    addressdetails: 1,
                    limit: 10,
                    countrycodes: countrycode || "in" // Default: India
                },
                headers: {
                    "User-Agent": "TockenApp/1.0 (admin@realestate.com)"
                }
            }
        );

        if (response.data.length === 0) {
            return res.json({
                success: true,
                count: 0,
                data: [],
                message: "No locations found for your search"
            });
        }

        const results = response.data.map(item => ({
            placeId: item.place_id,
            displayName: item.display_name,
            city:
                item.address?.city ||
                item.address?.town ||
                item.address?.village ||
                item.address?.county ||
                item.address?.state_district ||
                "",
            locality:
                item.address?.suburb ||
                item.address?.neighbourhood ||
                item.address?.residential ||
                "",
            state: item.address?.state || "",
            country: item.address?.country || "India",
            pincode: item.address?.postcode || "",
            type: item.type || "",
            lat: item.lat,
            lon: item.lon
        }));

        res.json({
            success: true,
            count: results.length,
            data: results
        });

    } catch (error) {
        console.error("Location search error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to search location",
            error: error.message
        });
    }
};

/**
 * POST /api/location/save
 * Save user's preferred location
 */
exports.saveLocation = async (req, res) => {
    try {
        const { location } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { location }, 
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            message: "Location saved successfully",
            data: user.location
        });

    } catch (error) {
        console.error("Save location error:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
