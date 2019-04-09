const React = require("react-native");
const { Dimensions, Platform } = React;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default {
    backgroundColor: {
        backgroundColor: '#3f3f3f'
    },
    container: {
        alignItems: "center",
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    formButtonSub: {
        backgroundColor: "#323232",
        borderRadius: 5,
        margin: 10,
        width: deviceWidth - 70,
        alignItems: "center",
        justifyContent: "center",
    },
    formButtonSubText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
    formContainer: {
        marginTop: 5,
        width: deviceWidth - 50,
    },
    formInput: {
        backgroundColor: "#f5f5f5",
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        elevation: 5,
        shadowColor: '#ccc',
        shadowOpacity: 10,
        shadowRadius: 5,
    },
    formItem: {
        borderBottomWidth: 0,
        margin: 10,
        backgroundColor: "#f5f5f5",
        elevation: 1,
        borderWidth: 1,
        borderTopWidth: 2,
        borderBottomWidth: 0,
        borderBottomColor: 'transparent',
    },
    helpButtonRight: {
        alignItems: "flex-end",
        justifyContent: "flex-end",
    },
    headerBackground: {
        backgroundColor: '#000'
    },
    headerTitle: {
        fontFamily: 'Enter-The-Grid', fontSize: 23, letterSpacing: 1,color:'#ffffff'
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
    ImageBackground: {
        width: '100%', height: '100%'
    },
    listItemCheckBox: {
        borderBottomWidth: 0,
    },
    listItemCheckBoxText: {
        paddingLeft: 15,
    },
    logoutText: {
        color: '#fff',
        fontSize: 20,
    },
    profileInfo: {
        backgroundColor: '#3f3f3f', marginBottom: 20, marginLeft: 10, marginRight: 10, paddingTop: 10, paddingBottom: 10, borderRadius: 5
    },
    success: {
        color: "green",
        paddingLeft: 5,
    },
    error: {
        color: "red",
        paddingLeft: 5,
    },
    textUsername: {
        color: '#fff', fontFamily: 'Enter-The-Grid', fontSize: 22, letterSpacing: 2
    },
    _textUsername: {
        color: '#fff', fontFamily: 'Enter-The-Grid', fontSize: 16, letterSpacing: 2, paddingTop: 10
    },
    textUsingPosition: {
        flexDirection: "row", marginTop: 20, position: 'relative'
    },
    innerTextUsingPosition: {
        color: '#000', fontFamily: 'RobotoCondensed-Light', fontSize: 11, position: 'absolute', left: 15, top: -6, width: 15, height: 16, backgroundColor: '#ccc', borderRadius: 25, paddingLeft: 4, paddingBottom: 4
    },
    homeScreenMessage: {
        color: '#fff', fontFamily: 'Enter-The-Grid', fontSize: 18, letterSpacing: 2, marginLeft: 10
    },

    textUsingPositionSec: {
        color: '#000', fontFamily: 'RobotoCondensed-Light', fontSize: 11, position: 'absolute', left: 15, top: -6, width: 15, height: 16, backgroundColor: '#ccc', borderRadius: 25, paddingLeft: 4, paddingBottom: 4
    },
    homePageMain: {
        paddingLeft: 10, paddingRight: 10, position: 'relative', width: '100%'
    },
    firstHomeText: {
        position: 'absolute', top: '14%', left: '8.3%', justifyContent: 'center', alignItems: 'center', alignContent: 'center'
    },
    secondHomeText: {
        position: 'absolute', top: 122, left: '40%', justifyContent: 'center', alignItems: 'center', alignContent: 'center'
    },
    thirdHomeText: {
        position: 'absolute', top: '14%', left: '74%', justifyContent: 'center', alignItems: 'center', alignContent: 'center'
    },
    fourthHomeText: {
        position: 'absolute', top: 250, left: '45%', justifyContent: 'center', alignItems: 'center', alignContent: 'center'
    },
    homeImageText: {
        color: '#FFFFFF', fontFamily: 'Enter-The-Grid', fontSize: 16, lineHeight: 23
    },
    homeImageText_line: {
        color: '#FFFFFF', fontFamily: 'Enter-The-Grid', fontSize: 16, lineHeight: 22
    },
    homeImageTextColor: {
        color: '#000', fontFamily: 'Enter-The-Grid', fontSize: 16, lineHeight: 23
    },
    imgHome: {
        width: 26, height: 18
    },
    firstHomeTextImg: {
        width: 35, height: 35
    },
    secondHomeTextImg: {
        width: 30, height: 30
    },
    thirdHomeTextImg:
    {
        width: 40, height: 40
    },
    fourthHomeTextImg: {
        width: 44, height: 44
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
        textAlign: 'center',
        marginLeft: 10
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