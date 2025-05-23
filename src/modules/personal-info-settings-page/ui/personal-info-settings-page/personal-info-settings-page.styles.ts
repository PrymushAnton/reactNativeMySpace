import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    inputText:{
        color: "#83858E",
		fontWeight: 400,
		fontSize: 16,
    },

    personalInfoSettings:{
        flexDirection: "column",
    },
    personalInfoSettingsTop:{
        flexDirection: "row",
        marginVertical: 16,
    },
    personalInfoSettingsTopEl:{
        marginHorizontal: 16,
    },


    profileCard:{
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        borderColor: "#CDCED2",
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 8
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
        marginBottom: 24,
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
    
    
    writingVariantsTop:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
    },
    writingVariants:{
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
    writingVariantsCheckbox:{
        flexDirection: "row",
        gap: 8,
        alignItems: "center"
    }
})