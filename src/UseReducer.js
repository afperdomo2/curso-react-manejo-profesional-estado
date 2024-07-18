const initialState = {
  value: "",
  error: false,
  loading: false,
  confirmed: false,
  deleted: false,
};

const reducerObject = (state) => ({
  error: { ...state, error: true, loading: false },
  check: { ...state, loading: true },
  confirm: { ...state, error: false, loading: false, confirmed: true },
  delete: { ...state, deleted: true },
  reset: { ...initialState, value: "" },
});

const reducer = (state, action) => {
  return reducerObject(state)[action.type]
    ? reducerObject(state)[action.type]
    : state;
};

export { reducer };
