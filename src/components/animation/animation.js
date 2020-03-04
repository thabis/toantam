import React, { PureComponent } from 'react';
import {
  TouchableOpacity,
  Animated
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as PropTypes from 'prop-types';
import styles from './styles';


class AnimationItem extends PureComponent {
  constructor(props) {
    super(props);
    this.animated = new Animated.Value(0);
    this.refTouch = null;
  }

  componentDidMount() {
    const { index, duration } = this.props;
    if (index < 10) {
      Animated.timing(this.animated, {
        toValue: 1,
        duration,
        delay: index * 250,
        useNativeDriver: true
      }).start();
    } else {
      this.animated.setValue(1);
    }
  }

  animateSettings = () => {
    const { isHorizontal = false } = this.props;
    let transform = {
      translateY: this.animated.interpolate({
        inputRange: [0, 1],
        outputRange: [500, 1],
      })
    };
    if (isHorizontal) {
      transform = {
        translateX: this.animated.interpolate({
          inputRange: [0, 1],
          outputRange: [500, 1],
        })
      };
    }
    return transform;
  }

  render() {
    const {
      onAction,
      backgroundGradient = [],
      children, animateStyle,
      actionStyle,
      gradientStyle,
      opacity = 0.2
    } = this.props;
    const animateSetting = this.animateSettings();
    const rowStyles = [
      { opacity: this.animated },
      {
        transform: [
          animateSetting
        ],
      },
    ];

    return (
      <Animated.View style={[animateStyle, rowStyles]}>
        <TouchableOpacity
          activeOpacity={opacity}
          style={[styles.container, actionStyle]}
          onPress={onAction}
        >
          {backgroundGradient.length > 0
            ? (
              <LinearGradient
                colors={backgroundGradient}
                style={[styles.containerItem, gradientStyle]}
              >
                {children}
              </LinearGradient>
            )
            : children
          }
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

export default AnimationItem;
AnimationItem.propsType = {
  onAction: PropTypes.func,
  backgroundGradient: PropTypes.array,
  index: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  isVertical: PropTypes.bool
};
