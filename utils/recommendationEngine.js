import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export const getRecommendations = async (userId) => {
    try {
        // 1. Fetch all available hosts (experiences)
        const hostsRef = collection(db, 'hosts');
        const hostsSnapshot = await getDocs(hostsRef);
        const allHosts = hostsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // If no user is logged in, return all hosts (or a default selection)
        if (!userId) {
            return allHosts;
        }

        // 2. Fetch user's wishlist
        const wishlistRef = collection(db, 'users', userId, 'wishlist');
        const wishlistSnapshot = await getDocs(wishlistRef);
        const wishlistItems = wishlistSnapshot.docs.map(doc => doc.data());

        // If wishlist is empty, return all hosts
        if (wishlistItems.length === 0) {
            return allHosts;
        }

        // 3. Calculate scores for each host based on similarity to wishlist items
        const scoredHosts = allHosts.map(host => {
            // Calculate score based on similarity
            let score = 0;
            wishlistItems.forEach(item => {
                // Similarity rules
                if (item.location === host.location) {
                    score += 1; // Same location
                }
                if (item.experienceName === host.experienceName) {
                    score += 2; // Same category/experience type
                }
                // Add more rules here (e.g., price range, tags if available)
            });

            return { ...host, score };
        });

        // 4. Sort by score (descending)
        const recommendations = scoredHosts
            .sort((a, b) => b.score - a.score);

        return recommendations;

    } catch (error) {
        console.error("Error generating recommendations:", error);
        return []; // Return empty array on error
    }
};
