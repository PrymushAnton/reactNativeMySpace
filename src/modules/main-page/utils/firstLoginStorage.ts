import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY_PREFIX = "first_login_shown_";

export async function saveFirstLoginFlag(email: string) {
	if (!email) return;
	await AsyncStorage.setItem(`${KEY_PREFIX}${email}`, "true");
}

export async function checkFirstLoginFlag(email: string): Promise<boolean> {
	if (!email) return false;
	const value = await AsyncStorage.getItem(`${KEY_PREFIX}${email}`);
	return value === "true";
}
