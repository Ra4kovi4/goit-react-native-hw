import "expo-dev-menu";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import Navigation from "./src/Navigation/Navigation";

export default function App() {
	const [isReady, setIsReady] = useState(false);

	const loadFonts = async () => {
		try {
			await Font.loadAsync({
				"Roboto-Regular": require("./src/fonts/Roboto-Regular.ttf"),
				"Roboto-Medium": require("./src/fonts/Roboto-Medium.ttf"),
				"Roboto-Bold": require("./src/fonts/Roboto-Bold.ttf"),
			});
		} catch (error) {
			console.warn(error);
		} finally {
			SplashScreen.hideAsync();
			setIsReady(true);
		}
	};

	useEffect(() => {
		SplashScreen.preventAutoHideAsync();
		loadFonts();
	}, []);

	if (!isReady) return null;

	return (
		<NavigationContainer>
			<Navigation />
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		color: "#bacbb1",
	},
});
