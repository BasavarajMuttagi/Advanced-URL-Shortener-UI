import { jwtDecode } from "jwt-decode";

export type tokenType = {
  userId: string;
  email: string;
  displayName: string;
  iat: number;
  exp: number;
};
export const getToken = () => sessionStorage.getItem("token") || "";
export const logOut = () => sessionStorage.removeItem("token");

const useAuth = () => {
  const token = getToken();
  if (!token) {
    logOut();
    return { decodedToken: null, isExpired: true };
  }

  try {
    const decoded = jwtDecode<tokenType>(token);
    const currentTime = Date.now() / 1000;
    const isExpired = decoded.exp < currentTime;

    if (isExpired) {
      logOut();
      return { decodedToken: null, isExpired: true };
    }

    return {
      decodedToken: decoded,
      isExpired: false,
    };
  } catch (error) {
    console.log(error);
    logOut();
    return { decodedToken: null, isExpired: true };
  }
};

export default useAuth;
