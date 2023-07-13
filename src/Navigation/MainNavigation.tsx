import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

import SignInScreen from '../Screens/Auth/SignInScreen';
import SignUpScreen from '../Screens/Auth/SignUpScreen';
import LandingScreen from '../Screens/LandingScreen';
import InvoicesScreen from '../Screens/Dashboard/Invoices';
import EstimatesScreen from '../Screens/Dashboard/Estimates';
import ItemsScreen from '../Screens/Dashboard/Items';
import ClientScreen from '../Screens/Dashboard/Clients';
import ReportScreen from '../Screens/Dashboard/Reports';
import SettingScreen from '../Screens/Settings';
import InvoiceCreationScreen from '../Screens/InvoiceCreation';
import InvoiceNumber from '../Screens/InvoiceNumber';
import BusinessDetails from '../Screens/BusinessDetails';
import AddClientScreen from '../Screens/AddClients';
import AddItemScreen from '../Screens/AddItems';
import AddPhotoScreen from '../Screens/InvoiceCreation/PhotoScreen';
import PaymentInfo from '../Screens/Payments/PaymentInfo';
import AdditionalDetails from '../Screens/InvoiceCreation/AdditionalDetails';
import AddGlobalItemScreen from '../Screens/AddItems/AddGlobalItems';
import ManualExpense from '../Screens/Settings/ManualExpense';
import DefaultNotes from '../Screens/Settings/DefaultNotes';
import GlobalInvoiceNumber from '../Screens/Settings/GlobalInvoiceNumber';
import DefaultEmailMessage from '../Screens/Settings/DefualtEmailMessage';
import TaxScreen from '../Screens/Settings/TaxScreen';
import SignaturePadScreen from '../Screens/Signature';
import {Colors} from '../Helper/Colors';

const headerStyle = {
  headerStyle: {
    backgroundColor: Colors.appColor,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'center',
  },
  headerBackTitleVisible: false,
  headerShadowVisible: false,
  headerTitleAlign: 'center',
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
              name="ios-receipt-outline"
              color={focused ? Colors.appColor : tintColor}
              size={25}
            />
          ),
          tabBarActiveTintColor: Colors.appColor,
          tabBarLabelStyle: {fontSize: 13, fontWeight: '500'},
        }}
      />
      <Tab.Screen
        name="Estimates"
        component={EstimatesScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, tintColor}: any) => (
            <Icon
              name="ios-calculator-sharp"
              color={focused ? Colors.appColor : tintColor}
              size={25}
            />
          ),
          tabBarActiveTintColor: Colors.appColor,
          tabBarLabelStyle: {fontSize: 13, fontWeight: '500'},
        }}
      />
      <Tab.Screen
        name="Clients"
        component={ClientScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, tintColor}: any) => (
            <Icon
              name="people-sharp"
              color={focused ? Colors.appColor : tintColor}
              size={25}
            />
          ),
          tabBarActiveTintColor: Colors.appColor,
          tabBarLabelStyle: {fontSize: 13, fontWeight: '500'},
        }}
      />
      <Tab.Screen
        name="Items"
        component={ItemsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, tintColor}: any) => (
            <AntDesign
              name="barcode"
              color={focused ? Colors.appColor : tintColor}
              size={25}
            />
          ),
          tabBarActiveTintColor: Colors.appColor,
          tabBarLabelStyle: {fontSize: 13, fontWeight: '500'},
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, tintColor}: any) => (
            <AntDesign
              name="barschart"
              color={focused ? Colors.appColor : tintColor}
              size={25}
            />
          ),
          tabBarActiveTintColor: Colors.appColor,
          tabBarLabelStyle: {fontSize: 13, fontWeight: '500'},
        }}
      />
    </Tab.Navigator>
  );
}

function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName="SignaturePad">
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
        options={{headerTitle: 'Invoice', ...headerStyle}}
      />
      <Stack.Screen
        name="InvoiceNumber"
        component={InvoiceNumber}
        options={{headerTitle: 'Invoice Number', ...headerStyle}}
      />
      <Stack.Screen
        name="BusinessDetails"
        component={BusinessDetails}
        options={{headerTitle: 'Business Details', ...headerStyle}}
      />
      <Stack.Screen
        name="AddClientScreen"
        component={AddClientScreen}
        options={{headerTitle: 'Client', ...headerStyle}}
      />
      <Stack.Screen
        name="AddItemScreen"
        component={AddItemScreen}
        options={{headerTitle: 'Item', ...headerStyle}}
      />
      <Stack.Screen
        name="AddGlobalItemScreen"
        component={AddGlobalItemScreen}
        options={{headerTitle: 'Item', ...headerStyle}}
      />
      <Stack.Screen
        name="AddPhotoScreen"
        component={AddPhotoScreen}
        options={{headerTitle: 'Photo', ...headerStyle}}
      />
      <Stack.Screen
        name="PaymentInfo"
        component={PaymentInfo}
        options={{headerTitle: 'Payment Info', ...headerStyle}}
      />
      <Stack.Screen
        name="AdditionalDetails"
        component={AdditionalDetails}
        options={{headerTitle: 'Additional Details', ...headerStyle}}
      />
      <Stack.Screen
        name="ManualExpense"
        component={ManualExpense}
        options={{headerTitle: 'Expense', ...headerStyle}}
      />
      <Stack.Screen
        name="DefaultNotes"
        component={DefaultNotes}
        options={{headerTitle: 'Default Notes', ...headerStyle}}
      />
      <Stack.Screen
        name="GlobalInvoiceNumber"
        component={GlobalInvoiceNumber}
        options={{headerTitle: 'Invoice Number', ...headerStyle}}
      />
      <Stack.Screen
        name="DefaultEmailMessage"
        component={DefaultEmailMessage}
        options={{headerTitle: 'Default Email Message', ...headerStyle}}
      />
      <Stack.Screen
        name="TaxScreen"
        component={TaxScreen}
        options={{headerTitle: 'Tax', ...headerStyle}}
      />
      <Stack.Screen
        name="SignaturePad"
        component={SignaturePadScreen}
        options={{headerTitle: 'Signature', ...headerStyle}}
        // options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
export default MainNavigator;
