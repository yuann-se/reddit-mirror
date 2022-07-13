import { ActionCreator, AnyAction, Reducer } from "redux";

export type TInitialState = {
  commentText: string;
}

const initialState: TInitialState = {
  commentText: 'lalla',
}

export const rootReducer: Reducer<TInitialState> = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_COMMENT': return {
      ...state, commentText: action.text,
    }
    default: return state;
  }
}

export const updateComment: ActionCreator<AnyAction> = (text) =>
  ({ type: 'UPDATE_COMMENT', text })
