const React = require("react-native");
const { Dimensions, Platform } = React;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default {
    firstCol: {
        backgroundColor: '#3f3f3f', height: 150, borderRadius: 12, marginLeft: 10, marginTop: 50, justifyContent: 'center', alignItems: 'center'
    },
    colImageDimensions: {
        width: 51, height: 51
    },
    colButtonWrap: {
        justifyContent: 'center', alignItems: 'center'
    },
    colSecondWrp: {
        backgroundColor: '#3f3f3f', height: 150, borderRadius: 12, marginRight: 10, marginLeft: 10, marginTop: 50, paddingTop: 10, justifyContent: 'center', alignItems: 'center'
    },
    colSecondText: {
        color: '#FFFFFF', fontFamily: 'Enter-The-Grid', fontSize: 21, textAlign: 'center', lineHeight: 25, paddingTop: 15
    },
    colThird: {
        backgroundColor: '#3f3f3f', height: 150, borderRadius: 12, marginRight: 10, marginTop: 50, justifyContent: 'center', alignItems: 'center'
    },
    colThirdText: {
        color: '#FFFFFF', fontFamily: 'Enter-The-Grid', fontSize: 21, lineHeight: 25, paddingTop: 15
    },
    colFirstText: {
        color: '#FFFFFF', fontFamily: 'Enter-The-Grid', fontSize: 21, lineHeight: 25, paddingTop: 15
    },
    imgBackground: {
        width: '100%', height: '100%'
    },
    headerTitle: {
        fontFamily: 'Enter-The-Grid', fontSize: 23, letterSpacing: 1, color:'#ffffff'
    },
    backgroundColor: {
        backgroundColor: '#000'
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
}