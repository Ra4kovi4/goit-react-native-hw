import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import uuid from "react-native-uuid";
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	Image,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
	Platform,
	KeyboardAvoidingView,
	Alert,
	ScrollView,
} from "react-native";
import { Camera } from "expo-camera";
import { Entypo, SimpleLineIcons, Feather, Ionicons } from "@expo/vector-icons";

import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

export default function CreatePostsScreen({ navigation }) {
	const [camera, setCamera] = useState(null);
	const [photo, setPhoto] = useState("");
	const [hasPermission, setHasPermission] = useState(null);
	const [title, setTitle] = useState(" ");
	const [locationTitle, setLocationTitle] = useState("");
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [isKeyboardShow, setIsKeyboardShow] = useState(false);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const [isCameraReady, setIsCameraReady] = useState(false);

	useFocusEffect(
		useCallback(() => {
			(async () => {
				const { status } = await Camera.requestCameraPermissionsAsync();
				await MediaLibrary.requestPermissionsAsync();
				setHasPermission(status === "granted");
			})();

			return () => setHasPermission(null);
		}, [])
	);
	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}
		})();
	}, []);

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}
	const onCameraReady = () => {
		setIsCameraReady(true);
	};

	const takePhoto = async () => {
		const photo = await camera.takePictureAsync();

		setPhoto(photo.uri);
	};

	const handleChangeTitle = (text) => setTitle(text);
	const handleChangeLocationTitle = (text) => setLocationTitle(text);

	const keyboardHide = () => {
		Keyboard.dismiss();
		setIsKeyboardShow(false);
	};
	const clearPostData = () => {
		setPhoto("");
		setTitle("");
		setLocationTitle("");
	};

	const publicPost = async () => {
		keyboardHide();
		let location = await Location.getCurrentPositionAsync({
			accuracy: Location.Accuracy.Lowest,
		});

		const coords = {
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
		};
		setLocation(coords);
		if (!title || !locationTitle || !photo) {
			Alert.alert("Please fill in all fields");
			return;
		}
		navigation.navigate("Posts", {
			photo,
			title,
			locationTitle,
			location,
			id: uuid.v4(),
		});
		clearPostData();
	};
	return (
		<TouchableWithoutFeedback onPress={keyboardHide}>
			<ScrollView style={styles.container}>
				{!photo && (
					<Camera
						style={styles.camera}
						type={type}
						ref={setCamera}
						onCameraReady={onCameraReady}>
						<TouchableOpacity onPress={takePhoto}>
							<View style={styles.iconWrapper}>
								<Entypo name='camera' size={24} color='#BDBDBD' />
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.flipContainer}
							onPress={() => {
								setType(
									type === Camera.Constants.Type.back
										? Camera.Constants.Type.front
										: Camera.Constants.Type.back
								);
							}}>
							<Ionicons name='camera-reverse-outline' size={30} color='#FFF' />
						</TouchableOpacity>
					</Camera>
				)}
				{photo && (
					<View style={styles.takePhotoContainer} activeOpacity={0.5}>
						<Image
							source={{ uri: photo }}
							style={{ width: "100%", height: 240, borderRadius: 8 }}
						/>
					</View>
				)}
				{!photo ? (
					<Text style={styles.descriptionText}>Upload photo</Text>
				) : (
					<Text style={styles.descriptionText}>Edit photo</Text>
				)}

				<View>
					<View style={styles.locationWrapper}>
						<TextInput
							placeholder='title...'
							value={title}
							placeholderTextColor='#BDBDBD'
							style={styles.input}
							onChangeText={handleChangeTitle}
							onFocus={() => setIsKeyboardShow(true)}
							onBlur={() => setIsKeyboardShow(false)}
						/>
					</View>
					<View style={styles.locationWrapper}>
						<SimpleLineIcons
							name='location-pin'
							size={18}
							color='#BDBDBD'
							style={styles.locationIcon}
						/>
						<TextInput
							placeholder='location'
							value={locationTitle}
							placeholderTextColor='#BDBDBD'
							style={{ ...styles.input, paddingLeft: 25 }}
							onChangeText={handleChangeLocationTitle}
							onFocus={() => setIsKeyboardShow(true)}
							onBlur={() => setIsKeyboardShow(false)}
						/>
					</View>

					<TouchableOpacity
						activeOpacity={0.5}
						disabled={photo ? false : true}
						style={
							!photo
								? {
										...styles.postButton,
										backgroundColor: "rgba(246, 246, 246, 1)",
								  }
								: {
										...styles.postButton,
										backgroundColor: "rgba(255, 108, 0, 1)",
								  }
						}
						onPress={publicPost}>
						<Text
							style={
								photo
									? {
											...styles.buttonText,
											color: "#FFF",
									  }
									: {
											...styles.postButton,
											color: "#BDBDBD",
									  }
							}>
							Post
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.trashIcon}
						onPress={clearPostData}
						disabled={photo ? false : true}>
						<Feather name='trash-2' size={24} color='#BDBDBD' />
					</TouchableOpacity>
				</View>
			</ScrollView>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,

		paddingLeft: 16,
		paddingRight: 16,
		zIndex: 100,
		height: "100%",
		backgroundColor: "#FFFF",
	},
	camera: {
		position: "relative",
		justifyContent: "center",
		alignItems: "center",
		height: 240,
		marginTop: 10,
		marginBottom: 8,
		backgroundColor: "rgba(232, 232, 232, 1)",
		borderColor: "rgba(246, 246, 246, 1)",
		borderRadius: 8,
	},
	descriptionText: {
		marginBottom: 30,
		fontSize: 16,
		color: "#BDBDBD",
	},
	iconWrapper: {
		width: 60,
		height: 60,
		borderRadius: 50,
		backgroundColor: "#ffffff",
		justifyContent: "center",
		alignItems: "center",
	},
	flipContainer: {
		position: "absolute",
		bottom: 10,
		right: 10,
		flex: 0.1,
		alignSelf: "flex-end",
	},
	takePhotoContainer: {
		marginTop: 10,
		marginBottom: 8,
		borderRadius: 8,
		borderColor: "#fff",
		height: 240,
		width: "100%",
	},

	input: {
		width: "100%",
		borderBottomWidth: 1,
		borderColor: "#E8E8E8",
		marginBottom: 10,
		paddingBottom: 15,
		paddingTop: 16,
		color: "#212121",
		fontSize: 16,
	},

	locationWrapper: {
		display: "flex",
	},

	locationIcon: {
		position: "absolute",
		top: 17,
	},
	postButton: {
		justifyContent: "center",
		alignItems: "center",
		width: 343,
		height: 51,
		borderRadius: 100,
		textAlign: "center",
		marginTop: 32,
		fontSize: 16,
	},
	buttonText: {
		fontSize: 16,
		fontFamily: "Roboto-Regular",
	},
	trashIcon: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#F6F6F6",
		borderRadius: 20,
		marginRight: "auto",
		marginLeft: "auto",
		marginTop: 20,
		height: 40,
		width: 70,
	},
});
