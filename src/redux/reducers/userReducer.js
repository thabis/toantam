import {
  LOGIN_SUCCESS, LOGIN_FAILED, SET_FCM_TOKEN,
  UPDATE_USER
} from '@constants/action-names';
import { checkRoleUser } from '@utils/roles';

const initialState = {
  email: '',
  username: '',
  first_name: '',
  last_name: '',
  id: '',
  token: '',
  device_token: '',
  roles: [],
  role: '', // curently just only role for each user
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_ALL_STATE': {
      return initialState;
    }
    case LOGIN_SUCCESS: {
      const { token, user } = action.payload;
      const {
        email = '',
        id = '',
        first_name = '',
        last_name = '',
        username = '',
        roles = [],
      } = user;
      const roleName = checkRoleUser(roles);
      return {
        ...state,
        token,
        email,
        username,
        id,
        first_name,
        last_name,
        roles,
        role: roleName
      };
    }
    case UPDATE_USER: {
      const { user } = action.payload;
      const {
        email = '',
        id = '',
        first_name = '',
        last_name = '',
        username = '',
      } = user;
      return {
        ...state,
        email,
        username,
        id,
        first_name,
        last_name,
      };
    }
    case LOGIN_FAILED: {
      return initialState;
    }
    case SET_FCM_TOKEN: {
      return {
        ...state,
        device_token: action.device_token
      };
    }
    default: {
      console.log('$$$$$$$$$$$', state);
      return state;
    }
  }
};

export default userReducer;
