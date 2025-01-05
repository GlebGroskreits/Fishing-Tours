import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ReviewService from '../../services/ReviewService';
import { API_URL } from '../../http';

export const getReview = createAsyncThunk('guide/getReview', async () => {
    const response = await ReviewService.getReview();
    console.log(response)
    return response;
});

export const createReview = createAsyncThunk('guide/createReview', async ({id_client, id_tour, raiting, description}) => {
    const reviewData = {id_client, id_tour, raiting, description}
    const response = await ReviewService.createReview(reviewData);

    return response;
});


const reviewSlice = createSlice({
    name: 'review', 
    initialState: { 
        review: [],
    },
    reducers: {
       
    },
    extraReducers: (builder) => {  
        builder
            .addCase(getReview.fulfilled, (state, action) => {  
                state.review = action.payload;
            })
            .addCase(createReview.fulfilled, (state, action) => { 
                if(!state.review){
                    state.review = [];
                } 
                state.review.push(action.payload);
            })
    },
});

export const {  } = reviewSlice.actions;

export default reviewSlice.reducer;