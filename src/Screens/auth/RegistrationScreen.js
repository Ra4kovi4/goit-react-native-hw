import { useState } from "react";
import { AddPhotoBtn } from "../../components/AddPhotoBtn";
import { DeletePhotoBtn } from "../../components/DeletePhotoBtn";

import * as ImagePicker from "expo-image-picker";
import {
	StyleSheet,
	TextInput,
	Text,
	TouchableOpacity,
	KeyboardAvoidingView,
	Keyboard,
	Platform,
	Alert,
	View,
	Image,
	TouchableWithoutFeedback,
	ImageBackground,
} from "react-native";

const bgImage = require("../../images/bg.png");

export default function RegistrationScreen({ navigation }) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSecureEntry, setIsSecureEntry] = useState(true);
	const [inputNameFocus, setInputNameFocus] = useState(false);
	const [inputEmailFocus, setInputEmailFocus] = useState(false);
	const [inputPasswordFocus, setInputPasswordFocus] = useState(false);
	const [image, setImage] = useState(null);

	const [isKeyboardShow, setIsKeyboardShow] = useState(false);

	const keyboardHide = () => {
		setIsKeyboardShow(false);
		Keyboard.dismiss();
	};

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};
	const handleDelete = () => {
		setImage(null);
	};

	const handleChangeLogin = (text) => setName(text);
	const handleChangeEmail = (text) => setEmail(text);
	const handleChangePassword = (text) => setPassword(text);

	const handleSubmit = () => {
		if (name !== "" && email !== "" && password !== "") {
			navigation.navigate("Home", { name, email, image });
		} else {
			Alert.alert("Please, fill in all fields");
			return;
		}

		setName("");
		setEmail("");
		setPassword("");
		keyboardHide();
	};

	return (
		<TouchableWithoutFeedback onPress={keyboardHide}>
			<ImageBackground source={bgImage} style={styles.backroundImage}>
				<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
					<View
						style={{
							...styles.wrapper,
							marginBottom: isKeyboardShow ? -190 : 0,
						}}>
						<View style={styles.avatarWrapper}>
							{image ? (
								<TouchableOpacity style={styles.addBtn} onPress={handleDelete}>
									<DeletePhotoBtn style={{ zIndex: 999, fill: "#fff" }} />
								</TouchableOpacity>
							) : (
								<TouchableOpacity style={styles.addBtn} onPress={pickImage}>
									<AddPhotoBtn />
								</TouchableOpacity>
							)}
							{image && (
								<Image
									source={{ uri: image }}
									style={{ width: 120, height: 120, borderRadius: 16 }}
								/>
							)}
						</View>
						<Text style={styles.title}>Sign up</Text>

						<View style={styles.formWrapper}>
							<View style={styles.form}>
								<TextInput
									value={name}
									placeholder='Your name'
									placeholderTextColor='#BDBDBD'
									onChangeText={handleChangeLogin}
									onFocus={() => {
										setInputNameFocus(true);
										setIsKeyboardShow(true);
									}}
									onBlur={() => {
										setInputNameFocus(false);
										setIsKeyboardShow(false);
									}}
									style={
										inputNameFocus
											? { ...styles.input, borderColor: "#FF6C00" }
											: styles.input
									}
								/>
								<TextInput
									value={email}
									placeholder='Email'
									placeholderTextColor='#BDBDBD'
									keyboardType='email-address'
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
									<Text style={styles.buttonText}>Create your account</Text>
								</TouchableOpacity>
							</View>
						</View>

						<TouchableOpacity
							activeOpacity={0.5}
							onPress={() => navigation.navigate("Login")}>
							<Text style={styles.loginLink}>
								Already have an account? Log in
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
		backgroundColor: "#FFFFFF",
		position: "relative",
		width: "100%",
		paddingTop: 92,
		paddingBottom: 78,

		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		textAlign: "center",
	},

	avatarWrapper: {
		width: 120,
		height: 120,
		borderRadius: 16,
		position: "absolute",
		top: -60,
		left: "33%",
		backgroundColor: "#F6F6F6",
	},
	avatar: {
		width: "100%",
		zIndex: 100,
	},
	addBtn: {
		position: "absolute",

		left: 102,
		bottom: 22,
		width: 25,
		height: 25,
		zIndex: 999,
	},
	formWrapper: {
		width: "100%",
		position: "relative",
		marginBottom: 16,
		alignItems: "center",
		justifyContent: "center",
	},
	backroundImage: {
		flex: 1,
		width: "100%",
		justifyContent: "flex-end",
		resizeMode: "cover",
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
