import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../Helper/Colors';
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
import SignaturePadScreen from '../Screens/Signature/SignaturePadScreen';
import PaymentScreen from '../Screens/Payments/PaymentScreen';
import RegionScreen from '../Screens/Regions';
import SplashScreenLoading from '../Screens/SplashScreen/SplashScreen';
import Customize from '../Screens/Settings/Customizes';
import EstimationCreationScreen from '../Screens/AddEstimate';
import EstimationNumber from '../Screens/InvoiceNumber/EstimateNumber';
import DiscountScreen from '../Screens/Settings/DiscountScreen';

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

const tabBarOptions = {
  tabBarActiveTintColor: Colors.appColor,
  tabBarLabelStyle: {fontSize: 13, fontWeight: '500'},
  headerShown: false,
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const bottomTab = [
  {
    name: 'Invoices',
    screen: InvoicesScreen,
    icon: 'ios-receipt-outline',
    iconType: Icon,
  },
  {
    name: 'Estimates',
    screen: EstimatesScreen,
    icon: 'ios-calculator-sharp',
    iconType: Icon,
  },
  {
    name: 'Clients',
    screen: ClientScreen,
    icon: 'people-sharp',
    iconType: Icon,
  },
  {
    name: 'Items',
    screen: ItemsScreen,
    icon: 'barcode',
    iconType: AntDesign,
  },
  {
    name: 'Reports',
    screen: ReportScreen,
    icon: 'barschart',
    iconType: AntDesign,
  },
];

function Dashboard() {
  return (
    <Tab.Navigator>
      {bottomTab.map(Screen => (
        <Tab.Screen
          name={Screen.name}
          component={Screen.screen}
          options={{
            tabBarIcon: ({focused, tintColor}: any) => (
              <Screen.iconType
                name={Screen.icon}
                color={focused ? Colors.appColor : '#000'}
                size={25}
              />
            ),
            ...tabBarOptions,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

const screenConfigurations = [
  {
    name: 'SplashScreen',
    component: SplashScreenLoading,
    options: {headerShown: false},
  },
  {
    name: 'LandingPage',
    component: LandingScreen,
    options: {headerShown: false},
  },
  {name: 'SignIn', component: SignInScreen, options: {headerShown: false}},
  {name: 'SignUp', component: SignUpScreen, options: {headerShown: false}},
  {name: 'Dashboard', component: Dashboard, options: {headerShown: false}},
  {
    name: 'Settings',
    component: SettingScreen,
    options: {headerTitle: 'Menu', ...headerStyle},
  },
  {
    name: 'InvoiceCreation',
    component: InvoiceCreationScreen,
    options: {headerTitle: 'Invoice', ...headerStyle},
  },
  {
    name: 'InvoiceNumber',
    component: InvoiceNumber,
    options: {headerTitle: 'Invoice Number', ...headerStyle},
  },
  {
    name: 'BusinessDetails',
    component: BusinessDetails,
    options: {headerTitle: 'Business Details', ...headerStyle},
  },
  {
    name: 'AddClientScreen',
    component: AddClientScreen,
    options: {headerTitle: 'Client', ...headerStyle},
  },
  {
    name: 'AddItemScreen',
    component: AddItemScreen,
    options: {headerTitle: 'Item', ...headerStyle},
  },
  {
    name: 'AddGlobalItemScreen',
    component: AddGlobalItemScreen,
    options: {headerTitle: 'Item', ...headerStyle},
  },
  {
    name: 'AddPhotoScreen',
    component: AddPhotoScreen,
    options: {headerTitle: 'Photo', ...headerStyle},
  },
  {
    name: 'PaymentInfo',
    component: PaymentInfo,
    options: {headerTitle: 'Payment Info', ...headerStyle},
  },
  {
    name: 'AdditionalDetails',
    component: AdditionalDetails,
    options: {headerTitle: 'Additional Details', ...headerStyle},
  },
  {
    name: 'ManualExpense',
    component: ManualExpense,
    options: {headerTitle: 'Expense', ...headerStyle},
  },
  {
    name: 'DefaultNotes',
    component: DefaultNotes,
    options: {headerTitle: 'Default Notes', ...headerStyle},
  },
  {
    name: 'GlobalInvoiceNumber',
    component: GlobalInvoiceNumber,
    options: {headerTitle: 'Invoice Number', ...headerStyle},
  },
  {
    name: 'DefaultEmailMessage',
    component: DefaultEmailMessage,
    options: {headerTitle: 'Default Email Message', ...headerStyle},
  },
  {
    name: 'TaxScreen',
    component: TaxScreen,
    options: {headerTitle: 'Tax', ...headerStyle},
  },
  {
    name: 'SignaturePad',
    component: SignaturePadScreen,
    options: {headerTitle: 'Signature', ...headerStyle},
  },
  {
    name: 'PaymentScreen',
    component: PaymentScreen,
    options: {headerTitle: 'Payment', ...headerStyle},
  },
  {
    name: 'RegionScreen',
    component: RegionScreen,
    options: {headerTitle: 'Region', ...headerStyle},
  },
  {
    name: 'Customize',
    component: Customize,
    options: {headerTitle: 'Customize', ...headerStyle},
  },
  {
    name: 'EstimationCreation',
    component: EstimationCreationScreen,
    options: {headerTitle: 'Estimate', ...headerStyle},
  },
  {
    name: 'EstimationNumber',
    component: EstimationNumber,
    options: {headerTitle: 'Invoice Number', ...headerStyle},
  },
  {
    name: 'DiscountScreen',
    component: DiscountScreen,
    options: {headerTitle: 'Discount', ...headerStyle},
  },
];

function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName={screenConfigurations[0].name}>
      {screenConfigurations.map(screen => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Stack.Navigator>
  );
}
export default MainNavigator;