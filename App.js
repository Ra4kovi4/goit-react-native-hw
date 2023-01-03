import { useCallback } from "react";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import {
	View,
	ImageBackground,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { RegistrationScreen } from "./assets/src/Screens/RegistrationScreen";
import { LoginScreen } from "./assets/src//Screens/LoginScreen";
import styles from "./StylesApp.styles";

SplashScreen.preventAutoHideAsync();
export default function App() {
	const [fontsLoaded] = useFonts({
		"Roboto-Regular": require("./assets/src/fonts/Roboto-Regular.ttf"),
		"Roboto-Medium": require("./assets/src/fonts/Roboto-Medium.ttf"),
		"Roboto-Bold": require("./assets/src/fonts/Roboto-Bold.ttf"),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container} onLayout={onLayoutRootView}>
				<ImageBackground
					source={require("./assets/src/images/bg.png")}
					style={styles.backroundImage}>
					<RegistrationScreen />

					{/* <LoginScreen /> */}
				</ImageBackground>
			</View>
		</TouchableWithoutFeedback>
	);
}
