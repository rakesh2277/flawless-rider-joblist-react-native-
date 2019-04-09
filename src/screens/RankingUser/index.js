import React, { Component } from "react";
// import { Text, ImageBackground, Image, TouchableOpacity, BackHandler, View } from "react-native";
import { Container, Header, Title, Left, Button, Icon, Body } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
// import styles from "./style";
import { StyleSheet, PixelRatio, TextInput, Alert, Text, ImageBackground, Image, TouchableOpacity, Dimensions, BackHandler, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';
const w = Dimensions.get('window');
// https://reactnativecode.com/upload-image-to-server-using-php-mysql/
export default class RankingUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ImageSource: null,
            data: null,
            ageid: '1403',
            ageprourl: ''
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.navigate('Home');
            return true;
        });
    }

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                this.setState({
                    ImageSource: source,
                    data: response.data,
                    ageprourl: response.uri
                });
            }
        });
    }

    uploadImageToServer = () => {
        // RNFetchBlob.fetch('POST', 'https://shopify.wpfruits.com/client/jobList/updateagent.php', {
        //     Authorization: "Bearer access-token",
        //     otherHeader: "foo",
        //     'Content-Type': 'multipart/form-data',
        // },
        // // console.log(RNFetchBlob)
        //  [
        //         { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.ageprourl },
        //         { name: '1403', data: this.state.ageid }
        //     ]).then((resp) => {
        //         console,log('responce',resp)

        //         // ageid
        //         // ageprourl

        //         var tempMSG = resp.data;

        //         tempMSG = tempMSG.replace(/^"|"$/g, '');

        //         Alert.alert(tempMSG);

        //     }).catch((err) => {
        //         // ...
        //     })

        //  axios({
        //     method: 'post',
        //     url: `https://shopify.wpfruits.com/client/jobList/updateagent.php?ageid=${this.state.ageid}&ageprourl=${this.state.ageprourl}`,
        //     responseType: 'json'
        // })
        //     .then(function (response) {
        //         console.log(response)
        //         that.setState({});
        //     });
    }
    render() {
        console.log('imageSource', this.state.ImageSource)
        console.log('asdfasdf', this.state.ageprourl)
        console.log('data', this.state.data)
        const { goBack } = this.props.navigation;
        return (
            <Container style={{}}>
                <Header androidStatusBarColor='#000' style={{ backgroundColor: '#000' }}>
                    <Left>
                        <Button transparent onPress={() => goBack()} >
                            <Icon name='arrow-back' style={{ color: '#ffffff' }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#ffffff' }}>Ranking User</Title>
                    </Body>
                </Header>
                <View style={styles.container}>
                    <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                        <View style={styles.ImageContainer}>
                            {this.state.ImageSource === null ? <Text>Select a Photo</Text> :
                                <Image style={styles.ImageContainer} source={this.state.ImageSource} />
                            }
                        </View>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                        <View style={styles.ImageContainer}>
                            <Image
                                source={{ uri: `https://images.pexels.com/photos/671557/pexels-photo-671557.jpeg?w=${w.width * 2}&buster=${Math.random()}` }}
                                style={{ width: w.width, height: w.width }}
                                resizeMode="cover"
                            />
                        </View>
                    </TouchableOpacity> */}
                    {/* <TextInput
                        placeholder="Enter Image Name "
                        onChangeText={data => this.setState({ Image_TAG: data })}
                        underlineColorAndroid='transparent'
                        style={styles.TextInputStyle}
                    /> */}
                    <TouchableOpacity onPress={this.uploadImageToServer} activeOpacity={0.6} style={styles.button} >
                        <Text style={styles.TextStyle}> UPLOAD IMAGE TO SERVER </Text>
                    </TouchableOpacity>
                    <Text>This is only for testing purpose</Text>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF8E1',
        paddingTop: 20
    },
    ImageContainer: {
        borderRadius: 10,
        width: 200,
        height: 200,
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CDDC39',
    },
    TextInputStyle: {
        textAlign: 'center',
        height: 40,
        width: '80%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#028b53',
        marginTop: 20
    },

    button: {
        width: '80%',
        backgroundColor: '#00BCD4',
        borderRadius: 7,
        marginTop: 20
    },
    TextStyle: {
        color: '#fff',
        textAlign: 'center',
        padding: 10
    }
});