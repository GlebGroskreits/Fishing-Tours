import { AppRouter, Footer, Header, Loading, Modal, SMain } from "./utils/components";
import { checkAuth } from "./store/slices/authSlice";
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


function App() {

    const dispatch = useDispatch();
    
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(checkAuth()).finally(() => {
                setIsInitialized(true);
            });
        } else {
            setIsInitialized(true);
        }
    }, [dispatch]);

    useEffect(() => {
        const savedFilters = JSON.parse(localStorage.getItem('tourFilters'));
        if (!savedFilters) {
            localStorage.setItem('tourFilters', JSON.stringify({
                criterion: '',
                range: '',
                change: 'active tour',
            }));
        } 
    })

    return (
        <BrowserRouter>    
            <Header />
            <SMain> 
                { isInitialized ? ( <AppRouter /> ) : ( <Loading /> )}
            </SMain>
            <Footer />
            <Modal/>
        </BrowserRouter>
    );
}

export default App;
