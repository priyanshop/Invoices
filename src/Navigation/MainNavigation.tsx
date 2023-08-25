//@ts-nocheck
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
import {useTranslation} from 'react-i18next';
import ContactUs from '../Screens/ContactUS';
import Clients from '../Screens/Dashboard/Clients/Clients';
import SelectItemScreen from '../Screens/Dashboard/Items/SelectItem';
import Sign from '../Screens/Signature/Sign';
import SplashScreen2 from '../Screens/SplashScreen/SplashScreen2';

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

function Dashboard() {
  const {t, i18n} = useTranslation();

  const bottomTab = [
    {
      name: t('bottomNav.Invoices'),
      screen: InvoicesScreen,
      icon: 'ios-receipt-outline',
      iconType: Icon,
    },
    {
      name: t('bottomNav.Estimates'),
      screen: EstimatesScreen,
      icon: 'ios-calculator-sharp',
      iconType: Icon,
    },
    {
      name: t('bottomNav.Clients'),
      screen: ClientScreen,
      icon: 'people-sharp',
      iconType: Icon,
    },
    {
      name: t('bottomNav.Items'),
      screen: ItemsScreen,
      icon: 'barcode',
      iconType: AntDesign,
    },
    {
      name: t('bottomNav.Reports'),
      screen: ReportScreen,
      icon: 'barschart',
      iconType: AntDesign,
    },
  ];

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

function MainNavigator() {
  const {t, i18n} = useTranslation();
  const forFade = ({current}) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });
  const screenConfigurations = [
    {
      name: 'SplashScreen',
      component: SplashScreen2,
      options: {headerShown: false, cardStyleInterpolator: forFade},
    },
    {
      name: 'SplashScreenLoading',
      component: SplashScreenLoading,
      options: {headerShown: false, cardStyleInterpolator: forFade},
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
      options: {headerTitle: t('Menu'), ...headerStyle},
    },
    {
      name: 'InvoiceCreation',
      component: InvoiceCreationScreen,
      options: {
        headerTitle: t('navigationTitle.InvoiceCreation'),
        ...headerStyle,
      },
    },
    {
      name: 'InvoiceNumber',
      component: InvoiceNumber,
      options: {
        headerTitle: t('navigationTitle.InvoiceNumber'),
        ...headerStyle,
      },
    },
    {
      name: 'BusinessDetails',
      component: BusinessDetails,
      options: {
        headerTitle: t('navigationTitle.BusinessDetails'),
        ...headerStyle,
      },
    },
    {
      name: 'AddClientScreen',
      component: AddClientScreen,
      options: {
        headerTitle: t('navigationTitle.AddClientScreen'),
        ...headerStyle,
      },
    },
    {
      name: 'ClientScreen',
      component: Clients,
      options: {headerShown: false},
    },
    {
      name: 'SelectItemScreen',
      component: SelectItemScreen,
      options: {headerShown: false},
    },
    {
      name: 'AddItemScreen',
      component: AddItemScreen,
      options: {
        headerTitle: t('navigationTitle.AddItemScreen'),
        ...headerStyle,
      },
    },
    {
      name: 'AddGlobalItemScreen',
      component: AddGlobalItemScreen,
      options: {
        headerTitle: t('navigationTitle.AddGlobalItemScreen'),
        ...headerStyle,
      },
    },
    {
      name: 'AddPhotoScreen',
      component: AddPhotoScreen,
      options: {
        headerTitle: t('navigationTitle.AddPhotoScreen'),
        ...headerStyle,
      },
    },
    {
      name: 'PaymentInfo',
      component: PaymentInfo,
      options: {headerTitle: t('navigationTitle.PaymentInfo'), ...headerStyle},
    },
    {
      name: 'AdditionalDetails',
      component: AdditionalDetails,
      options: {
        headerTitle: t('navigationTitle.AdditionalDetails'),
        ...headerStyle,
      },
    },
    {
      name: 'ManualExpense',
      component: ManualExpense,
      options: {
        headerTitle: t('navigationTitle.ManualExpense'),
        ...headerStyle,
      },
    },
    {
      name: 'DefaultNotes',
      component: DefaultNotes,
      options: {headerTitle: t('navigationTitle.DefaultNotes'), ...headerStyle},
    },
    {
      name: 'GlobalInvoiceNumber',
      component: GlobalInvoiceNumber,
      options: {
        headerTitle: t('navigationTitle.GlobalInvoiceNumber'),
        ...headerStyle,
      },
    },
    {
      name: 'DefaultEmailMessage',
      component: DefaultEmailMessage,
      options: {
        headerTitle: t('navigationTitle.DefaultEmailMessage'),
        ...headerStyle,
      },
    },
    {
      name: 'TaxScreen',
      component: TaxScreen,
      options: {headerTitle: t('navigationTitle.TaxScreen'), ...headerStyle},
    },
    {
      name: 'SignaturePad',
      component: Sign,
      // options: {headerTitle: t('navigationTitle.SignaturePad'), ...headerStyle},
      options: {headerShown: false},
    },
    {
      name: 'PaymentScreen',
      component: PaymentScreen,
      options: {
        headerTitle: t('navigationTitle.PaymentScreen'),
        ...headerStyle,
      },
    },
    {
      name: 'RegionScreen',
      component: RegionScreen,
      options: {headerTitle: t('navigationTitle.RegionScreen'), ...headerStyle},
    },
    {
      name: 'Customize',
      component: Customize,
      options: {headerTitle: t('navigationTitle.Customize'), ...headerStyle},
    },
    {
      name: 'EstimationCreation',
      component: EstimationCreationScreen,
      options: {
        headerTitle: t('navigationTitle.EstimationCreation'),
        ...headerStyle,
      },
    },
    {
      name: 'EstimationNumber',
      component: EstimationNumber,
      options: {
        headerTitle: t('navigationTitle.EstimationNumber'),
        ...headerStyle,
      },
    },
    {
      name: 'DiscountScreen',
      component: DiscountScreen,
      options: {
        headerTitle: t('navigationTitle.DiscountScreen'),
        ...headerStyle,
      },
    },
    {
      name: 'ContactUs',
      component: ContactUs,
      options: {
        headerTitle: t('navigationTitle.ContactUs'),
        ...headerStyle,
      },
    },
  ];

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
