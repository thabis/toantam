/* eslint-disable react/no-access-state-in-setstate */

import React, { Component } from 'react';
import {
  Animated, PanResponder, StyleSheet, View,
} from 'react-native';
import PropTypes from 'prop-types';


export default class SwipeView extends Component {
  constructor(props) {
    super(props);
    this.horizontalSwipeGestureBegan = false;
    this.horizontalSwipeGestureEnded = false;
    this.rowItemJustSwiped = false;
    this.onMoving = false;
    this.swipeInitialX = null;
    this.ranPreview = false;
    const { swipingLeft } = this.props;
    this.state = {
      dimensionsSet: false,
      hiddenHeight: 0,
      hiddenWidth: 0,
      swipingLeft
    };
    this.translateX = new Animated.Value(0);
  }

  UNSAFE_componentWillMount() {
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (e, gs) => this.handleOnMoveShouldSetPanResponder(e, gs),
      onPanResponderMove: (e, gs) => this.handlePanResponderMove(e, gs),
      onPanResponderRelease: (e, gs) => this.handlePanResponderEnd(e, gs),
      onPanResponderTerminate: (e, gs) => this.handlePanResponderEnd(e, gs),
      onShouldBlockNativeResponder: () => false,
    });
  }

  getPreviewAnimation = (toValue, delay) => Animated.timing(
    this.translateX,
    { duration: this.props.previewDuration, toValue, delay }
  );

  onContentLayout = (e) => {
    const {
      recalculateHiddenLayout, previewSwipeDemo, previewOpenDelay, previewCloseDelay
    } = this.props;
    this.setState({
      dimensionsSet: !recalculateHiddenLayout,
      hiddenHeight: e.nativeEvent.layout.height,
      hiddenWidth: e.nativeEvent.layout.width,
    });

    if (previewSwipeDemo && !this.ranPreview) {
      const { previewOpenValue } = this.props;
      this.ranPreview = true;

      this.getPreviewAnimation(previewOpenValue, previewOpenDelay)
        .start(() => {
          this.getPreviewAnimation(0, previewCloseDelay).start();
        });
    }
  };

  onTouchMove = () => {
    const { onTouchMove } = this.props;
    if (onTouchMove) {
      onTouchMove();
    }
  }

  handleOnMoveShouldSetPanResponder = (e, gs) => {
    const { dx } = gs;
    const { directionalDistanceChangeThreshold, disableSwipeToLeft } = this.props;
    if (disableSwipeToLeft) {
      return dx > directionalDistanceChangeThreshold;
    }
    return Math.abs(dx) > directionalDistanceChangeThreshold;
  };

  handlePanResponderMove = (e, gestureState) => {
    const { dx } = gestureState;
    const absDx = Math.abs(dx);
    const { _value } = this.translateX;

    if (this.horizontalSwipeGestureEnded) { return; }
    const {
      directionalDistanceChangeThreshold,
      disableSwipeToLeft,
      disableSwipeToRight,
      leftOpenValue,
      swipeToOpenPercent,
      rightOpenValue
    } = this.props;
    if (absDx > directionalDistanceChangeThreshold) {
      if (this.swipeInitialX === null) {
        this.swipeInitialX = _value;
      }
      if (!this.horizontalSwipeGestureBegan) {
        this.horizontalSwipeGestureBegan = true;
        // this.props.swipeGestureBegan && this.props.swipeGestureBegan();
      }

      let newDX = this.swipeInitialX + dx;
      if (disableSwipeToLeft && newDX < 0) { newDX = 0; }
      if (disableSwipeToRight && newDX > 0) { newDX = 0; }

      this.translateX.setValue(newDX);

      let toValue = 0;
      if (_value >= 0) {
        if (this.state.swipingLeft) {
          this.setState({
            ...this.state,
            swipingLeft: false
          }, () => {
            this.onMoving = true;
            this.onTouchMove();
          });
        }
        const leftOpen = leftOpenValue * (swipeToOpenPercent / 100);
        if (_value > leftOpen) {
          toValue = leftOpenValue;
          this.onSwipedRight(toValue);
        }
      } else {
        if (!this.state.swipingLeft) {
          this.setState({
            ...this.state,
            swipingLeft: true
          }, () => {
            this.onMoving = false;
            this.onTouchMove();
          });
        }

        const rightOpen = rightOpenValue * (swipeToOpenPercent / 100);
        if (_value < rightOpen) {
          toValue = rightOpenValue;
          this.onSwipedLeft(toValue);
        }
      }
    }
  };

  handlePanResponderEnd = () => {
    this.onMoving = false;
    if (!this.horizontalSwipeGestureEnded) this.closeRow();
  };

  closeRow = () => {
    if (this.rowItemJustSwiped) {
      this.forceCloseRow();
    } else {
      this.manuallySwipeView(0).then(() => {
        this.setState({
          ...this.state,
          swipingLeft: true
        });
      });
    }
    this.onTouchMove();
  };

  forceCloseRow = () => {
    Animated.timing(
      this.translateX,
      {
        duration: 0,
        toValue: 0,
      }
    ).start();
  };

  onSwipedLeft = (toValue) => {
    const { onSwipedLeft } = this.props;

    this.horizontalSwipeGestureEnded = true;
    this.rowItemJustSwiped = true;

    this.manuallySwipeView(toValue).then(() => {
      if (onSwipedLeft) onSwipedLeft();
      this.closeRow();
    });
  };

  onSwipedRight = (toValue) => {
    const { onSwipedRight } = this.props;

    this.horizontalSwipeGestureEnded = true;
    this.rowItemJustSwiped = true;

    this.manuallySwipeView(toValue).then(() => {
      if (onSwipedRight) onSwipedRight();
      this.closeRow();
    });
  };

  manuallySwipeView = toValue => new Promise((resolve, reject) => {
    Animated.timing(
      this.translateX,
      {
        duration: this.props.swipeDuration,
        toValue,
      }
    ).start(() => {
      this.swipeInitialX = null;
      this.horizontalSwipeGestureBegan = false;
      this.horizontalSwipeGestureEnded = false;
      this.onMoving = false;
      resolve();
    });
  });

  renderVisibleContent = () => (
    this.props.renderVisibleContent()
  );

  renderRowContent = () => {
    if (this.state.dimensionsSet) {
      return (
        <Animated.View
          {...this.panResponder.panHandlers}
          style={{
            transform: [
              { translateX: this.translateX }
            ]
          }}
        >
          {this.renderVisibleContent()}
        </Animated.View>
      );
    }
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        onLayout={e => this.onContentLayout(e)}
        style={{
          transform: [
            { translateX: this.translateX }
          ]
        }}
      >
        {this.renderVisibleContent()}
      </Animated.View>
    );
  };

  render() {
    const { hiddenHeight, hiddenWidth, swipingLeft } = this.state;
    const { renderRightView, renderLeftView } = this.props;
    return (
      <View>
        <View style={[
          styles.hidden,
          {
            height: hiddenHeight,
            width: hiddenWidth,
          }
        ]}
        >
          {swipingLeft
            ? ((renderRightView && renderRightView()) || null)
            : ((renderLeftView && renderLeftView()) || null)}
        </View>
        {this.renderRowContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hidden: {
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

SwipeView.propTypes = {
  /**
  * TranslateX: How much view opens from the left
  * when swiping left-to-right (positive number)
  */
  leftOpenValue: PropTypes.number,
  /**
  * TranslateX: How much view opens from the right
  * when swiping right-to-left (negative number)
  */
  rightOpenValue: PropTypes.number,
  /**
  * Duration of the slide out swipe animation
  */
  swipeDuration: PropTypes.number,
  /**
  * What % of the left/right openValue does the user need to swipe
  * past to trigger onSwipedLeft/onSwipedRight actions.
  */
  swipeToOpenPercent: PropTypes.number,
  /**
  * Disable ability to swipe view to left
  */
  disableSwipeToLeft: PropTypes.bool,
  /**
  * Disable ability to swipe view to right
  */
  disableSwipeToRight: PropTypes.bool,
  /**
  * Called when left swipe is compelted
  */
  onSwipedLeft: PropTypes.func,
  /**
  * Called when right swipe is compelted
  */
  onSwipedRight: PropTypes.func,
  /**
  * Should the view do a slide out preview to show that it is swipeable
  */
  previewSwipeDemo: PropTypes.bool,
  /**
  * Duration of the slide out preview animation
  */
  previewDuration: PropTypes.number,
  /**
  * TranslateX value for the slide out preview animation
  */
  previewOpenValue: PropTypes.number,
  /**
  * Delay before starting preview animation
  */
  previewOpenDelay: PropTypes.number,
  /**
  * Delay before closing preview animation
  */
  previewCloseDelay: PropTypes.number,
  /**
  * Should swiping initialize with right-to-left
  * This should be useful for swipe previews
  * ex: +ve previewOpenValue swipingLeft: false | -ve previewOpenValue swipingLeft: true
  */
  swipingLeft: PropTypes.bool,
  /**
  * Enable hidden row onLayout calculations to run always
  */
  recalculateHiddenLayout: PropTypes.bool,
  /**
  * Change the sensitivity of the row
  */
  directionalDistanceChangeThreshold: PropTypes.number,
  /**
  * Main Content view.
  */
  renderVisibleContent: PropTypes.func.isRequired,
  /**
  * Left view to render behind the right view.
  */
  renderLeftView: PropTypes.func,
  /**
  * Right view to render behind the item view.
  */
  renderRightView: PropTypes.func,
};

SwipeView.defaultProps = {
  leftOpenValue: 0,
  rightOpenValue: 0,
  swipeDuration: 250,
  swipeToOpenPercent: 35,
  disableSwipeToLeft: false,
  disableSwipeToRight: false,
  previewSwipeDemo: false,
  previewDuration: 300,
  previewOpenValue: -60,
  previewOpenDelay: 350,
  previewCloseDelay: 300,
  swipingLeft: true,
  recalculateHiddenLayout: false,
  directionalDistanceChangeThreshold: 2,
};
