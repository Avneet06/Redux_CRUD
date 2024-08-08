import { configureStore } from "@reduxjs/toolkit";
import UserDetail from "../features/UserDetail.slice";


export const store=configureStore({
reducer:{
    app:UserDetail
}
})