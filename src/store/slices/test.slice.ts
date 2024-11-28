import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MyEntityDto } from "../../models/test.model";

import { helloWorldApi } from "../api/hello-world.api";

type TestState = {
    test: string;
    myEntity?: MyEntityDto;
};

const testInitialState: TestState = {
    test: "test",
    myEntity: undefined
};

const testSlice = createSlice({
    name: "test",
    initialState: testInitialState,
    reducers: {
        changeTest: (state, action: PayloadAction<string>) => {
            state.test = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(helloWorldApi.endpoints.getHello.matchFulfilled, (_state, action) => {
                console.log("getHello fulfilled", action.payload);
            })
            .addMatcher(helloWorldApi.endpoints.getHello.matchRejected, () => {
                console.log("getHello pending");
            })
            .addMatcher(helloWorldApi.endpoints.getHello.matchRejected, (_state, action) => {
                console.log("getHello rejected", action.error);
            })
            .addMatcher(helloWorldApi.endpoints.registerEntity.matchFulfilled, (state, action) => {
                state.myEntity = action.payload;
            })

    },
    selectors: {
        selectTest: (state) => state.test,
        selectMyEntity: (state) => state.myEntity
    }
});

export const { changeTest } = testSlice.actions;
export const { selectTest } = testSlice.selectors;

export default testSlice;