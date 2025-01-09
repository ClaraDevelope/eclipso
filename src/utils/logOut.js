import { createSkeleton, removeSkeleton } from "../components/loading/loading";
import { router } from "../routes/routes";

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userName')
  localStorage.removeItem('email')
  createSkeleton()
  router.navigate('/')
  window.location.reload();
  removeSkeleton()
};
