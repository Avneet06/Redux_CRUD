import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

//create User
export const createUser = createAsyncThunk(
    "createUser",
    async (data, { rejectWithValue }) => {
      console.log("data", data);
      const response = await fetch(
        "https://66b2fd1f7fba54a5b7eb044e.mockapi.io/CRUD",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
  
      try {
        const result = await response.json();
        return result;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

  //Read 
  export const showUser = createAsyncThunk(
    "showUser",
    async (args, { rejectWithValue }) => {
      const response = await fetch(
        "https://66b2fd1f7fba54a5b7eb044e.mockapi.io/CRUD"
      );
  
      try {
        const result = await response.json();
        console.log(result);
        return result;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
//delete action
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `https://66b2fd1f7fba54a5b7eb044e.mockapi.io/CRUD/${id}`,
      { method: "DELETE" }
    );

    try {
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//update action
export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    console.log("updated data", data);
    const response = await fetch(
      `https://66b2fd1f7fba54a5b7eb044e.mockapi.io/CRUD/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const userDetail=createSlice({

    name:"userDetail",
    initialState:{

        user:[],
        loading:false,
        error:null,
        searchData: [],


    },
    reducers:{
        
      searchUser: (state, action) => {
        console.log(action.payload);
        state.searchData = action.payload;

    }},
    extraReducers:(builder)=>{
builder.addCase(createUser.pending,(state)=>{
    state.loading=true
})
.addCase(createUser.fulfilled,(state,action)=>{
    state.loading=false,
    state.user.push(action.payload)
})
.addCase(createUser.rejected,(state,action)=>{

    state.loading = false;
    state.error = action.payload;

})
.addCase(showUser.pending,(state)=>{
    state.loading=true;
})
.addCase(showUser.fulfilled,(state,action)=>{
    state.loading=false,
    state.user=action.payload
})
.addCase(showUser.rejected,(state,action)=>{
    state.loading=true,
    state.error=action.payload
})
.addCase(deleteUser.pending,(state)=>{
  state.loading = true;
})
.addCase(deleteUser.fulfilled,(state,action)=>{
  state.loading = false;
  const { id } = action.payload;
  if (id) {
    state.user = state.user.filter((ele) => ele.id !== id);
  }
})
.addCase(deleteUser.rejected,(state,action)=>{
  state.loading = false;
  state.error = action.payload;
})
.addCase(updateUser.pending,(state)=>{
  state.loading = true;
})
.addCase(updateUser.fulfilled,(state,action)=>{
  state.loading = false;
  state.user = state.user.map((ele) =>
    ele.id === action.payload.id ? action.payload : ele
  );
})
.addCase(updateUser.rejected,(state,action)=>{
  state.loading = false;
  state.error = action.payload.message;

})
    }
    

})

export default userDetail.reducer;
export const { searchUser } = userDetail.actions;