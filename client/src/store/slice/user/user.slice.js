import { createSlice } from '@reduxjs/toolkit'
import { registerUserThunk } from './user.thunk';
import { getOtherUserThunk } from './user.thunk';
import { getUserProfileThunk } from './user.thunk';
import { loginUserThunk } from './user.thunk';
import { logoutUserThunk } from './user.thunk';


const initialState = {
  isAuthenticated: false,
  userProfile: null,
  otherUsers: null,
  selectedUser: JSON.parse(localStorage.getItem("selectedUser")),
  buttonLoading: false,
  screenLoading: true,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {

      localStorage.setItem('selectedUser', JSON.stringify(action.payload))
      state.selectedUser = action.payload;
    }

  },
  extraReducers: (builder) => {
    //Login user
    builder.addCase(loginUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });

    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      // console.error(action.payload)
      state.userProfile = action.payload?.responseData?.user;
      //jo data thunk n return kiya ho ga wo action.payload  me aa jayega
      state.buttonLoading = false;   // ✅ fulfilled hone k baad false karna chahiye
      state.isAuthenticated = true;  // ✅ user login ho gaya
    });

    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });

    //Register user
    builder.addCase(registerUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });

    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      // console.error(action.payload)
      state.userProfile = action.payload?.responseData?.user;
      state.isAuthenticated = true;
      state.buttonLoading = false;

    });

    builder.addCase(registerUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });

    //Logout user 

    builder.addCase(logoutUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });

    builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
      // console.error(action.payload)
      state.userProfile = null;
      state.selectedUser = null;
      state.otherUsers = null;
      state.isAuthenticated = false;
      state.buttonLoading = false;
      localStorage.clear()

    });

    builder.addCase(logoutUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });

    //Get user profile
    builder.addCase(getUserProfileThunk.pending, (state, action) => {
      state.screenLoading = true;
    });

    builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
      // console.error(action.payload)
      state.isAuthenticated = true;
      state.screenLoading = false;
      state.userProfile = action.payload?.responseData;


    });

    builder.addCase(getUserProfileThunk.rejected, (state, action) => {
      state.screenLoading = false;
    });

    //Get user Users
    builder.addCase(getOtherUserThunk.pending, (state, action) => {
      state.screenLoading = true;
    });

    builder.addCase(getOtherUserThunk.fulfilled, (state, action) => {
      // console.error(action.payload)
      state.screenLoading = false;
      //  console.error(action.payload);
      state.otherUsers = action.payload?.responseData;


    });

    builder.addCase(getOtherUserThunk.rejected, (state, action) => {
      state.screenLoading = false;
    });


  }
})

export const { setSelectedUser } = userSlice.actions;

export default userSlice.reducer;


