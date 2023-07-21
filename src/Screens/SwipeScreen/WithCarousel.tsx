// React Native Swipeable Card View UI like Tinder
// https://aboutreact.com/react-native-swipeable-cardview-like-tinder/

// import React in our code
import React, {useRef, useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  PanResponder,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../../Helper/Colors';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {getScreenDimensions} from '../../Helper/ScreenDimension';
const screenDimensions = getScreenDimensions();
const screenWidth = screenDimensions.width;
const SCREEN_WIDTH = Dimensions.get('window').width;

const dogImage =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_5ElLfEoTtQIyOm38WiEMesfB6mUaP8Dl6g&usqp=CAU';

const SwipeableCard = ({item, removeCard, swipedDirection}: any) => {
  // let xPosition = new Animated.Value(0);
  const [xPosition, setXPosition] = useState(new Animated.Value(0));
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef(null);

  let swipeDirection = '';
  let cardOpacity = new Animated.Value(1);
  let rotateCard = xPosition.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-20deg', '0deg', '20deg'],
  });

  let panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => false,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      xPosition.setValue(gestureState.dx);
      if (gestureState.dx > SCREEN_WIDTH - 250) {
        swipeDirection = 'Right';
      } else if (gestureState.dx < -SCREEN_WIDTH + 250) {
        swipeDirection = 'Left';
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (
        gestureState.dx < SCREEN_WIDTH - 150 &&
        gestureState.dx > -SCREEN_WIDTH + 150
      ) {
        swipedDirection('--');
        Animated.spring(xPosition, {
          toValue: 0,
          speed: 5,
          bounciness: 10,
          useNativeDriver: false,
        }).start();
      } else if (gestureState.dx > SCREEN_WIDTH - 150) {
        Animated.parallel([
          Animated.timing(xPosition, {
            toValue: SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(cardOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start(() => {
          swipedDirection(swipeDirection);
          removeCard();
        });
      } else if (gestureState.dx < -SCREEN_WIDTH + 150) {
        Animated.parallel([
          Animated.timing(xPosition, {
            toValue: -SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(cardOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start(() => {
          swipedDirection(swipeDirection);
          removeCard();
        });
      }
    },
  });

  const handlePrevious = () => {
    carouselRef.current.snapToPrev();
  };

  const handleNext = () => {
    carouselRef.current.snapToNext();
  };

  const renderItem = () => {
    return (
      <ImageBackground
        source={{uri: dogImage}}
        style={styles.imageView}
        imageStyle={styles.imageView}>
        <TouchableOpacity
          onPress={handlePrevious}
          style={styles.touchOpacityView}
        />
        <TouchableOpacity
          onPress={handleNext}
          style={styles.touchOpacityView}
        />
      </ImageBackground>
    );
  };

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.cardStyle,
        {
          backgroundColor: item.backgroundColor,
          opacity: cardOpacity,
          transform: [{translateX: xPosition}, {rotate: rotateCard}],
        },
      ]}>
      {/* <Image source={{uri: item.image}} style={styles.imageView} /> */}
      <Pagination
        dotsLength={4}
        activeDotIndex={activeSlide}
        containerStyle={[styles.paginationContainer]}
        dotStyle={[styles.paginationDot, {width: (SCREEN_WIDTH * 0.75) / 4}]}
        inactiveDotOpacity={0.5}
        inactiveDotScale={1}
      />
      <Carousel
        ref={carouselRef}
        data={[0, 0, 0, 0]}
        renderItem={renderItem}
        sliderWidth={screenWidth * 0.9}
        itemWidth={screenWidth * 0.9}
        onSnapToItem={(index: number) => setActiveSlide(index)}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
      />
    </Animated.View>
  );
};

const SwipeAppWithCarousel = () => {
  const [noMoreCard, setNoMoreCard] = useState(false);
  const [sampleCardArray, setSampleCardArray] = useState(DEMO_CONTENT);
  const [swipeDirection, setSwipeDirection] = useState('--');

  const removeCard = (id: any) => {
    // alert(id);
    sampleCardArray.splice(
      sampleCardArray.findIndex(item => item.id == id),
      1,
    );
    setSampleCardArray(sampleCardArray);
    if (sampleCardArray.length == 0) {
      setNoMoreCard(true);
    }
  };

  const lastSwipedDirection = (swipeDirection: any) => {
    setSwipeDirection(swipeDirection);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.landingColor}}>
      <Text style={styles.swipeText}>
        Last Card Swipe Direction was{'\n'}
        {swipeDirection}
      </Text>
      <View style={styles.container}>
        {sampleCardArray.map((item, key) => (
          <SwipeableCard
            key={key}
            item={item}
            removeCard={() => removeCard(item.id)}
            swipedDirection={lastSwipedDirection}
          />
        ))}
        {noMoreCard ? (
          <Text style={{fontSize: 22, color: '#000'}}>No Cards Found.</Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default SwipeAppWithCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  cardStyle: {
    width: '90%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 10,
  },
  cardTitleStyle: {
    color: '#fff',
    fontSize: 24,
  },
  swipeText: {
    fontSize: 18,
    textAlign: 'center',
  },
  imageView: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
    flexDirection: 'row',
  },
  touchOpacityView: {flex: 1, width: '50%', backgroundColor: 'transparent'},
  paginationContainer: {
    paddingVertical: 8,
    alignSelf:'center',
    width:SCREEN_WIDTH*0.9,
  },
  paginationDot: {
    height: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
  },
});

const DEMO_CONTENT = [
  {
    id: '1',
    cardTitle: 'Card 1',
    backgroundColor: '#FFC107',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKM5aRJXKvCeAdsVaihLBAYhKP5ACdDXqAjQ&usqp=CAU',
  },
  {
    id: '2',
    cardTitle: 'Card 2',
    backgroundColor: '#ED2525',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_5ElLfEoTtQIyOm38WiEMesfB6mUaP8Dl6g&usqp=CAU',
  },
  {
    id: '3',
    cardTitle: 'Card 3',
    backgroundColor: '#E7088E',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_5ElLfEoTtQIyOm38WiEMesfB6mUaP8Dl6g&usqp=CAU',
  },
  {
    id: '4',
    cardTitle: 'Card 4',
    backgroundColor: '#00BCD4',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_5ElLfEoTtQIyOm38WiEMesfB6mUaP8Dl6g&usqp=CAU',
  },
  {
    id: '5',
    cardTitle: 'Card 5',
    backgroundColor: '#FFFB14',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_5ElLfEoTtQIyOm38WiEMesfB6mUaP8Dl6g&usqp=CAU',
  },
].reverse();
