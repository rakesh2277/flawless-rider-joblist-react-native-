import React, { Component } from "react";
import { View, Text, ImageBackground, Image, TouchableOpacity, ScrollView, AsyncStorage, Animated, Dimensions } from "react-native";
import { Card, CardItem, Container, Header, Title } from 'native-base';
import { Col, Grid } from "react-native-easy-grid";
import styles from "./style";
import { connect } from 'react-redux';
import axios from 'axios';
import CONFIG from '../../config';
import { updateText } from "../../actions/index";
let { height } = Dimensions.get('window');

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            userName: '',
            activeOrders: '',
            loginSet: '',
            backClickCount: 0,
            messageCount: 0
        }
    }

    redirectTomyorder = () => {
        // Redirect to myOrder Screen based on user
        this.props.updateText_1.updateText.indexOf('admin') > -1 ?
            this.props.navigation.navigate('MyOrders') :
            this.props.navigation.navigate('MyOrdersAgent')
    }

    redirectToOrderlist = () => {
        // Redirect to order-list
        this.props.navigation.navigate('Order')
    }

    redirectTorank = () => {
        // Redirect to Ranking Screen
        this.props.navigation.navigate('RankingUser')
    }

    redirectToTeam = () => {
        // Redirect to Team Screen
        this.props.navigation.navigate('Team')
    }

    _spring() {
        // Exit App Animated popup
        this.setState({ backClickCount: 1 }, () => {
            Animated.sequence([
                Animated.spring(
                    this.springValue,
                    {
                        toValue: -.02 * height,
                        friction: 5,
                        duration: 300,
                        useNativeDriver: true,
                    }
                ),
                Animated.timing(
                    this.springValue,
                    {
                        toValue: 100,
                        duration: 300,
                        useNativeDriver: true,
                    }
                ),
            ]).start(() => {
                this.setState({ backClickCount: 0 });
            });
        });
    }

    componentDidMount = () => {
        let login = AsyncStorage.getItem('userflawLogin').then((value) => {
            this.setState({ loginSet: value })
        });

        let idnrole = this.props.updateText_1.updateText.split('|__|');
        this.setState({ userId: idnrole[1], userName: idnrole[2], activeOrders: idnrole[3] })

        // Fetch Email Count
        if (idnrole[0] == 'admin') {
            axios({
                method: 'get',
                url: `${CONFIG.url}/reademail.php?userType=admin`
            })
                .then((response) => {
                    response.data.records != undefined && response.data.records != '' && response.data.records != 'undefined' && response.data.records != 'error' ?
                        this.setState({ messageCount: response.data.records.length })
                        :
                        this.setState({ messageCOunt: 0 })
                });
        }
        if (idnrole[0] == 'agent') {
            axios({
                method: 'get',
                url: `${CONFIG.url}/reademail.php?userType=agent&agentId=${idnrole[1]}`
            })
                .then((response) => {
                    response.data.records != undefined && response.data.records != '' && response.data.records != 'undefined' && response.data.records != 'error' ?
                        this.setState({ messageCount: response.data.records.length })
                        :
                        this.setState({ messageCOunt: 0 })
                });
        }
    }

    componentWillMount = () => {
        let login = AsyncStorage.getItem('userflawLogin').then((value) => {
            this.setState({ loginSet: value })
        });
    }

    render() {
        return (
            <Container style={{}}>
                <Header androidStatusBarColor='#000' style={styles.headerBackground}>
                    <Title style={styles.headerTitle}>Home</Title>
                </Header>
                <ImageBackground source={require('../../assets/bg.png')} style={styles.ImageBackground}>
                    <ScrollView>
                        <View>
                            <Card style={styles.profileInfo}>
                                <CardItem style={styles.backgroundColor}>
                                    <Grid>
                                        <Col size={35} style={{}}>
                                            <Image source={require('../../assets/asaArtwork_ios.jpg')} style={{ width: 100, height: 100 }} />
                                        </Col>
                                        <Col size={65} style={{}}>
                                            <Text style={styles.textUsername}>{this.state.userName}</Text>
                                            <Text style={styles._textUsername}>AGENT: #{this.state.userId}</Text>
                                            <View style={styles.textUsingPosition}>
                                                <Image source={require('../../assets/home/mail-ho.png')} style={styles.imgHome} />
                                                <Text style={styles.innerTextUsingPosition}>{this.state.messageCount}</Text>
                                                <Text style={styles.homeScreenMessage}>MESSAGES</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", marginTop: 10 }}>
                                                <Image source={require('../../assets/home/Game.png')} style={styles.imgHome} />
                                                <Text style={styles.textUsingPositionSec}>{this.state.activeOrders}</Text>
                                                <Text style={styles.homeScreenMessage}>ORDERS ACTIVE</Text>
                                            </View>
                                        </Col>
                                    </Grid>
                                </CardItem>
                            </Card>
                        </View>
                        <View style={styles.homePageMain}>
                            <Image source={require('../../assets/home/homeshap.png')} style={{ maxWidth: '100%', height: 400 }} resizeMode='contain' />
                            <TouchableOpacity onPress={() => this.redirectTomyorder()} style={styles.firstHomeText}>
                                <Text style={styles.homeImageText}>MY ORDERS</Text>
                                <Image source={require('../../assets/home/controls1.png')} style={styles.firstHomeTextImg} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.redirectToOrderlist()} style={styles.secondHomeText}>
                                <Text style={styles.homeImageTextColor}>ORDER LIST</Text>
                                <Image source={require('../../assets/home/console1.png')} style={styles.secondHomeTextImg} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.redirectTorank()} style={styles.thirdHomeText}>
                                <Text style={styles.homeImageText}>RANKINGS</Text>
                                <Image source={require('../../assets/home/rank.png')} style={styles.thirdHomeTextImg} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.redirectToTeam()} style={styles.fourthHomeText}>
                                <Text style={styles.homeImageText_line}>TEAM</Text>
                                <Image source={require('../../assets/home/group.png')} style={styles.fourthHomeTextImg} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ padding: 30 }} />
                    </ScrollView>
                </ImageBackground>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        updateText_1: state.userRole
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateText: (text) => dispatch(updateText(text)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen)
