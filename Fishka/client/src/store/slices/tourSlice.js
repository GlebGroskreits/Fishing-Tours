import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TourService from '../../services/TourService'

export const getTour = createAsyncThunk('tour/getTour', async ({type}) => {
    const response = await TourService.getTour(type);
    console.log(response)
    return response;
});

export const createTour = createAsyncThunk('tour/createTour', async ({tourData}) => {
    const response = await TourService.createTour(tourData);

    return response;
});

export const createTourActive = createAsyncThunk('tour/createTourActive', async ({tourActiveData}) => {
    const response = await TourService.createTourActive(tourActiveData);

    return response;
});

const tourSlice = createSlice({
    name: "tour",
    initialState: {
        tours: [],
        activeTours: []
    },
    reducers: {
       
    },
    extraReducers: (builder) => {  
        builder
            .addCase(getTour.fulfilled, (state, action) => { 
                state.tours = action.payload.tours;
                state.activeTours = action.payload.activeTours;
            })
            .addCase(createTour.fulfilled, (state, action) => {  
                state.tours.push(action.payload); 
            })
            .addCase(createTourActive.fulfilled, (state, action) => {  
                const tourId = action.payload.id_tour; // Предполагаем, что у вас есть поле id_tour
                const foundTour = state.tours.find(tour => tour.id === tourId);

                if (foundTour) {
                    const newActiveTour = { ...foundTour, ...action.payload };
                    state.activeTours.push(newActiveTour); 
                }
            });
    },
});

export const {  } = tourSlice.actions;

export default tourSlice.reducer;