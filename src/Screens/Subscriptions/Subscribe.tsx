import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {Colors} from '../../Helper/Colors';
import {Images} from '../../assets';
import {RadioButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';

const SubscriptionScreen = () => {
  const subscribeHandler = () => {
    // Add logic to handle subscription
    console.log('Subscribe button pressed');
  };
  const featuresArray: any = [
    {
      image: Images.bill,
      title: 'Professional Invoices',
      description:
        'Easily bill customers with professional-looking invoices and estimates',
    },
    {
      image: Images.notificationBell,
      title: 'Reports and Notifications',
      description:
        'Keep track of who has paid and who hasn’t with simple reporting and notifications',
    },
    {
      image: Images.computer,
      title: 'On-the-go Access',
      description:
        'Send invoices and estimates on the fly with always-on-the-go mobile access',
    },
    {
      image: Images.fountainPen,
      title: 'Formatting and Design',
      description:
        'Have full control of invoices with customized formatting and design',
    },
  ];

  const description = [
    'Up to 10 invoices per month',
    'Add photos',
    'Business owner signature',
    'Summary reports',
    'Due date reminders',
  ];

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={{backgroundColor: Colors.landingColor, height: 60}} />
        <View style={{backgroundColor: '#fff'}}>
          <View
            style={{
              width: '80%',
              alignSelf: 'center',
              backgroundColor: '#fff',
              marginTop: -40,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 15,
              borderRadius: 12,
              shadowColor: '#171717',
              shadowOffset: {width: -2, height: 4},
              shadowOpacity: 0.2,
              shadowRadius: 3,
            }}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Image source={Images.appLogo} style={[styles.image]} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 5,
              }}>
              <Text
                style={{
                  color: Colors.appColor,
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                {'Upgrade Now'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 5,
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 16,
                  fontWeight: '500',
                }}>{`to unlock the invoice tool with exactly what you need, nothing you don't`}</Text>
            </View>
          </View>

          {featuresArray.map((item: any) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                paddingHorizontal: 12,
                marginVertical: 15,
                flex: 0.1,
              }}>
              <Image source={item.image} style={[styles.image2]} />
              <View style={{paddingHorizontal: 10, flex: 0.9}}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 17,
                    fontWeight: '500',
                  }}>
                  {item.title}
                </Text>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 15,
                    fontWeight: '400',
                  }}>
                  {item.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{backgroundColor: '#fff', marginTop: 5, padding: 15}}>
          <View
            style={{
              borderRadius: 10,
              borderWidth: 1,
              padding: 10,
              borderColor: '#ccc',
            }}>
            <Text style={styles.planTitle}>Basic Plan</Text>
            <Text style={styles.planDescription}>Access to basic features</Text>
            <View style={styles.planContainer}>
              <View>
                <RadioButton.Android
                  value="first"
                  status={'checked'}
                  onPress={() => {}}
                  color="red"
                />
              </View>

              <View style={{marginLeft: 15}}>
                <Text style={styles.planTitle2}>Basic Plan</Text>
                <Text style={styles.planPrice2}>$9.99/month</Text>
              </View>
            </View>
            <View style={styles.planContainer}>
              <View>
                <RadioButton.Android
                  value="first"
                  status={'checked'}
                  onPress={() => {}}
                  color="red"
                />
              </View>

              <View style={{marginLeft: 15}}>
                <Text style={styles.planTitle2}>Basic Plan</Text>
                <Text style={styles.planPrice2}>$9.99/year</Text>
              </View>
            </View>

            <View style={{marginTop: 10}}>
              {description.map(item => {
                return (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name={'checkmark-sharp'} size={25} color="#000" />
                    <Text style={styles.featureTxt}>{'  ' + item}</Text>
                  </View>
                );
              })}
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Fontisto name={'plus-a'} size={22} color={Colors.appColor} />
                <Text style={styles.featureTxt2}>{'   See Features'}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.landingColor,
            padding: 15,
            borderRadius: 5,
            width: '90%',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Subscribe
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  planContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    width: '80%',
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  planTitle2: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  planPrice2: {
    fontSize: 14,
    marginTop: 5,
  },
  planPrice: {
    fontSize: 16,
    marginTop: 5,
  },
  planDescription: {
    fontSize: 14,
    marginTop: 5,
    color: '#666',
  },
  subscribeButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  image2: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  featureTxt: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  featureTxt2: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.appColor,
  },
});

export default SubscriptionScreen;
