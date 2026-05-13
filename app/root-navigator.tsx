import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import DashboardScreen from './screens/dashboard';
import WorkOrdersScreen from './screens/work-orders';
import InvoicesScreen from './screens/invoices';
import ScannerScreen from './screens/scanner';
import ProfileScreen from './screens/profile';
import SettingsScreen from './screens/settings';

const Tab = createBottomTabNavigator();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#1a1a1a', borderBottomColor: '#333' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
          tabBarStyle: { backgroundColor: '#1a1a1a', borderTopColor: '#333' },
          tabBarActiveTintColor: '#FF8C00',
          tabBarInactiveTintColor: '#666666',
        }}
      >
        <Tab.Screen
          name="dashboard"
          component={DashboardScreen}
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color }) => <MaterialIcons name="dashboard" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="work-orders"
          component={WorkOrdersScreen}
          options={{
            title: 'Work Orders',
            tabBarIcon: ({ color }) => <MaterialIcons name="assignment" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="invoices"
          component={InvoicesScreen}
          options={{
            title: 'Invoices',
            tabBarIcon: ({ color }) => <MaterialIcons name="receipt" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="scanner"
          component={ScannerScreen}
          options={{
            title: 'Scanner',
            tabBarIcon: ({ color }) => <MaterialIcons name="qr-code-scanner" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="profile"
          component={ProfileScreen}
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <MaterialIcons name="person" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="settings"
          component={SettingsScreen}
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={24} color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
