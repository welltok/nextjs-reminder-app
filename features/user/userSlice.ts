import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  loading: boolean;
  error: string | null;
  users: any
}

const initialState: UserState = {
  name: "",
  loading: false,
  error: null,
  users:[]
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess(state, action: PayloadAction<{ name: string }>) {
      state.loading = false;
      state.name = action.payload.name;
    },
    fetchUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setUsers(state, action: any) {
      state.users = action.payload;
    },
    addUserRequest: () => {
    },
    fetchUserRequest: () => {
    },
    editUserRequest: () => {
    },
    deleteUserRequest: () => {
    }
  },
});

export const addUser = (payload) => ({
  type: addUserRequest.type, payload
})

export const editUser = (payload) => ({
  type: editUserRequest.type, payload
})

export const fetchUser = () => ({
  type: fetchUserRequest.type
})

export const deleteUser = (payload) => ({
  type: deleteUserRequest.type, payload
})

export const { fetchUserStart, fetchUserSuccess, fetchUserFailure, addUserRequest, fetchUserRequest, setUsers, editUserRequest, deleteUserRequest } =
  userSlice.actions;

export default userSlice.reducer;
