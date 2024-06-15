import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addGroup,
  deleteGroup,
  updateGroup,
  fetchStatuses,
} from "../redux/actions";
import {
  Box,
  Button,
  Input,
  HStack,
  VStack,
  IconButton,
  useToast,
  Center,
  Grid,
  GridItem,
  Heading,
  Text,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import { DeleteIcon, ArrowForwardIcon, AddIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

const GroupFormAndStatus = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups);
  const statuses = useSelector((state) => state.statuses);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [validationError, setValidationError] = useState("");
  const toast = useToast();

  useEffect(() => {
    if (groups.length && !validationError) {
      groups.forEach((group) => {
        dispatch(fetchStatuses(group));
      });
    }
  }, [groups, dispatch, validationError]);

  useEffect(() => {
    const error = validateGroups(groups);
    setValidationError(error);
  }, [groups]);

  const handleAddGroup = () => {
    const error = validateGroup(parseInt(from), parseInt(to));
    if (!error) {
      dispatch(addGroup({ from: parseInt(from), to: parseInt(to) }));
      setFrom("");
      setTo("");
      toast({
        title: "Group Added",
        status: "success",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    } else {
      toast({
        title: "Invalid Group Range",
        description: error,
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    }
    setShowInput(false);
  };

  const handleDeleteGroup = (index) => {
    dispatch(deleteGroup(index));
    toast({
      title: "Group Deleted",
      status: "warning",
      duration: 3000,
      position: "top-right",
      isClosable: true,
    });
  };

  const handleChange = (index, newFrom, newTo) => {
    const updatedFrom = newFrom === "" ? "" : parseInt(newFrom);
    const updatedTo = newTo === "" ? "" : parseInt(newTo);
    dispatch(updateGroup(index, { from: updatedFrom, to: updatedTo }));
  };

 const validateGroup = (from, to) => {
   if (from < 1 || to > 10) return "Group range must be between 1 and 10.";
   if (from >= to) return "'From' value must be less than 'To' value.";

   const ranges = [...groups, { from, to }].sort((a, b) => a.from - b.from);

   if (ranges[0].from !== 1) return "Groups must start from 1.";
   if (ranges[ranges.length - 1].to > 10) return "Groups must end at 10.";

   for (let i = 0; i < ranges.length - 1; i++) {
     if (ranges[i].to + 1 !== ranges[i + 1].from) {
       return "No gaps are allowed between groups.";
     }
   }

   for (let i = 0; i < ranges.length - 1; i++) {
     if (ranges[i].to >= ranges[i + 1].from) {
       return "No overlap is allowed between groups.";
     }
   }

   return "";
 };


  const validateGroups = (groups) => {
    if (!groups.length) return "";

    const ranges = [...groups].sort((a, b) => a.from - b.from);

    if (ranges[0].from !== 1) return "Groups must start from 1.";
    if (ranges[ranges.length - 1].to !== 10) return "Groups must end at 10.";

    for (let i = 0; i < ranges.length - 1; i++) {
      if (ranges[i].to + 1 !== ranges[i + 1].from) {
        return "No gaps are allowed between groups.";
      }
    }

    for (let i = 0; i < ranges.length - 1; i++) {
      if (ranges[i].to >= ranges[i + 1].from) {
        return "No overlap is allowed between groups.";
      }
    }

    return "";
  };

  const inputStackDirection = useBreakpointValue({ base: "column", md: "row" });
 

  return (
    <Box mb={4} padding={20}>
      <Center>
        <Grid templateColumns="1fr 2fr" gap={6} width="100%">
          <GridItem>
            <VStack spacing={4} align="stretch" maxWidth={500}>
              {groups.map((group, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <HStack
                    spacing={4}
                    alignItems="center"
                    borderWidth="1px"
                    borderRadius="md"
                    p={2}
                    gap={0}
                    justify="space-between"
                    flexDirection={inputStackDirection}
                  >
                    <IconButton
                      icon={<DeleteIcon />}
                      aria-label="Delete Group"
                      backgroundColor="white"
                      color="blue.500"
                      onClick={() => handleDeleteGroup(index)}
                    />
                    <Box
                      p={4}
                      borderWidth="1px"
                      textAlign="center"
                      width={"100px"}
                    >
                      <Heading size="sm">Group{index + 1}</Heading>
                    </Box>
                    <Input
                      type="number"
                      value={group.from === "" ? "" : group.from}
                      onChange={(e) =>
                        handleChange(index, e.target.value, group.to)
                      }
                      placeholder="From"
                      required
                    />
                    <ArrowForwardIcon />
                    <Input
                      type="number"
                      value={group.to === "" ? "" : group.to}
                      onChange={(e) =>
                        handleChange(index, group.from, e.target.value)
                      }
                      placeholder="To"
                      required
                    />
                  </HStack>
                </motion.div>
              ))}
              {showInput && (
                <HStack spacing={4} alignItems="center" justify="space-between">
                  <Input
                    type="number"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="From"
                    required
                  />
                  <Input
                    type="number"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="To"
                    required
                  />
                  <IconButton
                    icon={<AddIcon />}
                    aria-label="Add Group"
                    backgroundColor="green.500"
                    color="white"
                    onClick={handleAddGroup}
                  />
                </HStack>
              )}
              {!showInput && (
                <IconButton
                  icon={<AddIcon />}
                  aria-label="Add Group"
                  backgroundColor="green.500"
                  color="white"
                  onClick={() => setShowInput(true)}
                />
              )}
              <Button
                backgroundColor="blue.500"
                textColor="white"
                onClick={() => setShowStatus(!showStatus)}
                isDisabled={!!validationError}
              >
                {showStatus ? "Hide Status" : "Show Status"}
              </Button>
              {validationError && (
                <Text color="red.500">{validationError}</Text>
              )}
            </VStack>
          </GridItem>
          {showStatus && !validationError && (
            <GridItem>
              <Box width="100%" p={2} borderWidth="1px" borderRadius="md">
                <Grid templateColumns="1fr">
                  {groups.map((group, index) => (
                    <React.Fragment key={index}>
                      <Flex direction="column">
                        <Box
                          mb={4}
                          p={4}
                          borderWidth="1px"
                          borderRadius="md"
                          textAlign="center"
                        >
                          <Grid templateColumns="repeat(auto-fit, minmax(100px, 1fr))">
                            {Array.from(
                              { length: group.to - group.from + 1 },
                              (_, i) => group.from + i
                            ).map((item) => (
                              <Box key={item}>
                                <Heading size="sm"> ({item})</Heading>
                                <Text>
                                  {statuses[item]?.completed
                                    ? "True"
                                    : "False"}
                                </Text>
                              </Box>
                            ))}
                          </Grid>
                        </Box>
                      </Flex>
                    </React.Fragment>
                  ))}
                </Grid>
              </Box>
            </GridItem>
          )}
        </Grid>
      </Center>
    </Box>
  );
};

export default GroupFormAndStatus;
