    import { createSlice } from "@reduxjs/toolkit";

    const settingSlice = createSlice({
        name: "setting",
        initialState: {
            isBurgerOpen: false,
        },
        reducers: {
            setBurgerOpen(state, action) {
                state.isBurgerOpen = action.payload;
            },
        },
    });

    export const { setBurgerOpen } = settingSlice.actions;

    export default settingSlice.reducer;