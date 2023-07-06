import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import SignInScreen from '../Screens/Auth/SignInScreen';
import SignUpScreen from '../Screens/Auth/SignUpScreen';
import LandingScreen from '../Screens/LandingScreen';
import InvoicesScreen from '../Screens/Dashboard/Invoices';
import EstimatesScreen from '../Screens/Dashboard/Estimates';
import ItemsScreen from '../Screens/Dashboard/Items';
import ClientScreen from '../Screens/Dashboard/Clients';
import ReportScreen from '../Screens/Dashboard/Reports';
import SettingScreen from '../Screens/Settings';
import { Colors } from '../Helper/Colors';

const headerStyle = {
  headerStyle: {
    backgroundColor: Colors.appColor,
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontSize: 18,
    fontWeight: "600",
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
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Estimates"
        component={EstimatesScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Clients"
        component={ClientScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Items"
        component={ItemsScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Reports"
        component={ReportScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

function MainNavigator() {
  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
}
export default MainNavigator;
