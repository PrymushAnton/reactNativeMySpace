import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    inputText:{
        color: "#070A1C",
		fontSize: 16,
        fontFamily: "GTWalsheimPro-Regular",
        marginBottom: 6,
        marginTop: 16
    },
    personalInfoSettings:{
        flexDirection: "column",
    },
    profileCard:{
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        borderColor: "#CDCED2",
        borderWidth: 1,
        borderRadius: 10,
    },
    profileCardTop:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 16,
    },
    profileCardBottom:{
        alignItems: "center",
        flexDirection: "column",
        paddingBottom: 16
    },
    personalInfoTop:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6,
    },
    personalInfo:{
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        borderColor: "#CDCED2",
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 8,
        paddingVertical: 16,
        paddingLeft: 14,
        paddingRight: 18,
    },
})