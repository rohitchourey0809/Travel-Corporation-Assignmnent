import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGroup, deleteGroup, updateGroup } from "../redux/actions";
import {
  Box,
  Button,
  Input,
  HStack,
  VStack,
  IconButton,
  useToast,
  Center,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import GroupStatus from "./GroupStatus";

const GroupForm = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const toast = useToast();

  const handleAddGroup = () => {
    if (validateGroup(from, to)) {
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
        description: "Please check the rules.",
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    }
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
    // Rule 1: The entire range of 1-10 should be covered and no group can go outside the range
    if (from < 1 || to > 10) return false;

    // Rule 2: There should not be any gaps between consecutive groups
    const ranges = groups.map((group) => ({ from: group.from, to: group.to }));
    ranges.push({ from: parseInt(from), to: parseInt(to) });
    ranges.sort((a, b) => a.from - b.from);
    for (let i = 0; i < ranges.length - 1; i++) {
      if (ranges[i].to !== ranges[i + 1].from - 1) return false;
    }

    // Rule 3: There should not be overlap between consecutive groups
    for (let i = 0; i < ranges.length - 1; i++) {
      if (ranges[i].to >= ranges[i + 1].from) return false;
    }

    return true;
  };

  return (
    <Box mb={4}>
      <Center>
        <VStack spacing={4} align="stretch" maxWidth={1000}>
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
                justify="space-between"
              >
                <Input
                  type="number"
                  value={group.from === "" ? "" : group.from}
                  onChange={(e) =>
                    handleChange(index, e.target.value, group.to)
                  }
                  placeholder="From"
                  required
                />
                <Input
                  type="number"
                  value={group.to === "" ? "" : group.to}
                  onChange={(e) =>
                    handleChange(index, group.from, e.target.value)
                  }
                  placeholder="To"
                  required
                />
                <IconButton
                  icon={<DeleteIcon />}
                  aria-label="Delete Group"
                  backgroundColor="red"
                  onClick={() => handleDeleteGroup(index)}
                />
              </HStack>
            </motion.div>
          ))}
          <GroupStatus/>
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
            <Button
              backgroundColor="green"
              textColor="white"
              width={60}
              onClick={handleAddGroup}
            >
              Add Group
            </Button>
          </HStack>
        </VStack>
      </Center>
    </Box>
  );
};

export default GroupForm;
