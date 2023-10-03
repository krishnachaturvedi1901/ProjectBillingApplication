import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllClientsByAdminId } from "../../../api/client_requests";
import { ClientType } from "../../../types/types";

export const getAllClientsByAdminIdAction = createAsyncThunk(
  "allclients/getAllClientsByAdminIdStatus",
  async (adminId: number, thunkApi) => {
    try {
      const res = await getAllClientsByAdminId(adminId);
      console.log("res after allClients", res);
      return res;
    } catch (error) {
      return thunkApi.rejectWithValue(
        `Error in gettingClientsByAdminId ${error}`
      );
    }
  }
);

interface AllClientsStateType {
  loading: "idle" | "pending" | "succeeded" | "failed";
  data: ClientType[];
  error: string | null;
}
const initialState: AllClientsStateType = {
  loading: "idle",
  data: [],
  error: null,
};

const allClientsSlice = createSlice({
  name: "allClientsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllClientsByAdminIdAction.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(getAllClientsByAdminIdAction.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(getAllClientsByAdminIdAction.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
  },
});

export default allClientsSlice.reducer;
