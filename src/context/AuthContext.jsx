import { useEffect, useState, createContext } from "react";
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export default function CreateContextProvider({ children }) {
  const [Token, setToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("tkn");
    if (userToken) {
      setToken(userToken);
      try {
        const decoded = jwtDecode(userToken); // فك التوكن واستخراج البيانات
        // console.log("decoded", decoded.id);
        setDecodedToken(decoded); // تخزين البيانات المفكوكة
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ Token, setToken, decodedToken }}>
      {children}
    </AuthContext.Provider>
  );
}
