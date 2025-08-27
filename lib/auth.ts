// lib/auth.ts
export const verifyPiAccessToken = async (accessToken: string) => {
    try {
        const response = await fetch('https://api.minepi.com/v2/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })

        if (response.ok) {
            const userData = await response.json()
            return {
                isValid: true,
                user: {
                    uid: userData.uid,
                    username: userData.username
                }
            }
        } else {
            console.error('Token verification failed:', response.status)
            return { isValid: false, user: null }
        }
    } catch (error) {
        console.error('Token verification error:', error)
        return { isValid: false, user: null }
    }
}
