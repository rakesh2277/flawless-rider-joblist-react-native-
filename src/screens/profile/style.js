const React = require("react-native");
const { Dimensions, Platform } = React;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default {
    blackBackground: {
        backgroundColor: '#000'
    },
    headerTitle: {
        fontFamily: 'Enter-The-Grid', fontSize: 23, letterSpacing: 1, color:'#ffffff'
    },
    logoutTitle: {
        fontFamily: 'Enter-The-Grid', fontSize: 15, letterSpacing: 1, marginLeft:15, color:'#ffffff'
    },
    imgBackground: {
        width: '100%', height: '100%'
    },
    firstView: {
        justifyContent: 'center', alignItems: 'center', alignContent: 'center', marginTop: 15, marginBottom: 15, flexDirection:'row'
    },
    firstViewText: {
        color: '#fff', fontFamily: 'Enter-The-Grid', fontSize: 22, letterSpacing: 2
    },
    secViewText: {
        alignItems: 'center', marginTop: 15
    },
    alignItemCenter: {
        alignItems: 'center'
    },
    iconColor: {
        fontSize: 35, color: '#fff'
    },
    firstRowFirstCol: {
        backgroundColor: '#3f3f3f', height: 40, borderRightColor: '#000', borderRightWidth: 1, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, padding: 10, marginLeft: '2%'
    },
    insideGridRowCol: {
        backgroundColor: '#3f3f3f', height: 40, justifyContent: 'center', alignItems: 'center', borderRightColor: '#000', borderRightWidth: 1
    },
    insideGridRowColText: {
        color: '#fff', fontFamily: Platform.OS === 'ios' ? 'Chosence' : 'Chosence Regular', fontSize: 20, paddingLeft: 5, paddingRight: 5,
    },
    secondRowCol: {
        backgroundColor: '#060D75', height: 40, borderRightColor: '#000', borderRightWidth: 1, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, padding: 10, marginLeft: '2%'
    },
    rowLastColumn: {
        backgroundColor: '#3f3f3f', height: 40, justifyContent: 'center', alignItems: 'center', padding: 10, marginRight: '2%', borderTopRightRadius: 10, borderBottomRightRadius: 10
    },
    rowLastColumnText: {
        color: '#fff', fontFamily: Platform.OS === 'ios' ? 'Chosence' : 'Chosence Regular', fontSize: 20
    },
    rowSecondColumnText: {
        color: '#fff', fontFamily: Platform.OS === 'ios' ? 'Chosence' : 'Chosence Regular', fontSize: 20, letterSpacing: 2, paddingLeft: 5, paddingRight: 5
    },
    rowThirdColumnText: {
        color: '#fff', fontFamily: Platform.OS === 'ios' ? 'Chosence' : 'Chosence Regular', fontSize: 20, letterSpacing: 2
    },
    rowThirdWrp: {
        backgroundColor: '#01A705', height: 40, borderRightColor: '#000', borderRightWidth: 1, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, padding: 10, marginLeft: '2%'
    },
    rowFourthColWrp: {
        backgroundColor: '#0F6BD8', height: 40, borderRightColor: '#000', borderRightWidth: 1, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, padding: 10, marginLeft: '2%'
    },
    imgHeightWid: {
        width: 180, height: 180, borderRadius: 150 / 2
    },
    rowHeight: {
        height: 50
    },
    signupButton: {
        color: '#fff', fontFamily: 'Enter-The-Grid', fontSize: 18, letterSpacing: 2
    },
    signupButtonWrapper: {
        paddingBottom: 30, justifyContent:'center', alignItems:'center'
    },
    csvdownload:{
        color: '#fff', fontFamily: 'Enter-The-Grid', fontSize: 16, letterSpacing: 2
    },
    itemTitle: {
        color: '#fff', fontFamily: Platform.OS === 'ios' ? 'Chosence' : 'Chosence Regular', fontSize: 17, paddingLeft: 5, paddingRight: 5
    },
    itemTitleWrapper_1: {
        width: '33%', backgroundColor: '#3f3f3f', height: 74, justifyContent: 'center', alignItems: 'center'
    },
    backGroundColorMyOrder: {
        backgroundColor: '#3f3f3f'
    },
    cardMain: {
        backgroundColor: '#3f3f3f', marginLeft: 10, marginRight: 10, paddingTop: 5, paddingBottom: 5, borderColor: 'transparent'
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