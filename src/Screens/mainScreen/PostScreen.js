import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DefaultPostsScreen from "../nestedScreens/DefaultScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";

const NestedScreen = createNativeStackNavigator();

export default function PostScreen() {
	return (
		<NestedScreen.Navigator>
			<NestedScreen.Screen name='Posts' component={DefaultPostsScreen} />
			<NestedScreen.Screen name='Map' component={MapScreen} />
			<NestedScreen.Screen name='Comments' component={CommentsScreen} />
		</NestedScreen.Navigator>
	);
}
