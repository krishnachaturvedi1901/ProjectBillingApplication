import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ClientType } from "../../../types/types";
import { deleteClientByClientId } from "../../../api/client_requests";

export const deleteClientAction = createAsyncThunk(
  "deleteClient/deleteClientByIdStatus",
  async (clientId: string, thunkApi) => {
    try {
      const res = await deleteClientByClientId(clientId);
      return res;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

interface deleteClientStateType {
  loading: "idle" | "pending" | "succeeded" | "failed";
  data: ClientType;
  error: string | null;
}

const initialState: deleteClientStateType = {
  loading: "idle",
  data: {} as ClientType,
  error: null,
};

const deleteClientSlice = createSlice({
  name: "deleteClient",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteClientAction.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(deleteClientAction.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(deleteClientAction.rejected, (state, action) => {
        state.loading = "failed";
        state.data = {} as ClientType;
        state.error = action.payload as string;
      });
  },
});

export default deleteClientSlice.reducer;
