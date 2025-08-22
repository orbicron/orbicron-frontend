import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Group {
  id: string
  name: string
  description: string
  memberCount: number
  totalExpenses: number
  pendingSettlements: number
  lastActivity: Date
  coverImage: string
  isAdmin: boolean
  members: Array<{
    id: string
    username: string
    avatar: string
  }>
}

interface GroupState {
  groups: Group[]
  addGroup: (group: Group) => void
  updateGroup: (id: string, group: Partial<Group>) => void
  deleteGroup: (id: string) => void
  getGroupById: (id: string) => Group | undefined
}

export const useGroupStore = create<GroupState>()(
  persist(
    (set, get) => ({
      groups: [],
      addGroup: (group) =>
        set((state) => ({ groups: [...state.groups, group] })),
      updateGroup: (id, updates) =>
        set((state) => ({
          groups: state.groups.map(group =>
            group.id === id ? { ...group, ...updates } : group
          )
        })),
      deleteGroup: (id) =>
        set((state) => ({
          groups: state.groups.filter(group => group.id !== id)
        })),
      getGroupById: (id) =>
        get().groups.find(group => group.id === id),
    }),
    { name: 'orbicron-groups' }
  )
)
