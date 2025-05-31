import React, { createContext, useEffect, useState } from 'react';

import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from './firebase.init';



export const AuthContext = createContext()

const auth = getAuth(app)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // console.log(user)

    const CreatUser = (email, password) => {

        return createUserWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const observer = onAuthStateChanged(auth, (currentUser) => {
            // console.log('user state change', currentUser);
            setUser(currentUser)
            setLoading(false)
        })

        return () => {
            observer()
        }

    }, [])

    const Logout = () => {
        return signOut(auth)
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo)
    }

    const authData = {
        user,
        setUser,
        CreatUser,
        Logout,
        login,
        loading,
        setLoading,
        updateUser,
    }

    return (
        <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;