import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegistrationScreen from "../Screens/auth/RegistrationScreen";
import LoginScreen from "../Screens/auth/LoginScreen";
import Home from "../Screens/mainScreen/Home";
import CreatePostsScreen from "../Screens/mainScreen/CreatePostScreen";
const Stack = createNativeStackNavigator();

export default function Navigation() {
	return (
		<Stack.Navigator initialRouteName='Home'>
			<Stack.Screen
				options={{
					headerShown: false,
				}}
				name='Login'
				component={LoginScreen}
			/>
			<Stack.Screen
				options={{
					headerShown: false,
				}}
				name='Registration'
				component={RegistrationScreen}
			/>
			<Stack.Screen
				options={{
					headerShown: false,
				}}
				name='Home'
				component={Home}
			/>
		</Stack.Navigator>
	);
}
