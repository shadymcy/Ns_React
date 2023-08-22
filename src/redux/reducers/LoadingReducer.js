export const LoadingReducer = (prevState = { isLoading: false }, action) => {
  // 见util/http.js
  let { type, payload } = action;
  switch (type) {
    case "change_loading":
      // let newstate = {...prevState};
      // newstate.isLoading = !newstate.isLoading;
      // return newstate
      // return Object.assign({},{isLoading:!prevState.isLoading});
      return Object.assign({}, { isLoading: payload });
    default:
      return prevState;
  }
};
