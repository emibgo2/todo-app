import React from "react";
import styled from "styled-components/native";
import { Dimensions ,useWindowDimensions} from "react-native";
import propTypes from "prop-types";


const StyledInput = styled.TextInput.attrs(({theme}) => ({
    placeholderTextColor: theme.main
}))`
    width: ${({width}) => width -40};
    height: 60px;
    margin: 3px 0;
    padding: 15px 20px;
    border-radius: 10px;
    font-size: 25px;
    background-color: ${({theme}) => theme.itemBackground};
    color: ${({theme}) => theme.text};
`;


const Input = ({placeholder,value,onChangeText,onSubmitEditing}) => {
    const width = useWindowDimensions().width;
    return <StyledInput  
    width={width} 
    placeholder={placeholder}
    maxLength={50}
    autoCapitalize="none"
    autoCorrect ={false}
    returnKeyType = "done"
    value={value}
    onChangeText={onChangeText}
    onSubmitEditing={onSubmitEditing}
    />
}

// const UpdateInput = () => {
//     const width = useWindowDimensions().width;
//     return <StyledInput  
//     width={width} 
//     placeholder={placeholder}
//     maxLength={50}
//     autoCapitalize="none"
//     autoCorrect ={false}
//     returnKeyType = "done"
//     value={value}
//     onChangeText={onChangeText}
//     onSubmitEditing={onSubmitEditing}
//     />
// }

Input.propTypes = {
    placeholder: propTypes.string,
    value: propTypes.string.isRequired,
    onChangeText: propTypes.func.isRequired,
    onSubmitEditing: propTypes.func.isRequired
}

export default Input;