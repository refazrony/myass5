import { actions } from "../actions";

const initialState = {
  user: null,
  token: null,
  blogs: [],
  loading: false,
  error: null,
};

const profileReducer = (state, action) => {
  switch (action.type) {
    case actions.profile.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }

    case actions.profile.DATA_FETCHED: {
      return {
        ...state,
        loading: false,
        blogs: action.data,
      };
    }

    case actions.profile.DATA_FETCHED_BLOG: {
      return {
        ...state,
        loading: false,
        blogs: [...state.blogs, action.data],
      };
    }

    case actions.profile.DATA_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    case actions.profile.USER_DATA_EDITED: {
      return {
        ...state,
        loading: false,
        user: action.data.user,
        token: action.data.token,
      };
    }

    case actions.profile.USER_TOKEN_UPDATE: {
      return {
        ...state,
        loading: false,
        token: action.data,
      };
    }

    case actions.profile.USER_DATA_UPDATE_BIO: {
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          bio: action.data,
        },
      };
    }

    case actions.profile.IMAGE_UPDATED: {
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          avatar: action.data.avatar,
        },
      };
    }

    case actions.profile.RESET: {
      return {
        ...state,
        loading: false,
        user: null,
      };
    }

    default: {
      return state;
    }
  }
};

export { initialState, profileReducer };
