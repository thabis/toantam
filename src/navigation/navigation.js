/* eslint-disable no-plusplus */
import HomeContainer from '@containers/homeContainer/homeContainer';
import SignUpContainer from '@containers/signUpContainer/signUpContainer';
import OrderListContainer from '@containers/orderContainer/orderListContainer';
import SplashContainer from '@containers/splashContainer/splashContainer';
import CreateCustomerContainer from '@containers/customerContainer/createCustomerContainer';
import ListCustomerContainer from '@containers/customerContainer/listCustomerContainer';
import OrderContainer from '@containers/orderContainer/orderContainer';
import OrderListCancelContainer from '@containers/orderContainer/orderListScreenCancelContainer';
import CreateCompanyContainer from '@containers/companyContainer/createCompanyContainer';
import CompanyContainer from '@containers/companyContainer/companyContainer';
import NotificationContainer from '@containers/notificationContainer/notificationContainer';
import Settings from '@containers/settingsContainer/settingsContainer';
import DesignListContainer from '@containers/designContainer/designListContainer';
import SaleListContainer from '@containers/designContainer/saleListContainer';
import OrderDetailContainer from '@containers/designContainer/orderDetailContainer';
import OrderDetailScreenContainer from '@src/containers/orderContainer/orderDetailScreenContainer';
import OrderProcessingDetailContainer from '@containers/orderContainer/orderProcessingDetailContainer';
import OrderListConfirmContainer from '@containers/orderContainer/orderListConfirmContainer';
import SearchOrderContainer from '@containers/searchContainer/searchOrderContainer';
import DesignedListContainer from '@containers/printerContainer/designedListContainer';
import PrintingListContainer from '@containers/printerContainer/printingListContainer';
// Screen for Storer
import ListPrintedContainer from '@containers/storeContainer/listPrintedContainer';
import ListStoredContainer from '@containers/storeContainer/listStoredContainer';
// Screen for Deliver
import ListDeliverContainer from '@containers/deliverContainer/deliverContainer';
import LoadingBox from '@components/modal';
import LoadModal from '@components/modal/loadModal';
import NotifcationTop from '@containers/notificationContainer/notificationInAppContainer';
import { screenKeys } from '@constants/screenKeys';
import { Navigation } from 'react-native-navigation';
import NetInfo from "@react-native-community/netinfo";
import LeftMenuContainer from '@containers/menuContainer/menuContainer';
import TABHOME from '@assets/icon/user-list.png';
import TABTWO from '@assets/icon/order.png';
import TABTHREE from '@assets/icon/order-cancel.png';
import TABSETTINGS from '@assets/icon/settings.png';
import TABNOTIFICATION from '@assets/icon/notification.png';
import codePush from 'react-native-code-push';
import registerComponentWithRedux from './registerComponentWithRedux';


// Tab role default for sale
let listKeyTab = [];

/**
 * Check Current Bottom Tab
 */
let currentBottomTab = listKeyTab[0];
Navigation.events().registerBottomTabSelectedListener(({ selectedTabIndex }) => {
  currentBottomTab = listKeyTab[selectedTabIndex];
});
export function checkCurrentTab() {
  return currentBottomTab;
}
export function setCurrentTab(index) {
  currentBottomTab = listKeyTab[index];
}

/**
 * Check Current Screen Name
 */
let screen = '';
Navigation.events().registerComponentDidAppearListener(({ componentId }) => {
  screen = componentId;
  const tabBottom = listKeyTab.find(tab => tab === screen);
  if (tabBottom) {
    currentBottomTab = tabBottom;
  }
});
export function checkCurrentScreen() {
  return screen;
}
/**
 * Add list Screen to Provider
 * @param {*} tabRoot
 * @param {*} anotherProps
 */
const convertArr = (tabRoot, anotherProps) => {
  const arr = [];
  for (let i = 0; i < tabRoot.length; i++) {
    arr.push(
      {
        stack: {
          children: [
            {
              component: {
                id: tabRoot[i].name,
                name: tabRoot[i].name,
              },
            },
          ],
          options: {
            bottomTab: tabRoot[i].options.bottomTab,
            badge: 'new',
            ...anotherProps
          }
        }
      }
    );
  }
  return arr;
};

/**
 * Set Tab Navigation for App
 * @param {*} tabRoot
 * @param {*} anotherProps
 */
export const startRoot = (visibleTopbar) => {
  Navigation.events().registerAppLaunchedListener(() => {
    let defaultOption = {
      topBar: {
        visible: false,
        height: 0, // TopBar height in dp
      },
      statusBar: {
        visible: true,
      },
      // IMPORTANT: IF YOU WANT TO USE ANIMATION
      sideMenu: {
        openGestureMode: 'bezel',
      }
    };
    if (visibleTopbar) {
      defaultOption = visibleTopbar;
    }
    Navigation.setDefaultOptions(defaultOption);
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        start();
      } else {
        splashScreen();
      }
    });
  });
}

function start() {
  splashScreen();
  // checkCodePushUpdate().then((syncStatus) => {
  //   console.log('Start: codePush.sync completed with status: ', syncStatus);
  //   splashScreen();
  // }).catch((err) => {
  //   console.log(err);
  // });
}

/**
 * Check Code Push update
 */
export function checkCodePushUpdate() {
  return codePush.sync({
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
    installMode: codePush.InstallMode.IMMEDIATE,
    updateDialog: true,
    // deploymentKey: CODEPUSH_KEY,
  });
}

export function signUpRootScreen() {
  Navigation.setRoot({
    root: {
      stack: {
        options: {
          topBar: {
            visible: false
          }
        },
        children: [
          {
            component: {
              name: screenKeys.SignUp,
            }
          },
        ]
      }
    }
  });
}

export function splashScreen() {
  Navigation.setRoot({
    root: {
      stack: {
        options: {
          topBar: {
            visible: false
          },
        },
        children: [
          {
            component: {
              name: screenKeys.Splash,
            }
          },
        ]
      }
    }
  });
}
export function homeRootScreen(role, anotherProps) {
  // Role Saler Default
  let tabRootDefault = [{
    name: screenKeys.Home,
    options: {
      bottomTab: {
        fontSize: 10,
        text: 'Theo Dõi KH',
        icon: TABHOME,
        selectedIconColor: '#56b9d5',
      },
    }
  },
  {
    name: screenKeys.OrderList,
    options: {
      bottomTab: {
        fontSize: 10,
        text: 'ĐƠN HÀNG',
        icon: TABTWO,
        selectedIconColor: '#f06363',
      },
    }
  },
  {
    name: screenKeys.OrderCancel,
    options: {
      bottomTab: {
        fontSize: 10,
        text: 'DS HUỶ',
        icon: TABTHREE,
        selectedIconColor: '#D7263D',
      },
    }
  },
  {
    name: screenKeys.Settings,
    options: {
      bottomTab: {
        fontSize: 10,
        text: 'CÀI ĐẶT',
        icon: TABSETTINGS,
        selectedIconColor: '#D7263D',
      },
    }
  }
  ];
  if (role === 'designer') {
    tabRootDefault = [{
      name: screenKeys.SaleList,
      options: {
        bottomTab: {
          fontSize: 10,
          text: 'DS ĐƠN HÀNG',
          icon: TABHOME,
          selectedIconColor: '#D7263D',
        },
      }
    },
    {
      name: screenKeys.DesignerList,
      options: {
        bottomTab: {
          fontSize: 10,
          text: 'DS XỬ LÝ',
          icon: TABTWO,
          selectedIconColor: '#D7263D',
        },
      }
    },
    {
      name: screenKeys.Notification,
      options: {
        bottomTab: {
          fontSize: 10,
          text: 'THÔNG BÁO',
          icon: TABNOTIFICATION,
          selectedIconColor: '#D7263D',
        },
      }
    },
    {
      name: screenKeys.Settings,
      options: {
        bottomTab: {
          fontSize: 10,
          text: 'CÀI ĐẶT',
          icon: TABSETTINGS,
          selectedIconColor: '#D7263D',
        },
      }
    }];
  } else if (role === 'printer') {
    tabRootDefault = [{
      name: screenKeys.DesignedList,
      options: {
        bottomTab: {
          fontSize: 10,
          text: 'DS ĐƠN HÀNG',
          icon: TABHOME,
          selectedIconColor: '#D7263D',
        },
      }
    },
    {
      name: screenKeys.PrintingList,
      options: {
        bottomTab: {
          fontSize: 10,
          text: 'DS XỬ LÝ',
          icon: TABTWO,
          selectedIconColor: '#D7263D',
        },
      }
    },
    {
      name: screenKeys.Settings,
      options: {
        bottomTab: {
          fontSize: 10,
          text: 'CÀI ĐẶT',
          icon: TABSETTINGS,
          selectedIconColor: '#D7263D',
        },
      }
    }];
  } else if (role === 'store') {
    tabRootDefault = [{
      name: screenKeys.ListPrinted,
      options: {
        bottomTab: {
          fontSize: 10,
          text: 'DS ĐÃ IN',
          icon: TABHOME,
          selectedIconColor: '#D7263D',
        },
      }
    },
    {
      name: screenKeys.ListStored,
      options: {
        bottomTab: {
          fontSize: 10,
          text: 'DS LƯU KHO',
          icon: TABTWO,
          selectedIconColor: '#D7263D',
        },
      }
    },
    {
      name: screenKeys.Settings,
      options: {
        bottomTab: {
          fontSize: 10,
          text: 'CÀI ĐẶT',
          icon: TABSETTINGS,
          selectedIconColor: '#D7263D',
        },
      }
    }];
  } else if (role === 'deliver') {
    tabRootDefault = [{
      name: screenKeys.ListStored,
      options: {
        bottomTab: {
          fontSize: 10,
          text: 'DS LƯU KHO',
          icon: TABHOME,
          selectedIconColor: '#D7263D',
        },
      }
    },
    {
      name: screenKeys.ListDeliver,
      options: {
        bottomTab: {
          fontSize: 10,
          text: 'DS VẬN CHUYỂN',
          icon: TABTWO,
          selectedIconColor: '#D7263D',
        },
      }
    },
    {
      name: screenKeys.Settings,
      options: {
        bottomTab: {
          fontSize: 10,
          text: 'CÀI ĐẶT',
          icon: TABSETTINGS,
          selectedIconColor: '#D7263D',
        },
      }
    }];
  }
  listKeyTab = getListTab(role);
  const optionsBottomTabs = {};
  Navigation.setRoot({
    root: {
      sideMenu: {
        center: {
          bottomTabs: {
            children: convertArr(tabRootDefault, anotherProps),
            ...optionsBottomTabs
          },
        },
      }
    }
  });
}

/**
 * Check Exist Bottom Tab
 * @param {string} screenTab
 */
export function checkExistBottomTab(screenTab) {
  if (listKeyTab.includes(screenTab)) {
    return true;
  }
  return false;
}

/**
 * Get BottomTab by role
 * @param {string} role
 */

function getListTab(role) {
  let listTab = [];
  if (role === 'saler') {
    listTab = [
      screenKeys.Home,
      screenKeys.OrderList,
      screenKeys.OrderCancel,
      screenKeys.Settings
    ];
  } else if (role === 'designer') {
    listTab = [
      screenKeys.SaleList,
      screenKeys.DesignerList,
      screenKeys.Notification,
      screenKeys.Settings
    ];
  } else if (role === 'printer') {
    listTab = [
      screenKeys.DesignedList,
      screenKeys.PrintingList,
      screenKeys.Settings
    ];
  } else if (role === 'store') {
    listTab = [
      screenKeys.ListPrinted,
      screenKeys.ListStored,
      screenKeys.Settings
    ];
  } else if (role === 'deliver') {
    listTab = [
      screenKeys.ListStored,
      screenKeys.ListDeliver,
      screenKeys.Settings
    ];
  }
  return listTab;
}

/**
 * Push Screen
 */
export function navigateScreen(screenName, props = {}) {
  const options = {
    bottomTabs: {
      visible: true,
      drawBehind: true,
      animate: true
    }
  };
  if (Object.prototype.hasOwnProperty.call(props, 'bottomTabs')) {
    if (!props.bottomTabs) {
      options.bottomTabs = {
        visible: false,
        drawBehind: true,
        animate: true
      };
    }
  }
  let passProps = {};
  if (Object.prototype.hasOwnProperty.call(props, 'passProps')) {
    // eslint-disable-next-line prefer-destructuring
    passProps = props.passProps;
  }
  if (currentBottomTab) {
    Navigation.push(currentBottomTab, {
      component: {
        id: screenName,
        name: screenName,
        options,
        passProps
      }
    });
  }
}


/**
 * Show/hide bottom tab
 *
 * @param {screenName} string
 * @param {isShow} boolean
 */
export function toggleBottomTabs(componentId, isShow) {
  const passProps = {};
  if (!isShow) {
    passProps.bottomTabs = {
      visible: false,
      drawBehind: true,
      animate: true
    };
  } else {
    passProps.bottomTabs = {
      visible: true,
      drawBehind: true,
      animate: true
    };
  }
  Navigation.mergeOptions(componentId, passProps);
}

/**
 * Pop Screen
 */
export function pop(component) {
  Navigation.pop(component);
}

/**
 * Pop To Screen
 */
export function popTo(screenName) {
  Navigation.popToRoot(screenName);
}

/**
 * Change Bottom Tab
 * @param {string} screenName
 * @param {int} index
 */
export function changeBottomTab(screenName, index) {
  Navigation.mergeOptions(screenName, {
    bottomTabs: {
      currentTabIndex: index,
    }
  });
}
/**
 * Show modal Screen
 */
export function showModal(screenName, options, passProps) {
  let optionsDefault = {
    layout: { componentBackgroundColor: 'rgba(22,188,192,0.5)' },
    modalPresentationStyle: 'overFullScreen',
  };
  if (options) {
    optionsDefault = options;
  }
  Navigation.showModal({
    stack: {
      children: [{
        component: {
          id: screenName,
          name: screenName,
          passProps: passProps || null,
          options: {
            // animations: {
            //   showModal: {
            //     enabled: false
            //   },
            //   dismissModal: {
            //     enabled: false
            //   },
            // },
            ...optionsDefault
          }
        },

      }]
    }
  });
}

/**
 * Hide modal Screen
 */
export function hideModal(screenName) {
  Navigation.dismissModal(screenName, {
    animations: {
      dismissModal: {
        enabled: false
      }
    }
  });
}

/**
 * Hide all modal
 */
export function hideAllModal() {
  Navigation.dismissAllModals({
    animations: {
      dismissModal: {
        enabled: false
      }
    }
  });
}

/**
 * Show Overlay
 * @param {string} screenName
 */

export function showOverlay(screenName) {
  Navigation.showOverlay({
    component: {
      id: screenName,
      name: screenName,
      passProps: {},
      options: {
        overlay: {
          interceptTouchOutside: false,
        },
        layout: {
          componentBackgroundColor: 'transparent',
          backgroundColor: 'transparent',
          // orientation: ['portrait'],
        },
      },
    },
  });
}

/**
 * Hide Overlay
 * @param {string} screenName
 */
export function hideOverlay(screenName) {
  Navigation.dismissOverlay(screenName);
}
/**
 * Show menu
 * @param {componentId} screenName
 */
export function showMenu(componentId) {
  Navigation.mergeOptions(componentId, {
    sideMenu: {
      left: {
        visible: true,
        enabled: true,
        shouldStretchDrawer: true,
      },
      // animationType: 'parallax'
    },
  });
}

/**
 * Calculate badge
 *
 * @param {string} badge
 */
export function showBadge(screenName, badge) {
  // Navigation.mergeOptions(screenName, {
  //   bottomTab: {
  //     badge: '10',
  //     badgeColor: 'red',
  //   }
  // });
}
/**
 * Register Screen Redux to RNNavigation
 *
 * @param {redux} redux
 */
export function registerScreens(redux) {
  registerComponentWithRedux(redux)(screenKeys.Home, HomeContainer);
  registerComponentWithRedux(redux)(screenKeys.SignUp, SignUpContainer);
  registerComponentWithRedux(redux)(screenKeys.Splash, SplashContainer);
  registerComponentWithRedux(redux)(screenKeys.LeftMenu, LeftMenuContainer);
  registerComponentWithRedux(redux)(screenKeys.OrderList, OrderListContainer);
  registerComponentWithRedux(redux)(screenKeys.OrderCancel, OrderListCancelContainer);
  registerComponentWithRedux(redux)(screenKeys.CreateCustomer, CreateCustomerContainer);
  registerComponentWithRedux(redux)(screenKeys.CreateOrder, OrderContainer);
  registerComponentWithRedux(redux)(screenKeys.showModal, LoadingBox);
  registerComponentWithRedux(redux)(screenKeys.Company, CompanyContainer);
  registerComponentWithRedux(redux)(screenKeys.CreateCompany, CreateCompanyContainer);
  registerComponentWithRedux(redux)(screenKeys.ListCustomer, ListCustomerContainer);
  registerComponentWithRedux(redux)(screenKeys.Settings, Settings);
  registerComponentWithRedux(redux)(screenKeys.Notification, NotificationContainer);
  registerComponentWithRedux(redux)(screenKeys.DesignerList, DesignListContainer);
  registerComponentWithRedux(redux)(screenKeys.SaleList, SaleListContainer);
  registerComponentWithRedux(redux)(screenKeys.OrderDetail, OrderDetailContainer);
  registerComponentWithRedux(redux)(screenKeys.NotificationTop, NotifcationTop);
  registerComponentWithRedux(redux)(screenKeys.LoadModal, LoadModal);
  registerComponentWithRedux(redux)(screenKeys.OrderProcessingDetail, OrderProcessingDetailContainer);
  registerComponentWithRedux(redux)(screenKeys.OrderListConfirm, OrderListConfirmContainer);
  registerComponentWithRedux(redux)(screenKeys.SearchOrder, SearchOrderContainer);
  registerComponentWithRedux(redux)(screenKeys.ListPrinted, ListPrintedContainer);
  registerComponentWithRedux(redux)(screenKeys.ListStored, ListStoredContainer);
  registerComponentWithRedux(redux)(screenKeys.OrderDetailScreen, OrderDetailScreenContainer);
  registerComponentWithRedux(redux)(screenKeys.DesignedList, DesignedListContainer);
  registerComponentWithRedux(redux)(screenKeys.PrintingList, PrintingListContainer);
  registerComponentWithRedux(redux)(screenKeys.ListDeliver, ListDeliverContainer);
}
