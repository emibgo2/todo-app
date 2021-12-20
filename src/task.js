import React from "react";
import styled from "styled-components/native";
import propTypes from "prop-types";
import { icons } from "./icons";
import IconButton from "./component/IconButton";
// import Input from "./component/input";
const Container = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: ${({theme}) => theme.itemBackground};
    border-radius: 10px;
    padding: 5px;
    margin: 3px 0;
`;

const Contents = styled.Text`
    flex: 1;
    font-size: 24px;
    color: ${({theme, completed}) => completed ? theme.done : theme.text};
`;

const Task = ({item,deleteTask,toggleTask,updateTask}) => {
    return (
        <Container>
            <IconButton 
            icon={item.completed ? icons.check : icons.uncheck}
            item={item}
            onPress={toggleTask}
            />
            <Contents completed={item.completed}>{item.text}</Contents>
            {item.completed || <IconButton icon={icons.edit}  item={item} onPress={updateTask}/>}
            <IconButton 
            icon={icons.delete}
            item={item}
            onPress={deleteTask}
            />

        </Container>
    )
}

Task.propTypes = {
    item: propTypes.object.isRequired,
    deleteTask: propTypes.func.isRequired,
    toggleTask: propTypes.func.isRequired
}
export default Task;