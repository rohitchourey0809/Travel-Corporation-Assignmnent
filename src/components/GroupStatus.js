import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatuses } from "../redux/actions";
import {
  Box,
  Heading,
  List,
  ListItem,
  Center,
  Flex,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

const GroupStatus = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups);
  const statuses = useSelector((state) => state.statuses);

  useEffect(() => {
    if (groups.length) {
      groups.forEach((group) => {
        dispatch(fetchStatuses(group));
      });
    }
  }, [groups, dispatch]);

  return (
    <Center>
      <Box width="80%" p={4} borderWidth="1px" borderRadius="md">
        <Heading as="h2" size="md" mb={4} textAlign="center">
          Group Status
        </Heading>
        <Center>
          <Flex direction="column" alignItems="center">
            <Wrap spacing={4} justify="center" textAlign="center">
              {groups.map((group, index) => (
                <WrapItem key={index}>
                  <Box
                    mb={4}
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    width="300px"
                  >
                    <Heading as="h3" size="sm" mb={2} textAlign="center">
                      Group {index + 1}: {group.from === "" ? "" : group.from} -{" "}
                      {group.to}
                    </Heading>
                    <List spacing={2}>
                      {Array.from(
                        { length: group.to - group.from + 1 },
                        (_, i) => (
                          <ListItem key={i}>
                            Item {group.from + i}:{" "}
                            {statuses[group.from + i]?.completed
                              ? "true"
                              : "false"}
                          </ListItem>
                        )
                      )}
                    </List>
                  </Box>
                </WrapItem>
              ))}
            </Wrap>
          </Flex>
        </Center>
      </Box>
    </Center>
  );
};

export default GroupStatus;
