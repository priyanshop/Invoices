import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getScreenDimensions} from '../../Helper/ScreenDimension';
const screenDimensions = getScreenDimensions();
const screenWidth = screenDimensions.width;

function SignUpScreen(): JSX.Element {
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const pages = [{index: 1}, {index: 2}, {index: 3}];
  const handlePrevious = () => {
    carouselRef.current.snapToPrev();
  };

  const handleNext = () => {
    carouselRef.current.snapToNext();
  };

  const renderItem = ({item}) => {
    if (item.index === 1) {
      return (
        <View>
          <Text style={styles.title}>Business Info</Text>
          <Text style={styles.paragraph}>(All fields are optional)</Text>
          <TextInput
            style={[styles.input, styles.businessName]}
            placeholder={'Business Name'}
          />
          <TextInput
            style={[styles.input, styles.emailInput]}
            placeholder={'Email'}
          />
          <TextInput
            style={[styles.input, styles.phoneInput]}
            placeholder={'Phone'}
          />
          <TextInput
            style={[styles.input, styles.addressInput1]}
            placeholder={'Address Line 1'}
          />
          <TextInput
            style={[styles.input, styles.addressInput]}
            placeholder={'Address Line 2'}
          />
          <TextInput
            style={[styles.input, styles.lastAddressInput]}
            placeholder={'Address Line 3'}
          />
        </View>
      );
    } else if (item.index === 2) {
      return (
        <View>
          <Text style={styles.title}>Business Logo</Text>
          <Text style={styles.paragraph}>
            Appears on all invoices. Can be edited ny time
          </Text>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnTxt}>CHOOSE IMAGE</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.title}>All Set!</Text>
          <Text style={styles.paragraph}>
            You're ready to create your first Invoice
          </Text>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnTxt}>CREATE INVOICE</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#FF5733'} />
      <View style={styles.header}>
        <View style={{width: '20%'}}>
          <TouchableOpacity onPress={handlePrevious}>
            <Ionicons name="arrow-back" color={'#fff'} size={20} />
          </TouchableOpacity>
        </View>
        <View style={{width: '60%'}}>
          <Pagination
            dotsLength={3}
            activeDotIndex={activeSlide}
            containerStyle={styles.paginationContainer}
            dotStyle={styles.paginationDot}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </View>
        <View style={{width: '20%'}}>
          <Text onPress={handleNext} style={styles.finishTxt}>
            Finish
          </Text>
        </View>
      </View>
      <Carousel
        ref={carouselRef}
        data={pages}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        onSnapToItem={(index: number) => setActiveSlide(index)}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF5733',
  },
  paragraph: {
    marginVertical: 10,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    color: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  btnTxt: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    color: '#FF5733',
  },
  btn: {
    backgroundColor: '#fff',
    padding: 8,
    alignSelf: 'center',
    paddingHorizontal: 15,
    borderRadius: 5,
  },

  input: {
    backgroundColor: '#fff',
    width: '60%',
    alignSelf: 'center',
    height: 30,
    padding: 4,
  },
  emailInput: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    padding: 4,
  },
  phoneInput: {
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopWidth: 0.3,
    borderTopColor: 'grey',
    marginBottom: 10,
    padding: 4,
  },
  addressInput1: {
    padding: 4,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  addressInput: {
    borderTopWidth: 0.3,
    borderTopColor: 'grey',
    padding: 4,
  },
  lastAddressInput: {
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopWidth: 0.3,
    borderTopColor: 'grey',
    marginBottom: 10,
    padding: 4,
  },
  businessName: {marginBottom: 10, borderRadius: 5},
  paginationContainer: {
    paddingVertical: 8,
  },
  paginationDot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginHorizontal: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
  },
  finishTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 10,
  },
});

export default SignUpScreen;
