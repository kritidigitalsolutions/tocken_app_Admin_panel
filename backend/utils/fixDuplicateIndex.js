const mongoose = require("mongoose");

/**
 * Fix duplicate index errors on MongoDB collections
 * This utility checks for problematic indexes and removes duplicates
 * Runs on server startup to ensure clean index state
 */
const fixDuplicateIndexError = async () => {
    try {
        const db = mongoose.connection.db;

        if (!db) {
            console.log("⚠️ Database not connected yet, skipping index fix");
            return;
        }

        // Collections that might have index issues
        const collectionsToCheck = ["users", "properties", "banners", "wallpapers", "feedbacks"];

        for (const collectionName of collectionsToCheck) {
            try {
                const collection = db.collection(collectionName);

                // Check if collection exists
                const collections = await db.listCollections({ name: collectionName }).toArray();
                if (collections.length === 0) {
                    continue;
                }

                // Get all indexes
                const indexes = await collection.indexes();

                // Track index names for duplicates
                const indexFields = {};
                const duplicateIndexes = [];

                for (const index of indexes) {
                    if (index.name === "_id_") continue; // Skip default _id index

                    const fieldKey = JSON.stringify(index.key);

                    if (indexFields[fieldKey]) {
                        // Found duplicate - mark for removal
                        duplicateIndexes.push(index.name);
                    } else {
                        indexFields[fieldKey] = index.name;
                    }
                }

                // Remove duplicate indexes
                for (const indexName of duplicateIndexes) {
                    try {
                        await collection.dropIndex(indexName);
                        console.log(`✅ Dropped duplicate index "${indexName}" from ${collectionName}`);
                    } catch (dropError) {
                        console.log(`⚠️ Could not drop index "${indexName}": ${dropError.message}`);
                    }
                }

                // Check for null/sparse index issues on username field (common issue)
                if (collectionName === "users") {
                    const usernameIndex = indexes.find(idx => idx.key && idx.key.username);
                    if (usernameIndex && !usernameIndex.sparse) {
                        try {
                            // Try to fix non-sparse unique index on username
                            await collection.dropIndex("username_1");
                            console.log("✅ Dropped non-sparse username index");
                        } catch (e) {
                            // Index might not exist or already correct
                        }
                    }
                }

            } catch (collectionError) {
                // Collection might not exist yet, skip silently
                if (collectionError.code !== 26) { // 26 = NamespaceNotFound
                    console.log(`⚠️ Error checking ${collectionName}: ${collectionError.message}`);
                }
            }
        }

        console.log("✅ Index check completed");

    } catch (error) {
        console.error("❌ Error in fixDuplicateIndexError:", error.message);
        // Don't throw - this is a non-critical startup task
    }
};

module.exports = fixDuplicateIndexError;
