import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "modal",
    initialState: {
        isOpen: false,
        headerText: '',
        modalContent: null,
        resultContent: null,
    },
    reducers: {
        openModal(state) {
            state.isOpen = true;
        },
        closeModal(state) {
            state.isOpen = false;
            state.resultContent = null;
        },
        setHeaderText(state, action){
            state.headerText = action.payload;
        },
        setModalContent(state, action) { // Действие для установки контента
            state.modalContent = action.payload;
        },
        setResultContent(state, action) { // Действие для установки контента
            state.resultContent = action.payload;
        },
    },
});

export const { openModal, closeModal, setHeaderText, setModalContent, setResultContent } = modalSlice.actions;

export default modalSlice.reducer;