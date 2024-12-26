import { AppRouter, Footer, Header, Loading, SMain } from "./utils/components";
import { checkAuth } from "./store/slices/authSlice";
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";


function App() {

    const dispatch = useDispatch();
    
    const [isInitialized, setIsInitialized] = useState(true);

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         dispatch(checkAuth()).finally(() => {
    //             setIsInitialized(true);
    //         });
    //     } else {
    //         setIsInitialized(true);
    //     }
    // }, [dispatch]);

    return (
        <BrowserRouter>    
            <Header />
            <SMain>
            <AppRouter />
            {/* {isInitialized ? ( <AppRouter /> ) : ( <Loading /> )} */}
            </SMain>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
