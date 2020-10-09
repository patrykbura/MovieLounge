import Communication from 'communication/Communication';
import DomainApi from 'utils/DomainAPI';

export const ADD_USER_RATING = 'user/ADD_USER_RATING';

export const register = (body) => {
	return async () => {
    try {
      await Communication.post(DomainApi.get('user/signup'),body)

      return {
        errors: false
      }
    } catch(error) {
      return {
        errors: true,
        userAlreadyExists: error?.text?.msg === "User Already Exists"
      };
    };
  };  
};

export const login = (body) => {
	return async () => {
    try {
      const response = await Communication.post(DomainApi.get('user/login'),body)
      localStorage.setItem('token', response.token);

      return {
        errors: false
      }
    } catch(error) {
      return {
        errors: true,
      };
    };
  };  
}; 

export const getUserRating = (movieID) => {
	return async (dispatch, getState) => {
    debugger;
    if (getState().userRating.movies.some(item => item.movieId !== Number(movieID))) {
      try {
        const results = await Communication.get(DomainApi.get(`user/vote?movieId=${movieID}`))
  
        dispatch({ 
          type: ADD_USER_RATING,
          movieRate: {...results, movieId: Number(movieID)}
        });
        return {
          errors: false
        }
      } catch(error) {
          console.error('getting user vote error:', error)
        };
        
      return {
        errors: true,
      };
    } 
  };
};  

export const saveUserRating = (body) => {
	return async dispatch => {
    try {
      await Communication.post(DomainApi.get(`user/vote`), body)

      dispatch({ 
        type: ADD_USER_RATING,
        movieRate: {...body}
      });

      return {
        errors: false
      }
    } catch(error) {
        console.error('posting user vote error:', error)
      };

    return {
      errors: true,
    };
  };
};  