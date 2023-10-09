"use client";
import { auth, googleAuthProvider } from "../app/config/firebase";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import useStore from "@/store/useStore";


const Auth = () => {
    const cookies = new Cookies();
    const { isAuth, setIsAuth } = useStore();

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleAuthProvider);

            // result.user will have accesss token, refresh token and other user info
            // we refresh token to get new access token when it expires
            // we will use this refresh token as cookie
            cookies.set("auth-token", result.user.refreshToken);
            // console.log(result.user);
            setIsAuth(cookies.get("auth-token"));
        } catch (err) {
            console.log("error: ", err);
        }
    };
    return (
        <div className="auth">
            <div>Sign in with Google to continue</div>
            <button
                onClick={signInWithGoogle}
                className="border-2 border-slate-400 bg-red-50"
            >
                Sign in with Google
            </button>
        </div>
    );
};

export default Auth;
