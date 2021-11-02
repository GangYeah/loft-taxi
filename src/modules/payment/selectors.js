export const selectCardDetails = state => state.card.details;
export const selectIsCardDetailsIsFill = state => Object.keys(state.card.details).length !== 0 &&
Object.values(state.card.details).filter(item => item === "" || item === undefined).length === 0;
