import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import SignInScreen from '../Screens/Auth/SignInScreen';
import SignUpScreen from '../Screens/Auth/SignUpScreen';
import LandingScreen from '../Screens/LandingScreen';
import InvoicesScreen from '../Screens/Dashboard/Invoices';
import EstimatesScreen from '../Screens/Dashboard/Estimates';
import ItemsScreen from '../Screens/Dashboard/Items';
import ClientScreen from '../Screens/Dashboard/Clients';
import ReportScreen from '../Screens/Dashboard/Reports';
import SettingScreen from '../Screens/Settings';
import {Colors} from '../Helper/Colors';
import InvoiceCreationScreen from '../Screens/InvoiceCreation';
import InvoiceNumber from '../Screens/InvoiceNumber';
import BusinessDetails from '../Screens/BusinessDetails';

const headerStyle = {
  headerStyle: {
    backgroundColor: Colors.appColor,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerBackTitleVisible: false,
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Dashboard() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Invoices"
        component={InvoicesScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, tintColor}: any) => (
            <Icon
              name="ios-home"
              color={focused ? Colors.appColor : tintColor}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Estimates"
        component={EstimatesScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, tintColor}: any) => (
            <Icon
              name="ios-home"
              color={focused ? Colors.appColor : tintColor}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Clients"
        component={ClientScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, tintColor}: any) => (
            <Icon
              name="ios-home"
              color={focused ? Colors.appColor : tintColor}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Items"
        component={ItemsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, tintColor}: any) => (
            <Icon
              name="ios-home"
              color={focused ? Colors.appColor : tintColor}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, tintColor}: any) => (
            <Icon
              name="ios-home"
              color={focused ? Colors.appColor : tintColor}
              size={25}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName='BusinessDetails'>
      <Stack.Screen
        name="LandingPage"
        component={LandingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Settings"
        component={SettingScreen}
        options={headerStyle}
      />
      <Stack.Screen
        name="InvoiceCreation"
        component={InvoiceCreationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InvoiceNumber"
        component={InvoiceNumber}
        options={{headerTitle:"Invoice Number",...headerStyle}}
      />
      <Stack.Screen
        name="BusinessDetails"
        component={BusinessDetails}
        options={{headerTitle:"Business Details",...headerStyle}}
      />
    </Stack.Navigator>
  );
}
export default MainNavigator;
