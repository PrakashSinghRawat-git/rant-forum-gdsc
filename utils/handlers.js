import { auth, googleAuthProvider } from "@/app/config/firebase";
import { signInWithPopup, getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { addUser } from "@/utils/db";
import Cookies from "universal-cookie";



const cookies = new Cookies();


export const handleSignIn = async ({ isAuth, setIsAuth, setCurrentUserObj }) => {
    try {
        const result = await signInWithPopup(auth, googleAuthProvider);

        const userObj = {
            name: result.user.displayName,
            email: result.user.email,
            photoUrl: result.user.photoURL,
            anonymousName: result.user.anonymouseName

        };
        // result.user will have accesss token, refresh token and other user info
        // we refresh token to get new access token when it expires
        // we will use this refresh token as cookie
        addUser(userObj)
            .then((res) => {
                console.log(res);
                toast.success(
                    "User added successfully with id..." + res.id
                );

                userObj.id = res.id;
                cookies.set("auth-token", result.user.refreshToken);
                cookies.set("user-object", userObj);

                setIsAuth(cookies.get("auth-token"));
               
                setCurrentUserObj(userObj);

                toast.success("Signed in successfully...");

            })
            .catch((err) => {
                console.log("error adding user to db: " + err);
                toast.error("Error signing in...");
            });
    } catch (err) {
        console.log("error: ", err);
        toast.error("Error signing in...");
    }
};
export const handleSignOut = ({ isAuth, setIsAuth,setCurrentUserObj }) => {
    signOut(auth)
        .then(() => {
            cookies.remove("auth-token");
            setIsAuth(false);
            setCurrentUserObj({});

            toast.success("Signed out successfull...");
        })
        .catch((error) => {
            toast.error("Error signing out...");
            console.log("Error signing out..." + error);
        });
};