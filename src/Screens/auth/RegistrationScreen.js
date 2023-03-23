import { useState } from "react";
import { AddPhotoBtn } from "../../components/AddPhotoBtn";
import { DeletePhotoBtn } from "../../components/DeletePhotoBtn";
import styles from "./RegistrationScreen.styles";
import * as ImagePicker from "expo-image-picker";
import {
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
			console.log(
				`Your login: ${name}, your email: ${email}, your password: ${password}`
			);
			navigation.navigate("Home");
		} else {
			console.log("Please, fill in all fields");
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

						<View
							style={
								styles.formWrapper
								// marginBottom: isKeyboardShow ? -150 : 0,
							}>
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
