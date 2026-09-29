import { auth } from '@/auth';

const useAuth = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, message: `Unauthorized or missing user data!` };
  }
  const userId = session.user.id;
  return {userId};
};
export default useAuth;
