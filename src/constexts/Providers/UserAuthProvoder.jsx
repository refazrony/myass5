/* eslint-disable react/prop-types */
import { useState } from "react";
import { AuthContext } from "..";

function UserAuthProvoder({ children }) {
    const [user, setUser] = useState({});

    const BasedUrl = "http://localhost:3000";
    return (
        <AuthContext.Provider value={{ user, setUser, BasedUrl }}>
            {children}
        </AuthContext.Provider>
    );
}

export default UserAuthProvoder;