import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

<MaterialIcons name='logout' size={24} color='black' />;

import PostsScreen from "./PostScreen";
import CreatePostsScreen from "./CreatePostScreen";
import ProfileScreen from "./PostScreen";
import { TouchableOpacity, View } from "react-native";

const MainTab = createBottomTabNavigator();

export default function Home({ navigation }) {
	return (
		<MainTab.Navigator
			screenOptions={{
				tabBarShowLabel: false,
			}}>
			<MainTab.Screen
				options={{
					headerShown: false,
					tabBarIcon: ({ focused, size, color }) =>
						!focused ? (
							<View
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									width: 70,
									height: 40,
									borderRadius: 20,
									backgroundColor: "transparent",
								}}>
								<Ionicons
									name='md-grid-outline'
									size={24}
									color='rgba(33, 33, 33, 0.8)'
								/>
							</View>
						) : (
							<View
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									width: 70,
									height: 40,
									borderRadius: 20,
									backgroundColor: "#FF6C00",
								}}>
								<Ionicons name='md-grid-outline' size={24} color='#fff' />
							</View>
						),
				}}
				name='PostsScreen'
				component={PostsScreen}
			/>
			<MainTab.Screen
				options={{
					tabBarIcon: ({ focused, size, color }) =>
						!focused ? (
							<View
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									width: 70,
									height: 40,
									borderRadius: 20,
									backgroundColor: "transparent",
								}}>
								<Ionicons name='add' size={24} color='rgba(33, 33, 33, 0.8)' />
							</View>
						) : (
							<View
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									width: 70,
									height: 40,
									borderRadius: 20,
									backgroundColor: "#FF6C00",
								}}>
								<Ionicons name='add' size={24} color='#fff' />
							</View>
						),
				}}
				name='Create post'
				component={CreatePostsScreen}
			/>
			<MainTab.Screen
				options={{
					headerRight: () => (
						<View
							style={{
								flexDirection: "row",
								justifyContent: "flex-end",
								paddingRight: 10,
								width: 120,
							}}>
							<TouchableOpacity onPress={() => navigation.navigate("Login")}>
								<MaterialIcons
									name='logout'
									size={24}
									color='rgba(189, 189, 189, 1)'
								/>
							</TouchableOpacity>
						</View>
					),
					tabBarIcon: ({ focused, size, color }) =>
						!focused ? (
							<View
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									width: 70,
									height: 40,
									borderRadius: 20,
									backgroundColor: "transparent",
								}}>
								<Feather name='user' size={24} color='rgba(33, 33, 33, 0.8)' />
							</View>
						) : (
							<View
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									width: 70,
									height: 40,
									borderRadius: 20,
									backgroundColor: "#FF6C00",
								}}>
								<Feather name='user' size={24} color='#fff' />
							</View>
						),
				}}
				name='Profile'
				component={ProfileScreen}
			/>
		</MainTab.Navigator>
	);
}
