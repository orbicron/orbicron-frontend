// components/auth/PiAuth.tsx
'use client';
import { usePiSDK } from '@/hooks/usePiSDK';
import { useAuthStore } from '@/store/authStore';

export const PiAuth = () => {
  const { piSDK, isInitialized, authenticate } = usePiSDK();
  const { user, setUser, isAuthenticated } = useAuthStore();

  const handleLogin = async () => {
    const authResult = await authenticate();
    if (authResult) {
      setUser(authResult.user);
    }
  };

  if (!isInitialized) {
    return <div>Loading Pi Network...</div>;
  }

  if (isAuthenticated) {
    return <div>Welcome, {user?.username}!</div>;
  }

  return (
    <button 
      onClick={handleLogin}
      className="bg-purple-600 text-white px-6 py-3 rounded-lg"
    >
      Login with Pi Network
    </button>
  );
};
