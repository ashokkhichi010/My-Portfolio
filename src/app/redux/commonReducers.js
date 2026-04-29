export const mergeState = (state, action) => {
  Object.assign(state, action.payload);
};
