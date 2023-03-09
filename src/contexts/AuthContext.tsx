import { createContext, useContext, useEffect, useState } from "react";
import fetchHeaders from "../utils/Headers";
import { SERVER_DOMAIN } from "../utils/Variables";

export interface IUser {
  email: string;
  id: string;
  isLoggedIn: Boolean;
}

export interface AuthContextType {
  currentUser?: IUser;
  pending: Boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<AuthContextType>({
    pending: true,
  });

  const fetchUser = async () => {
    fetch(`${SERVER_DOMAIN}/api/auth/isLoggedIn`, {
      headers: fetchHeaders,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.type === "error") {
          setCurrentUser({ pending: false });
          return console.log(data.message);
        } else {
          setCurrentUser({ currentUser: data, pending: false });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
