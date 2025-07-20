import { useEffect, useState, createContext } from "react";
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export default function CreateContextProvider({ children }) {
  const [Token, setToken] = useState(null );
  // const [darkMode, setDarkMode] = useState(true);
  const [decodedToken, setDecodedToken] = useState(null);
  // console.log(Token);
  

  useEffect(() => {
    const userToken = localStorage.getItem("tkn");
    const darkMode = localStorage.getItem("theme");
    // console.log("darkMode", darkMode);
    // console.log("userToken", userToken);
    

    if (userToken) {
      setToken(userToken);

      // setDarkMode(true);
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
