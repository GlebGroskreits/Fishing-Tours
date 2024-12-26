import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import GuideService from '../../services/GuideService';
import { API_URL } from '../../http';

export const getGuide = createAsyncThunk('guide/getGuide', async () => {
    const response = await GuideService.getGuide();
    console.log(response)
    return response;
});


const guideSlice = createSlice({
    name: 'guide', 
    initialState: { 
        guide: [],
    },
    reducers: {
        setGuide(state, action){
            state.guide = action.payload;
        }
    },
    extraReducers: (builder) => {  
        builder
            .addCase(getGuide.fulfilled, (state, action) => {  
                state.guide = action.payload;
            })
    },
});

export const {  } = guideSlice.actions;

export default guideSlice.reducer;