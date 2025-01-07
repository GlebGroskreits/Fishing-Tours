import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../services/AuthService';
import { API_URL } from '../../http';
import axios from 'axios'

export const login = createAsyncThunk('auth/login', async ( {email, password }) => {
    const response = await AuthService.login(email, password);
    localStorage.setItem('token', response.accessToken);
    return response;
});

export const registration = createAsyncThunk('auth/registration', async ({registrationData}) => {
    const response = await AuthService.registration(registrationData);

    return response; 
});

export const checkAuth = createAsyncThunk('auth/refresh', async () =>{
    const response = await axios.get(`${API_URL}/user/refresh`, {withCredentials: true})
    localStorage.setItem('token', response.data.accessToken);
    return response.data; 
});

export const getUser = createAsyncThunk('auth/getUser', async ({id_user}) => {
    const response = await AuthService.getUser(id_user);

    return response;
});

export const getRequest = createAsyncThunk('auth/getRequest', async ({id_client}) => {
    const response = await AuthService.getRequest(id_client);

    return response;
});

export const getRequestGuide = createAsyncThunk('auth/getRequestGuide', async ({id_guide}) => {
    const response = await AuthService.getRequestGuide(id_guide);

    return response;
});

export const changePersonal = createAsyncThunk('auth/changePersonal', async ({personalData}) => {
    const response = await AuthService.changePersonal(personalData);

    return response;
});


const authSlice = createSlice({
    name: 'auth', 
    initialState: {
        user: {
            id: '',
            role: '',
        },
        myUser: null,
        myTour: null,
        isAuth: false,
        isLoading: false,  
    },
    reducers: {
        setAuth(state, action) {
            state.isAuth = action.payload;
            localStorage.setItem('isAuth', action.payload);
        },
        setUser(state, action) {
            state.user = action.payload;
        },
        setLoading(state, action){
            state.isLoading = action.payload;
        }
    },
    extraReducers: (builder) => {  
        builder
            .addCase(login.fulfilled, (state, action) => {  
                state.isAuth = true;
                state.user = action.payload.user;  
            })
            .addCase(getUser.fulfilled, (state, action) => {  
                state.myUser = action.payload;  
            })
            .addCase(getRequest.fulfilled, (state, action) => {  
                state.myTour = action.payload;  
            })
            .addCase(getRequestGuide.fulfilled, (state, action) => {  
                state.myTour = action.payload;  
            })
            .addCase(registration.fulfilled, (state, action) => {  
                console.log('check')
            })
            .addCase(changePersonal.fulfilled, () => {
                window.location.reload();
            })
            .addCase(checkAuth.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isAuth = true;
                state.user = action.payload.user;
                state.isLoading = false;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false;
            });
    },
});

export const { setLoading, setAuth, setUser } = authSlice.actions;

export default authSlice.reducer;