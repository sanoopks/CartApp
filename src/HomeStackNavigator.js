import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './home/Home';
import Detail from './detail/Detail';

const Stack = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
}

export default HomeStackNavigator;
