import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

import { clientRoutes } from "../../routes";
import Authorization from "../../pages/Authorization/Authorization";

const AppRouter = () => {
    const auth = useSelector((state) => state.auth.isAuth);
    console.log(auth)
    const role = useSelector((state) => state.auth.user.role);

    return (
        <>
            <Routes>
                {auth ? (
                    <>
                    {/* {role !== 'admin' &&} */}
                        {clientRoutes.map(({ path, Component }) => (
                            <Route key={path} path={path} element={<Component />} />
                        ))}
                        
                        <Route path="*" element={<Navigate to="/main" />} />
                    </>
                ) : (
                    <>
                        <Route path="/authorization" element={<Authorization />} />
                        <Route path="*" element={<Navigate to="/authorization" />} />
                    </>
                )}
            </Routes>
        </>
    );
};

export default AppRouter;
