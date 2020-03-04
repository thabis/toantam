import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import AnimationItem from '@components/animation/animation';
import { ActionIcon, IconButton } from '@components/icon/icon';
import * as Progress from 'react-native-progress';
import { Divider } from 'react-native-elements';
import { caculateDateFollow, getDateFromNow } from '@utils/date';
import styles from './styles';


class ItemOrderDraft extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      round: 0,
    };
  }

  componentDidMount() {
    const { index } = this.props;
    const timeOut = index === 0 ? 1 : index + 1;
    const dayCount = this.caculateProgress();
    setTimeout(() => {
      this.setState({
        round: 1 - (dayCount * 0.2)
      });
    }, timeOut * 400);
  }

  componentDidUpdate(nextProps) {
    const { item } = this.props;
    const nextItem = nextProps.item;
    const { index } = nextProps;
    if (item.id !== nextItem.id || item.updated_time !== nextItem.updated_time) {
      const dayCount = this.caculateProgress();
      const timeOut = index === 0 ? 1 : index + 1;
      setTimeout(() => {
        this.setState({
          round: 1 - (dayCount * 0.2)
        });
      }, timeOut * 400);
    }
  }

  caculateProgress = () => {
    const { item } = this.props;
    const {
      created_time,
      updated_time
    } = item;
    const date = updated_time || created_time;
    const dateNotFollow = caculateDateFollow(date);
    let dayCount = dateNotFollow;
    if (dayCount >= 5) {
      dayCount = 5;
    }
    return dayCount;
  }

  getColorGradient = (dateNotFollow) => {
    let backgroundNotFollow = ['#53d2d6', '#56c1d5', '#56b9d5'];
    if (Math.round(dateNotFollow) >= 3) {
      backgroundNotFollow = ['#d53f62', '#d53f50', '#d53f3f'];
    }
    if (Math.round(dateNotFollow) >= 5) {
      backgroundNotFollow = ['#413e3e', '#302a2a', '#1a1413'];
    }
    return backgroundNotFollow;
  }

  getColorNumProgress = (dateNotFollow) => {
    let colorBar = '#83fbf4';
    if (Math.round(dateNotFollow) >= 3) {
      colorBar = '#fc9c9c';
    }
    if (Math.round(dateNotFollow) >= 5) {
      colorBar = '#c0c0c0';
    }
    return colorBar;
  }

  getNumberDaysProgress = (dateNotFollow) => {
    if (dateNotFollow > 5) {
      return '5+';
    }
    return Math.round(dateNotFollow);
  }

  render() {
    const { item, index, navigateDetailOrder } = this.props;
    const {
      customer,
      notes,
      created_time,
      updated_time
    } = item;
    const { round } = this.state;
    const { name, phone } = customer;
    const note_title = notes.length > 0 ? `${notes[notes.length - 1].note}` : '';
    const date = updated_time || created_time;
    const dateNotFollow = caculateDateFollow(date);
    const backgroundNotFollow = this.getColorGradient(dateNotFollow);
    const colorBar = this.getColorNumProgress(dateNotFollow);
    const dateFromNow = getDateFromNow(dateNotFollow, updated_time);
    return (
      <AnimationItem
        isHorizontal
        index={index}
        onAction={() => navigateDetailOrder(item)}
        backgroundGradient={backgroundNotFollow}
        actionStyle={styles.containerDraft}
        gradientStyle={styles.containerItem}
        duration={500}
      >
        <View style={styles.blockRow}>
          <View style={styles.rowContent}>
            <Progress.Circle
              style={{ flex: 0.45 }}
              animated
              size={65}
              showsText
              formatText={() => this.getNumberDaysProgress(dateNotFollow)}
              textStyle={{ fontSize: 30, fontWeight: 'bold' }}
              thickness={4}
              progress={round}
              color={colorBar}
            />
            <View style={{ flex: 1.3 }}>
              <Text style={styles.textRow}>
                <IconButton
                  icon="user"
                  size={16}
                />
                {' '}
                {name}
              </Text>
              <Text style={styles.noteDraft}>
                <IconButton
                  icon="phone"
                  size={16}
                />
                {' '}
                {phone}
              </Text>
              <Text style={styles.noteDraft} numberOfLines={2}>
                <IconButton
                  icon="bubble"
                  size={16}
                />
                {' '}
                {note_title}
              </Text>
            </View>
            <ActionIcon
              action={this.back}
              size={20}
              propsStyles={[styles.editButton, { flex: 0.1, color: 'white' }]}
              icon="arrow-right"
            />
          </View>
          <Divider style={{ marginVertical: 5, backgroundColor: 'white' }} />
          <Text style={{ color: '#fff' }}>
            Trao đổi
            {' '}
            {dateFromNow}
          </Text>
        </View>
      </AnimationItem>
    );
  }
}
export default ItemOrderDraft;
