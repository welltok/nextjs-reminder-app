import userReducer, {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
} from "./userSlice";

describe("userSlice", () => {
  it("should handle initial state", () => {
    const initialState = userReducer(undefined, { type: "@@INIT" });
    expect(initialState).toEqual({
      name: "",
      loading: false,
      error: null,
    });
  });

  it("should set loading on fetchUserStart", () => {
    const state = userReducer(undefined, fetchUserStart());
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it("should set user on fetchUserSuccess", () => {
    const state = userReducer(undefined, fetchUserSuccess({ name: "Alice" }));
    expect(state.loading).toBe(false);
    expect(state.name).toBe("Alice");
  });

  it("should set error on fetchUserFailure", () => {
    const state = userReducer(undefined, fetchUserFailure("Something went wrong"));
    expect(state.loading).toBe(false);
    expect(state.error).toBe("Something went wrong");
  });
});
