import { actions } from "../actions";
const initialBlog = {
  allBlogs: [],
  loading: false,
  error: null,
  isFirstFetch: true,
  isLastPage: false,
};

function blogReducer(state, action) {
  switch (action.type) {
    case actions.blog.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }

    case actions.blog.DATA_FETCHED: {
      return {
        ...state,
        loading: false,
        isFirstFetch: false,
        allBlogs: [...action.data],
      };
    }

    case actions.blog.DATA_LOAD_MORE: {
      return {
        ...state,
        loading: false,
        allBlogs: [...state.allBlogs, ...action.data],
      };
    }

    case actions.blog.UPDATE_BLOG: {
      const updatedArray = state.allBlogs.map((item) => {
        if (item.id === action.data.id) {
          return { ...action.data };
        }
        return item;
      });

      return {
        ...state,
        loading: false,
        allBlogs: updatedArray,
      };
    }

    case actions.blog.BLOG_DELETE: {
      const newAllBlogs = state.allBlogs.filter(
        (item) => item.id !== action.data
      );
      return {
        ...state,
        loading: false,
        allBlogs: [...newAllBlogs],
      };
    }

    case actions.blog.DATA_RESET: {
      return {
        allBlogs: [],
        loading: false,
        error: null,
        isFirstFetch: true,
        isLastPage: false,
      };
    }

    case actions.blog.IS_LAST_PAGE: {
      return {
        ...state,
        isLastPage: true,
      };
    }

    default: {
      return state;
    }
  }
}

export { initialBlog, blogReducer };
