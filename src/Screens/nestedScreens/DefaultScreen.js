import React, { useState, useEffect } from "react";

import {
	Text,
	View,
	StyleSheet,
	Image,
	FlatList,
	TouchableOpacity,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";

export default function DefaultPostsScreen({ route, navigation }) {
	const [postsList, setPostsList] = useState([]);

	useEffect(() => {
		if (route.params) {
			setPostsList((prevState) => [...prevState, route.params]);
		}
	}, [route.params]);

	return (
		<View style={styles.container}>
			{postsList.length !== 0 && (
				<FlatList
					data={postsList}
					renderItem={({ item }) => (
						<View style={styles.itemWrapper}>
							<Image source={{ uri: item.photo }} style={styles.photo} />
							<Text style={{ ...styles.text, fontWeight: "500" }}>
								{item.title}
							</Text>
							<View style={styles.navigationWrapper}>
								<TouchableOpacity
									style={styles.commentWrapper}
									onPress={() =>
										navigation.navigate("Comments", {
											uri: item.photo,
											id: item.id,
										})
									}>
									<EvilIcons
										name='comment'
										size={24}
										color='#BDBDBD'
										style={{ marginRight: 8 }}
									/>
									<Text style={{ ...styles.text, color: "#BDBDBD" }}>0</Text>
								</TouchableOpacity>

								<TouchableOpacity
									style={styles.map}
									onPress={() =>
										navigation.navigate("Map", { location: item.location })
									}>
									<EvilIcons
										name='location'
										size={24}
										color='#BDBDBD'
										style={{ marginRight: 8 }}
									/>
									<Text style={{ ...styles.text, textDecorationLine: 1 }}>
										{item.locationTitle}
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					)}
					keyExtractor={(item) => item.id}
				/>
			)}
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		// alignItems: "center",
		marginHorizontal: 16,
	},
	itemWrapper: {
		marginBottom: 32,
	},
	photo: { height: 240, borderRadius: 10, marginBottom: 10 },
	navigationWrapper: {
		flexDirection: "row",
		alignItems: "baseline",
		justifyContent: "space-between",
		marginTop: 11,
	},
	commentWrapper: {
		flexDirection: "row",
		alignItems: "center",
	},
	map: {
		flexDirection: "row",
		alignItems: "center",
	},
	text: {
		fontSize: 16,
		color: "#212121",
	},
});
