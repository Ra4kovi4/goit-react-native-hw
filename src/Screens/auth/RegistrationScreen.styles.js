import { Platform, StyleSheet } from "react-native";

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

export default styles;
