export interface PiUser {
    uid: string
    username: string
}

export interface PiAuthResult {
    accessToken: string
    user: PiUser
}

export interface PiPayment {
    identifier: string
    user_uid: string
    amount: number
    memo: string
    metadata: Record<string, any>
    from_address: string
    to_address: string
    direction: string
    created_at: string
    network: string
    status: {
        developer_approved: boolean
        transaction_verified: boolean
        developer_completed: boolean
        cancelled: boolean
        user_cancelled: boolean
    }
    transaction?: {
        txid: string
        verified: boolean
        _link: string
    }
}
