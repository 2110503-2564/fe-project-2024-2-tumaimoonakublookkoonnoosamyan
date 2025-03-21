import { configureStore , combineReducers } from "@reduxjs/toolkit";
import  bookSlice  from "./features/bookSlice";
import {  TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer , FLUSH ,REHYDRATE , PERSIST , PURGE , REGISTER , PAUSE } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { WebStorage } from "redux-persist/lib/types";

export function createPersistStroage():WebStorage{
    const isServer = typeof window === 'undefined';

    if(isServer){
        return {
            getItem(){
                return Promise.resolve(null);
            },
            setItem(){
                return Promise.resolve();
            },
            removeItem(){
                return Promise.resolve();
            },
        };
    }
    return createWebStorage('local');
}

const storage = createPersistStroage()

const persistConfig = {
    key: "rootPersist",
    storage
}

const rootReducer = combineReducers({bookSlice})
const reduxPersistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer:reduxPersistedReducer,
    middleware:(getDafaultMiddleWare)=>getDafaultMiddleWare({
        serializableCheck:{
            ignoredActions:[FLUSH ,REHYDRATE , PERSIST , PURGE , REGISTER , PAUSE],
        },
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector