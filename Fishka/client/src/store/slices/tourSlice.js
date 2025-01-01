import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TourService from '../../services/TourService'

export const getTour = createAsyncThunk('tour/getTour', async ({type}) => {
    const response = await TourService.getTour(type);

    return response;
});

export const changeTour = createAsyncThunk('tour/changeTour', async ({tourData}) => {
    const response = await TourService.changeTour(tourData);

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
        activeTours: [],
        selectedTour: null,
    },
    reducers: {
        setSelectedTour(state, action){
            state.selectedTour = action.payload;
        }
    },
    extraReducers: (builder) => {  
        builder
            .addCase(getTour.fulfilled, (state, action) => { 
                state.tours = action.payload.tours;
                state.activeTours = action.payload.activeTours;
            })
            .addCase(changeTour.fulfilled, (state, action) => {  
                console.log(action.payload)
                console.log(action.payload)
                console.log(state.selectedTour)
                if (state.selectedTour) {
                    // Обновляем только те поля, которые существуют и отличаются от текущих
                    const updatedTour = { ...state.selectedTour };

                    Object.keys(action.payload).forEach((key) => {
                        if (updatedTour[key] !== action.payload[key]) {
                            updatedTour[key] = action.payload[key];
                        }
                    });

                    state.selectedTour = updatedTour;
                }
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

export const {  setSelectedTour } = tourSlice.actions;

export default tourSlice.reducer;