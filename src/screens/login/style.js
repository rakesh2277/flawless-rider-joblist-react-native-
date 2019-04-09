const React = require("react-native");
const { Dimensions, Platform } = React;
import color from "color";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default {
    container: {
        alignItems: "center",
        backgroundColor: "transparent",
        color: "#fff",
        justifyContent: "center",
        flex: 1,
    },
    formButtonSub: {
        margin: 10,
    },
    formButtonSubText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
    formContainer: {
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: deviceWidth - 20,
        backgroundColor: '#000',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomRightRadius: 20,
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 40,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    formInput: {
        backgroundColor: "transparent",
        borderWidth: 0,
        borderRadius: 0,
        elevation: 0,
        shadowOpacity: 0,
        shadowRadius: 0,
        color: '#fff',
        fontFamily: 'Chosence Light',
        fontSize: 18,
        paddingLeft: 12,
        letterSpacing: 5,
        marginTop: 10,
    },
    headerBackground: {
        backgroundColor: '#000'
    },
    headerTitle: {
        fontFamily: 'Enter-The-Grid', fontSize: 23, letterSpacing: 1, color:'#ffffff'
    },
    ImageBackground: {
        width: '100%', height: '100%'
    },
    helpButtonRight: {
        alignItems: "flex-end",
        justifyContent: "flex-end",
    },
    helpTextLeft: {
        textAlign: "left",
        color: "#b08d58",
        fontWeight: "600",
        fontSize: 18,
    },
    helpTextRight: {
        textAlign: "right",
        color: "#b08d58",
        fontWeight: "600",
        fontSize: 18,
    },
    helpRowCenter: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 2,
    },
    helpTextCenter: {
        color: "#b08d58",
        fontWeight: "600",
        fontSize: 18,
    },
    helpRowCenterForgetPass: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 2,
    },
    helptextCenterForgetPass: {
        color: "#b08d58",
        fontWeight: "600",
        fontSize: 14,
    },
    listItemCheckBox: {
        borderBottomWidth: 0,
    },
    listItemCheckBoxText: {
        paddingLeft: 15,
    },
    logoWrapper: {
        justifyContent: 'center', alignItems: 'center', paddingTop: 25, paddingBottom: 25
    },
    logoInner: {
        width: 250, height: 100
    },
    logoutText: {
        color: '#fff',
        fontSize: 20,
    },
    loginButton: {
        width: '100%', padding: 15, justifyContent: 'flex-end', alignItems: 'flex-end', alignContent: 'flex-end', marginBottom: 10, marginTop: 10
    },
    loginButtonImage: {
        width: 65, height: 65
    },
    success: {
        color: "green",
        paddingLeft: 5,
    },
    error: {
        color: "red",
        paddingLeft: 5,
    },
    botom: {
        width: deviceWidth,
        marginLeft: 10
    },
    buttonStyle: {
        padding: 10,
        margin: 40,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    username: {
        width: 26, height: 20
    },
    password: {
        width: 17, height: 23
    },
    signupButton: {
        color: '#fff', fontFamily: 'Enter-The-Grid', fontSize: 20, letterSpacing: 2
    },
    signupButtonWrapper: {
        paddingBottom: 30
    },
    animatedView: {
        width: deviceWidth - 20,
        backgroundColor: "#424040",
        elevation: 2,
        position: "absolute",
        bottom: 0,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        left: 0,
        right: 0,
        textAlign:'center',
        marginLeft:10
    },
    exitTitleText: {
        textAlign: "center",
        color: "#ffffff",
        marginRight: 10,
    },
    exitText: {
        color: "#e5933a",
        paddingHorizontal: 10,
        paddingVertical: 3
    }
};