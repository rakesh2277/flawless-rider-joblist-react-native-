import React, { Component } from "react";
import { Text, ImageBackground, Image, TouchableOpacity, BackHandler, AsyncStorage, View, Dimensions, Animated } from "react-native";
import { Container, Header, Title } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import styles from "./style";
let { width, height } = Dimensions.get('window');

export default class TeamScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginSet: '',
            backClickCount: 0
        }
    }

    _onPressNews = () => {
        this.props.navigation.navigate('News')
    }

    _onPresschat = () => {
        this.props.navigation.navigate('Support')
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonTeam);
        let login = AsyncStorage.getItem('userflawLogin').then((value) => {
            this.setState({ loginSet: value })
        });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonTeam);
    }

    componentWillReceiveProps = () => {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonTeam);
    }

    handleBackButtonTeam = () => {
        this.props.navigation.navigate('Home')
        return true;
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <Container style={{}}>
                <Header androidStatusBarColor='#000' style={styles.backgroundColor}>
                    <Title style={styles.headerTitle}>Team</Title>
                </Header>
                <ImageBackground source={require('../../assets/bg.png')} style={styles.imgBackground}>
                    <Grid>
                        <Col style={styles.firstCol}>
                            <TouchableOpacity onPress={this._onPressNews} style={styles.colButtonWrap}>
                                <Image source={require('../../assets/news1.png')} style={styles.colImageDimensions} />
                                <Text style={styles.colFirstText}>NEWS</Text>
                            </TouchableOpacity>
                        </Col>
                        <Col style={styles.colSecondWrp}>
                            <TouchableOpacity onPress={this._onPresschat} style={styles.colButtonWrap}>
                                <Image source={require('../../assets/chat.png')} style={styles.colImageDimensions} />
                                <Text style={styles.colSecondText}>CHAT SUPPORT</Text>
                            </TouchableOpacity>
                        </Col>
                        <Col style={styles.colThird}>
                            <Image source={require('../../assets/add-event.png')} style={styles.colImageDimensions} />
                            <Text style={styles.colThirdText}>ROSTERS</Text>
                        </Col>
                    </Grid>
                </ImageBackground>
            </Container>
        );
    }
}