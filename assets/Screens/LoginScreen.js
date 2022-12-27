import { useState } from "react";

import styles from "./LoginScreen.styles";

import {
	TextInput,
	Text,
	TouchableOpacity,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Alert,
	View,
} from "react-native";

export const LoginScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSecureEntry, setIsSecureEntry] = useState(true);

	const [inputEmailFocus, setInputEmailFocus] = useState(false);
	const [inputPasswordFocus, setInputPasswordFocus] = useState(false);

	const handleChangeEmail = (text) => setEmail(text);
	const handleChangePassword = (text) => setPassword(text);

	const handleSubmit = () => {
		if (email !== "" && password !== "") {
			Alert.alert(
				"Credentials",
				`Your login: your email: ${email}, your password: ${password}`
			);
		} else {
			Alert.alert("Please, fill in all fields");
			return;
		}

		setEmail("");
		setPassword("");
		Keyboard.dismiss();
	};

	return (
		<View style={styles.wrapper}>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}>
				<Text style={styles.title}>Sign in</Text>
				<View style={styles.formWrapper}>
					<View style={styles.form}>
						<TextInput
							value={email}
							placeholder='Email'
							placeholderTextColor='#BDBDBD'
							onChangeText={handleChangeEmail}
							onFocus={() => setInputEmailFocus(true)}
							onBlur={() => setInputEmailFocus(false)}
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
								onFocus={() => setInputPasswordFocus(true)}
								onBlur={() => setInputPasswordFocus(false)}
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
				<TouchableOpacity activeOpacity={0.5}>
					<Text style={styles.loginLink}>Don't have an account? Sign up</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</View>
	);
};
