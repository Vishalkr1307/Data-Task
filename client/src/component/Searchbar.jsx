import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import styled from "styled-components";
import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../redux/store";
import { allTaskData, getTaskData } from "../redux/app/action";
import { Link } from "react-router-dom";
const Searchbar = () => {
  const [text, setText] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const { task, allTask, loading, error } = useSelector((store) => store.app);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setText(e.target.value);
    setSuggestionLoading(true);
  };
  const handleCross = () => {
    setText("");
  };
  useEffect(() => {
    dispatch(allTaskData());
  }, [dispatch]);
  useEffect(() => {
    if (text == "") {
      setSuggestion([]);
    } else {
      const newSuggestion = allTask
        ?.filter((item) =>
          item.tittle.toLowerCase().indexOf(text) != "-1" ? true : false
        )
        .map((item) => item);
      setSuggestion(newSuggestion);
      setTimeout(() => {
        setSuggestionLoading(false);
      }, 3000);
    }
  }, [text]);

  return (
    <Stack>
      <Stack spacing={4}>
        <InputGroup>
          <InputLeftElement>
            <CiSearch size={"lg"} />
          </InputLeftElement>
          <Input
            value={text}
            placeholder="search Task"
            variant="flushed"
            onChange={handleChange}
          />
          <InputRightElement>
            {text && (
              <IconButton
                icon={<SmallCloseIcon />}
                onClick={handleCross}
                variant={"ghost"}
              />
            )}
            {suggestionLoading && <Spinner />}
          </InputRightElement>
        </InputGroup>
      </Stack>
      <Stack>
        {suggestion.length > 0 && (
          <Stack>
            {suggestion.map((item, ind) => (
            <Link to={`/task/updateTask/${item._id}`} key={ind}>
              <Stack
                direction={"row"}
                px={6}
                justify={"space-between"}
                align={"center"}
                cursor={'pointer'}
                
              >
                <Text>{item.tittle}</Text>
                <Heading fontSize={15}>{item.tasks_status}</Heading>
              </Stack>
                </Link>
            ))}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

const showBox = styled.div`
  display: flex;
`;

const SuggestionBox = styled.div`
  border: 1px solid black;
  width: 40vw;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  max-height: 300px;
`;

const SearchWrapper = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  align-items: center;
  width: 40vw;
  margin: auto;
  padding: 10px 30px;
  position: fixed;
  /* margin-bottom: 10px; */
`;
// const Image=styled.img`
//     height: 20px;
//     margin-left: -20px;
//     margin-top: 4px;
// `
// const Input=styled.input`
//     border: none;
//     outline: none;
//     font-size: 20px;
//     margin-left: 10px;
//     width: 90%;

// `
// const RightSide = styled.div`
//   display: flex;
//   align-items: center;
// `;
const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  width: 20px;
  height: 20px;

  & .path {
    stroke: #5652bf;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

export default Searchbar;
