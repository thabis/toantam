
import React, { PureComponent } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import HeaderComponent from '@components/header/header';
import Container from '@components/container';
import { View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ListOrderDesigning from '@containers/orderContainer/orderListDesigningContainer';
import ListOrderFeedbackDesigning from '@containers/orderContainer/orderListFeedbackDesigningContainer';
import { Navigation } from 'react-native-navigation';
import styles from './styles';

class DesignList extends PureComponent {
  constructor(props) {
    super(props);
    this.gradientColor = ['#1286ac', '#239bc2', '#6fe1e2', '#9feaeb'];
    Navigation.events().bindComponent(this);
  }

  componentDidAppear() {
    const { getList } = this.props;
    getList({ status: 2 });
  }

  render() {
    return (
      <Container>
        <LinearGradient
          colors={this.gradientColor}
          style={{ flex: 1 }}
        >
          <HeaderComponent
            title=""
            containerHeader={[styles.containerMultiHeader]}
          />
          <ScrollableTabView
            initialPage={0}
            scrollWithoutAnimation={false}
            tabBarUnderlineStyle={{ backgroundColor: '#FFFFFF' }}
            tabBarInactiveTextColor="rgba(255, 255, 255, 0.6)"
            tabBarActiveTextColor="#FFFFFF"
            tabBarBackgroundColor="transparent"
          >
            <View
              tabLabel="ĐH ĐANG XỬ LÝ"
              style={[styles.containerHeaderTitle]}
            >
              <ListOrderDesigning orderStatus={2} />
            </View>
            <View
              tabLabel="ĐH ĐÃ XÁC NHẬN"
              style={[styles.containerHeaderTitle]}
            >
              <ListOrderFeedbackDesigning orderStatus={4} />
            </View>
          </ScrollableTabView>
        </LinearGradient>
      </Container>
    );
  }
}

export default DesignList;
