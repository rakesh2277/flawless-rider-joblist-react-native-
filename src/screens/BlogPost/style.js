const React = require("react-native");
const { Dimensions } = React;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default {
    backgroundColor: {
        backgroundColor: '#3f3f3f'
    },
    bodyTitle: {
        fontFamily: 'Enter-The-Grid', fontSize: 23, letterSpacing: 1
    },
    rowFirstColumn: {
        backgroundColor: '#3f3f3f', borderRightColor: '#000', borderRightWidth: 2, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, padding: 10, marginLeft: 10
    },
    rowFirstColumnText: {
        color: '#fff', fontFamily: 'Enter-The-Grid', fontSize: 20
    },
    rowSecColumn: {
        backgroundColor: '#3f3f3f', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 10, borderBottomRightRadius: 10, padding: 10, marginRight: 10
    },
    rowSecColumnText: {
        color: '#fff', fontFamily: 'RobotoCondensed-Light', fontSize: 20, lineHeight: 22
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
    imageBackground: {
        width: '100%', height: '100%'
    },
    textAreaContainer: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 5,
        height: 250,
        marginTop: 15
    },
    textAreaContainerfirst: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 5,
        height: 80,
        marginTop: 15
    },
    textArea: {
        height: 100,
        justifyContent: "center"
    },
    postSubmitButton: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 15,
        padding: 5
    },
    postSubmitButtonText: {
        color: '#000000',
        fontFamily: 'Chosence Light',
        backgroundColor: "#ffffff",
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20
    },
    mainWrap: {
        width: deviceWidth - 20,
        marginLeft: 10,
        marginRight: 10
    }
}