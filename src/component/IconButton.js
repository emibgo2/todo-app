import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity,View } from "react-native";
import propTypes from "prop-types";
import { icons } from "../icons.js"

// Image 버전차이
const Icon = styled.ImageBackground ` 
    width: 30px;
    height: 30px;
    margin: 10px;
    `;
    /* tint-color: ${({theme,completed}) => completed ? theme.done : theme.text}; */

const IconButton = ({icon, onPress,item}) => {
    const _onPress = () => {
        onPress(item.id);
    }
    return (
        <TouchableOpacity onPress={_onPress}>
            <View>
                <Icon source={icon} comleted={item.comleted} ></Icon>
            </View>
        </TouchableOpacity>
    )
};

IconButton.defaultProps = {
    item: {completed: false}
}

IconButton.propTypes = {
    icon: propTypes.oneOf(Object.values(icons)).isRequired,
    onPress: propTypes.func,
    item: propTypes.object
}

export default IconButton;