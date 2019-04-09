import React, { Component } from 'react';
import { createTabNavigator, createStackNavigator } from 'react-navigation';
import { Image } from 'react-native';
import HomeScreen from './screens/home';
import TeamScreen from './screens/team';
import OrderScreen from './screens/order';
import ProfileScreen from './screens/profile';
import LoginScreen from './screens/login';
import RegistrationScreen from './screens/registration';
import NewsScreen from './screens/news';
import SupportScreen from './screens/support';
import OrderSingleScreen from './screens/orderSingle';
import MyOrderScreen from './screens/myorder';
import MyOrdersAgent from './screens/MyOrdersAgent';
import AssignOrders from './screens/assignOrders';
import RankingUser from './screens/RankingUser';
import CustomMessage from './screens/customMessage';
import BlogPost from './screens/BlogPost';
import ScreenBasedOnUser from './screens/screenBasedOnUser';
import DeletAgent from './screens/DeleteAgent';

const Tabs = createTabNavigator(
    {
        Home: HomeScreen,
        Team: TeamScreen,
        MyOrders: ScreenBasedOnUser,
        Profile: ProfileScreen,
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    let iconHome = focused ? require('./assets/home-h.png') : require('./assets/home.png');
                    return <Image source={iconHome} style={{ width: 30, height: 30 }} />;
                }
                if (routeName === 'Team') {
                    let iconTeam = focused ? require('./assets/team-h.png') : require('./assets/team.png');
                    return <Image source={iconTeam} style={{ width: 30, height: 30 }} />;
                }
                if (routeName === 'MyOrders') {
                    let iconOrder = focused ? require('./assets/orders-h.png') : require('./assets/orders.png');
                    return <Image source={iconOrder} style={{ width: 30, height: 30 }} />;
                }
                if (routeName === 'Profile') {
                    let iconProfile = focused ? require('./assets/profiles-h.png') : require('./assets/profiles.png');
                    return <Image source={iconProfile} style={{ width: 24, paddingTop: 8, paddingBottom:8 }} />;
                }
            }
        }),
        tabBarOptions: {
            activeTintColor: '#014197',
            inactiveTintColor: '#ccc',
            showIcon: true,
            style: {
                backgroundColor: '#000000',
            },
            tabStyle: {
                backgroundColor: '#000000',
            },
        },
        tabBarPosition: 'bottom',
        animationEnabled: true,
        lazy: false,
        swipeEnabled: true,
    }
);

const RootStack = createStackNavigator({
    Login: LoginScreen,
    News: NewsScreen,
    Support: SupportScreen,
    Registration: RegistrationScreen,
    OrderSingleScreen: OrderSingleScreen,
    Order: OrderScreen,
    MyOrdersAgent: MyOrdersAgent,
    ScreenBasedOnUser: ScreenBasedOnUser,
    MyOrders: MyOrderScreen,
    AssignOrders: AssignOrders,
    RankingUser: RankingUser,
    CustomMessage: CustomMessage,
    BlogPost: BlogPost,
    DeletAgent:DeletAgent,
    Tabs: Tabs,
},
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    });

export default class Maintabs extends Component {
    render() {
        return (
            <RootStack />
        );
    }
}

