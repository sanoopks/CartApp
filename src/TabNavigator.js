import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './home/Home';
import Profile from './profile/Profile';
import WishList from './wishlist/Wishlist';
import Cart from './cart/Cart';
import HomeStackNavigator from './HomeStackNavigator';
import {Text} from 'native-base';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Wishlist" component={WishList} />
      <Tab.Screen name="Cart" component={Cart} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
