const initialState = {
  listNotification: [],
  badgeUnread: 0,
};

const NotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_ALL_STATE': {
      return initialState;
    }
    case 'SET_LIST_NOTIFICATION': {
      const { listNotification } = action;
      const badge = listNotification.filter(value => value.read === false);
      return {
        ...state,
        listNotification,
        badgeUnread: badge.length
      };
    }
    case 'READ_NOTIFICATION_SUCCESS': {
      const { id } = action;
      const { listNotification, badgeUnread } = state;
      let newBadge = badgeUnread;
      const newListNotification = listNotification.map((noti) => {
        if (noti.id === id) {
          newBadge -= 1;
          return {
            ...noti,
            read: !noti.read,
          };
        }
        return noti;
      });
      return {
        listNotification: newListNotification,
        badgeUnread: newBadge
      };
    }
    default: {
      return state;
    }
  }
};

export default NotificationReducer;
