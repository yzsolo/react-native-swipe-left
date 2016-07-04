/**
 *  a swipe left component. (消息列表左滑解决方案)
 */

'use strict';

import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    PanResponder,
    Animated,
    TouchableHighlight
} from 'react-native';

export default class Swipes extends Component {

    constructor(props) {
        super(props);
        let _width = _width || this._getBtnBoxWidth();
        this.state = {
            left: new Animated.Value(0),
            isOpen: false,
            btnright: new Animated.Value(-_width),
            flag: false,
            height: 0,
            width: 0
        };

    }

    _closeRow = () => {
        let _width = _width || this._getBtnBoxWidth();
        this._setIsOpenState(false);
        this._setHasIdOpenState(false);
        this.moving(this.state.btnright, -_width);
        this.moving(this.state.left, 0);
    }

    _getBtnBoxWidth() {
        let arr = [];

        this.props.rightBtn.map(function(item){
            return arr.push(item.width);
        })

        return arr.reduce(function(pre, cur) {
            return pre + cur;
        });

    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => {
                return (this.state.isOpen || this.props.root.state.hasIdOpen)? true : false;
            },
            onStartShouldSetPanResponderCapture: (evt, gestureState) => {
                return (this.state.isOpen || this.props.root.state.hasIdOpen)? true : false;
            },
            onMoveShouldSetPanResponder: (evt, gestureState) => {return Math.abs(gestureState.dx) >= 0;},
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {return Math.abs(gestureState.dx) >= 0;},
            onPanResponderMove: (evt, gestureState) => {this._onPanResponderMove(evt, gestureState)},			
            onPanResponderRelease: (evt, gestureState) => {this._onPanResponderRelease(evt, gestureState)},
            onPanResponderTerminate: (evt, gestureState) => {this._onPanResponderTerminate(evt, gestureState)},
        })

        let _width = _width || this._getBtnBoxWidth();

        this.setState({
            width: _width
        })
    }

    _onPanResponderMove(evt, gestureState) {
        let dx;
        let right = -this.state.width;

        if(Math.abs(gestureState.dx)>5) {
            this.disallowScroll && this.disallowScroll();
        }

        this.isRowMove && this.isRowMove();

        if(!this.state.isOpen) {
            dx = gestureState.dx;

            if(dx < 0) {

                if(dx >= right) {
                    let r = right - dx;
                    this._setBtnRightState(new Animated.Value(r));
                } else {
                    this._setBtnRightState(new Animated.Value(0));
                }

                if(dx < 50) {
                    this._setLeftState(new Animated.Value(dx));
                }

            }
        } else {
            dx = right + gestureState.dx;

            if(dx>right) {
                this._setBtnRightState(new Animated.Value(-gestureState.dx));
            }

            if(dx < 50) {
                this._setLeftState(new Animated.Value(dx));
            }

        }

    }

    _setLeftState(val) {
        this.setState({
            left:  val
        })
    }

    _setBtnRightState(val) {
        this.setState({
            btnright: val
        })
    }

    _setHasIdOpenState(bool) {
        this.props.root.setState({
            hasIdOpen: bool
        })
    }

    _setIsOpenState(bool) {
        this.setState({
            isOpen: bool
        });
    }

    _onPanResponderRelease(evt, gestureState) {

        let toValue;
        let isOpen;
        let btnRight;
        let dx;
        let right = -this.state.width;
        let range;

        if(this.state.isOpen || this.props.root.state.hasIdOpen) {
            dx = right + gestureState.dx;
            range = right + 40
        } else {
            dx = gestureState.dx;
            range = -40;
        }

        if(dx<range && dx!== right) {
            toValue = right;
            isOpen = true;
            btnRight = 0;
            this.disallowScroll && this.disallowScroll();
            this.isRowOpen && this.isRowOpen();
            this._setHasIdOpenState(true);
        } else {
            toValue = 0;
            isOpen = false;
            btnRight = right;
            this.allowScroll && this.allowScroll();
            /* 点击其他row关闭openRow */
            this.closeRow && this.closeRow();
        }

        this._setIsOpenState(isOpen);
        this.moving(this.state.btnright, btnRight);
        this.moving(this.state.left, toValue);	

    }

    _onPanResponderTerminate(evt, gestureState) {
        this.props.isTerminate && this.props.isTerminate();
        let right = -this.state.width;

        if(this.state.left._value < -5) {
            this.disallowScroll && this.disallowScroll();
            this.isRowOpen && this.isRowOpen();
            this._setIsOpenState(true);
            this._setHasIdOpenState(true);
            this.moving(this.state.btnright, 0);
            this.moving(this.state.left, right);
        }

        return false;

    }

    moving(k, v) {
        let type = this.props.animationType;
        let duration = this.props.duration
        if(type === 'timing'){
            Animated.timing(k, {
                toValue: v,
                duration: duration
            }).start();
        } else if(type === 'spring') {
            Animated.spring(k, {
                toValue: v,
                duration: duration
            }).start();
        }

    }

    isRowOpen() {
        let root = this.props.root;
        let id = this.props.id;
        if(!root.openRowId)
        root.openRowId = id;
    }

    isRowMove() {
        let root = this.props.root;
        let id = this.props.id;
        if(root.openRowId && root.openRowId !== id) {
            root._dataRow[root.openRowId]._closeRow();
            root.openRowId = '';
        }
    }

    isTerminate() {
        let root = this.props.root;
        let id = this.props.id;
        if(root.openRowId && root.openRowId !== id) {
            root._dataRow[root.openRowId]._closeRow();
        }
        root.openRowId = id;
    }

    closeRow() {
        let root = this.props.root;
        if(root.openRowId) {
            root._dataRow[root.openRowId]._closeRow();
        }
    }

    allowScroll() {
        let root = this.props.root;

        /* 接入原生下拉 */
        root.setState({
            scrollEnable: true
        })

        /* 接入第三方下拉 */
        /* 指定到像相应的scrollView对象 */
        // root.refs.listview.refs.listviewscroll.setState({
        //     scrollEnabled: true
        // });
    }

    disallowScroll() {
        let root = this.props.root;

        /* 接入原生下拉 */
        root.setState({
            scrollEnable: false
        })

        /* 接入第三方下拉 */
        /* 指定到像相应的scrollView对象 */
        // root.refs.listview.refs.listviewscroll.setState({
        //     scrollEnabled: false
        // });
    }

    render() {

        return (
            <View onLayout={(e)=>{this.setState({height:e.nativeEvent.layout.height})}}>
                <View ref='view' style={[styles.containerBox, {backgroundColor:this.props.boxbgColor}]}>

                    <Animated.View style={
                        [styles.container, {
                            backgroundColor: this.props.rowbgColor,
                            left: this.state.left}
                        ]} 
                        {...this._panResponder.panHandlers}>
                        {this.props.children}
                    </Animated.View>

                    <Animated.View style={
                        [styles.deletebtnbox,{
                            width: this.state.width,
                            right: this.state.btnright,
                            height: this.state.height}
                        ]}>
                            {this.props.rightBtn.map((item)=>{

                        return <TouchableHighlight key={item.id} style={[styles.deletebtn, {width: item.width, height: this.state.height, backgroundColor: item.bgColor}]} onPress={item.onPress} underlayColor={item.underlayColor}>
                                {item.text?
                                    <Text style={{color: item.color||null, fontSize: item.fontSize||null}}>{item.text}</Text>
                                    :
                                    item.image?
                                        <Image style={[styles.deleteBut, {width: 50, height: 50}]} source={{uri: item.image}} />
                                        :
                                        null}
                            </TouchableHighlight>							
                        })}
                    </Animated.View>
                </View>
            </View>
        );
    }

}

Swipes.defaultProps = {
    boxbgColor: '#eeeeee',
    rowbgColor: '#ffffff',
    animationType: 'timing',
    duration: 150,
}

let styles = StyleSheet.create({
    containerBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent:'center',
        overflow: 'hidden',
        position: 'relative',
    },
    container: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
        overflow: 'hidden',
    },
    deletebtnbox: {
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
    },
    deletebtn: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})
