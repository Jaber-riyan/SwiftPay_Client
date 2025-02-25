import React, { createContext, useEffect, useState } from 'react';
export const AuthContext = createContext();
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import auth from '../Firebase/Firebase.config';
import axios from 'axios';
import UseAxiosSecure from '../Hooks/UseAxiosSecureAndNormal/UseAxiosSecure';
import UseAxiosNormal from '../Hooks/UseAxiosSecureAndNormal/UseAxiosNormal';


const Authentication = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const handleRegister = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const handleLogout = () => {
        setLoading(true);
        return signOut(auth)

    }

    const handleLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // social register 
    const googleRegister = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    // if (user) {
                    //     const userResponse = await axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/user/${currentUser.email}`);
                    //     console.log(userResponse.data);
                    //     setUser({ ...user, userDBData: userResponse.data });
                    //     return 
                    // }

                    setUser(currentUser)

                    const tokenResponse = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/jwt/create`,
                        { email: currentUser.email },
                        { withCredentials: true }
                    );

                    if (tokenResponse.data.token) {
                        localStorage.setItem('authToken', tokenResponse.data.token);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                } finally {
                    setLoading(false);  // ✅ Ensures loading state is turned off
                }
            } else {
                localStorage.removeItem('authToken');
                setLoading(false);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);


    const authInfo = {
        user,
        setUser,
        handleRegister,
        handleLogout,
        handleLogin,
        loading,
        googleRegister,
        setLoading,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authentication;