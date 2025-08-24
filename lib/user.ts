// lib/user.ts
import { prisma } from './prisma'

// Enhanced display ID generation with more variety
export const generateDisplayId = (): string => {
    const adjectives = [
        'Swift', 'Clever', 'Bright', 'Quick', 'Sharp', 'Bold', 'Smart', 'Wise',
        'Brave', 'Cool', 'Epic', 'Fast', 'Great', 'Lucky', 'Magic', 'Noble',
        'Pure', 'Royal', 'Super', 'True', 'Wild', 'Zen', 'Alpha', 'Cosmic'
    ]

    const nouns = [
        'Pioneer', 'Explorer', 'Trader', 'Splitter', 'Navigator', 'Hunter', 'Builder',
        'Creator', 'Leader', 'Master', 'Ninja', 'Phoenix', 'Ranger', 'Scholar',
        'Seeker', 'Titan', 'Warrior', 'Wizard', 'Captain', 'Champion', 'Knight',
        'Legend', 'Sage', 'Spirit', 'Guardian', 'Keeper', 'Walker', 'Rider'
    ]

    const colors = [
        'Azure', 'Crimson', 'Golden', 'Silver', 'Violet', 'Emerald', 'Sapphire',
        'Ruby', 'Pearl', 'Onyx', 'Jade', 'Coral', 'Amber', 'Ivory', 'Cobalt'
    ]

    // Generate different patterns
    const patterns = [
        () => {
            const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
            const noun = nouns[Math.floor(Math.random() * nouns.length)]
            const num = Math.floor(Math.random() * 9999).toString().padStart(4, '0')
            return `${adj}${noun}#${num}`
        },
        () => {
            const color = colors[Math.floor(Math.random() * colors.length)]
            const noun = nouns[Math.floor(Math.random() * nouns.length)]
            const num = Math.floor(Math.random() * 999).toString().padStart(3, '0')
            return `${color}${noun}${num}`
        },
        () => {
            const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
            const color = colors[Math.floor(Math.random() * colors.length)]
            const num = Math.floor(Math.random() * 99).toString().padStart(2, '0')
            return `${adj}${color}${num}`
        }
    ]

    const pattern = patterns[Math.floor(Math.random() * patterns.length)]
    return pattern()
}

export const createOrGetUser = async (piUserId: string) => {
    try {
        // Try to find existing user first
        let user = await prisma.user.findUnique({
            where: { piUserId },
            select: {
                id: true,
                piUserId: true,
                displayId: true,
                avatar: true,
                preferences: true,
                createdAt: true
            }
        })

        // If user doesn't exist, create them
        if (!user) {
            const avatars = ['🚀', '⚡', '💎', '🌟', '🔥', '💫', '🎯', '⭐', '🌈', '🎨', '🎭', '🎪', '🎲', '🎯', '🎸']

            user = await prisma.user.create({
                data: {
                    piUserId,
                    displayId: await generateUniqueDisplayId(),
                    avatar: avatars[Math.floor(Math.random() * avatars.length)],
                    preferences: {
                        theme: 'dark',
                        currency: 'PI',
                        language: 'en',
                        notifications: true,
                        animationsEnabled: true,
                        compactMode: false
                    }
                },
                select: {
                    id: true,
                    piUserId: true,
                    displayId: true,
                    avatar: true,
                    preferences: true,
                    createdAt: true
                }
            })

            console.log('Created new user:', user)
        } else {
            console.log('Found existing user:', user)
        }

        return user
    } catch (error) {
        console.error('Error creating/getting user:', error)
        throw error
    }
}

// Helper to ensure unique display ID
const generateUniqueDisplayId = async (maxAttempts = 5): Promise<string> => {
    for (let i = 0; i < maxAttempts; i++) {
        const displayId = generateDisplayId()

        const existing = await prisma.user.findUnique({
            where: { displayId }
        })

        if (!existing) {
            return displayId
        }
    }

    // Fallback with timestamp if all attempts fail
    return `${generateDisplayId()}${Date.now()}`
}
