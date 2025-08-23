// lib/user.ts
import { prisma } from './prisma'

// Generate anonymous display ID
export const generateDisplayId = (): string => {
    const adjectives = ['Swift', 'Clever', 'Bright', 'Quick', 'Sharp']
    const nouns = ['Pioneer', 'Explorer', 'Trader', 'Splitter', 'Navigator']
    const number = Math.floor(Math.random() * 9999)

    const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
    const noun = nouns[Math.floor(Math.random() * nouns.length)]

    return `${adj}${noun}#${number}`
}

export const createUser = async (piUserId: string) => {
    const user = await prisma.user.create({
        data: {
            piUserId,
            displayId: generateDisplayId(),
            avatar: '🚀',
            preferences: {
                theme: 'dark',
                currency: 'PI',
                language: 'en',
                notifications: true
            }
        }
    })

    return user
}
