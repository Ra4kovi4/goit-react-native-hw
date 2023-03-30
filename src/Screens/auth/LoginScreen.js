import { useState } from "react";

import {
	StyleSheet,
	TextInput,
	Text,
	TouchableOpacity,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Alert,
	View,
	TouchableWithoutFeedback,
	ImageBackground,
} from "react-native";

const bgImage = require("../../images/bg.png");

export default function LoginScreen({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSecureEntry, setIsSecureEntry] = useState(true);

	const [inputEmailFocus, setInputEmailFocus] = useState(false);
	const [inputPasswordFocus, setInputPasswordFocus] = useState(false);
	const [isKeyboardShow, setIsKeyboardShow] = useState(false);

	const keyboardHide = () => {
		Keyboard.dismiss();
		setIsKeyboardShow(false);
	};

	const handleChangeEmail = (text) => setEmail(text);
	const handleChangePassword = (text) => setPassword(text);

	const handleSubmit = () => {
		if (email !== "" && password !== "") {
			navigation.navigate("Home");
		} else {
			Alert.alert("Please, fill in all fields");
			return;
		}

		setEmail("");
		setPassword("");
		keyboardHide();
	};

	return (
		<TouchableWithoutFeedback onPress={keyboardHide}>
			<ImageBackground source={bgImage} style={styles.backroundImage}>
				<KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : ""}>
					<View
						style={{
							...styles.wrapper,
							marginBottom: isKeyboardShow ? -240 : 0,
						}}>
						<Text style={styles.title}>Sign in</Text>
						<View style={styles.formWrapper}>
							<View style={styles.form}>
								<TextInput
									value={email}
									placeholder='Email'
									placeholderTextColor='#BDBDBD'
									onChangeText={handleChangeEmail}
									onFocus={() => {
										setInputEmailFocus(true);
										setIsKeyboardShow(true);
									}}
									onBlur={() => {
										setInputEmailFocus(false);
										setIsKeyboardShow(false);
									}}
									style={
										inputEmailFocus
											? { ...styles.input, borderColor: "#FF6C00" }
											: styles.input
									}
								/>
								<View styles={styles.passwordWrapper}>
									<TouchableOpacity
										style={styles.securePassword}
										onPress={() => setIsSecureEntry((prevState) => !prevState)}>
										<Text style={styles.securePasswordIcon}>
											{isSecureEntry ? "Show" : "Hide"}
										</Text>
									</TouchableOpacity>
									<TextInput
										value={password}
										placeholder='Password'
										placeholderTextColor='#BDBDBD'
										onChangeText={handleChangePassword}
										onFocus={() => {
											setInputPasswordFocus(true);
											setIsKeyboardShow(true);
										}}
										onBlur={() => {
											setInputPasswordFocus(false);
											setIsKeyboardShow(false);
										}}
										style={
											inputPasswordFocus
												? { ...styles.input, borderColor: "#FF6C00" }
												: styles.input
										}
										secureTextEntry={isSecureEntry}
									/>
								</View>

								<TouchableOpacity
									activeOpacity={0.5}
									style={styles.loginButton}
									onPress={handleSubmit}>
									<Text style={styles.buttonText}>Log in</Text>
								</TouchableOpacity>
							</View>
						</View>
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={() => navigation.navigate("Registration")}>
							<Text style={styles.loginLink}>
								Don't have an account? Sign up
							</Text>
						</TouchableOpacity>
					</View>
				</KeyboardAvoidingView>
			</ImageBackground>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		// flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		position: "relative",
		width: "100%",
		paddingTop: 32,
		paddingBottom: 144,

		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
	},

	formWrapper: {
		// flex: 1,
		width: "100%",
		position: "relative",
		marginBottom: 16,
		alignItems: "center",
		justifyContent: "center",
	},

	title: {
		fontSize: 30,
		marginBottom: 32,
		fontFamily: "Roboto-Medium",
		textAlign: "center",
	},
	input: {
		width: 343,
		height: 50,
		padding: 10,
		borderWidth: 1,
		borderColor: "#E8E8E8",
		backgroundColor: "#F6F6F6",
		borderRadius: 8,
		marginBottom: 10,
		paddingBottom: 15,
		paddingTop: 16,
		paddingLeft: 16,
		color: "#000",
		fontSize: 16,
	},
	inputFocus: {
		borderColor: "#E8E8E8",
	},
	passwordWrapper: {
		position: "relative",

		padding: 0,
		margin: 0,
	},
	securePassword: {
		position: "absolute",
		zIndex: 99,
		top: 13,
		left: 287,
		padding: 0,
		margin: 0,
		justifyContent: "center",
	},
	securePasswordIcon: {
		color: "#1B4371",
		fontSize: 16,
		padding: 0,
		margin: 0,
	},

	loginButton: {
		justifyContent: "center",
		alignItems: "center",
		width: 343,
		height: 51,
		borderRadius: 100,
		backgroundColor: "#FF6C00",
		textAlign: "center",
		marginTop: 43,
	},
	buttonText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontFamily: "Roboto-Regular",
	},
	loginLink: {
		textAlign: "center",
		fontFamily: "Roboto-Regular",
		fontSize: 16,
		color: "#1B4371",
	},
	backroundImage: {
		flex: 1,
		width: "100%",
		justifyContent: "flex-end",
		resizeMode: "cover",
	},
});
