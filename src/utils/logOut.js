import { createSkeleton, removeSkeleton } from "../components/loading/loading";

export const logout = () => {
  localStorage.removeItem('authToken');
  createSkeleton()
  window.location.hash = '#landing';
  window.location.reload();
  removeSkeleton()
};
