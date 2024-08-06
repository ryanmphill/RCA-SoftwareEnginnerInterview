import { createContext, useCallback, useMemo, useState } from "react";
import PocketBase from "pocketbase";
import PropTypes from "prop-types";
const BASE_URL = "https://rra-coding-exercise.pockethost.io/";

export const PbContext = createContext();

export const PocketBaseProvider = ({ children }) => {
    const pb = useMemo(() => new PocketBase(BASE_URL), []);
    const [token, setToken] = useState(pb.authStore.token);
    const [user, setUser] = useState(pb.authStore.model);

    const syncUserState = useCallback((authStore) => {
        setToken(authStore.token);
        setUser(authStore.model);
      }, []);

    return (
        <PbContext.Provider
            value={{ pb, token, setToken, user, setUser, syncUserState }}
        >
            {children}
        </PbContext.Provider>
    )
}

PocketBaseProvider.propTypes = {
    children: PropTypes.node.isRequired,
};