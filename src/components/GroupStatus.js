import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatuses } from "../redux/actions";
import {
  Box,
  Heading,
  List,
  ListItem,
  Center,
  Grid,
  GridItem,
  Text,
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
        <Grid templateColumns="1fr 2fr" gap={6}>
          {groups.map((group, index) => (
            <React.Fragment key={index}>
              <GridItem>
                <Box
                  mb={4}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  textAlign="center"
                >
                  <Heading as="h3" size="sm" mb={2}>
                    Group {index + 1}: {group.from} - {group.to}
                  </Heading>
                </Box>
              </GridItem>
              <GridItem>
                <Box
                  mb={4}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  textAlign="center"
                >
                  <List spacing={2}>
                    {Array.from(
                      { length: group.to - group.from + 1 },
                      (_, i) => (
                        <ListItem key={i}>
                          <Text>
                            Item {group.from + i}:{" "}
                            {statuses[group.from + i]?.completed
                              ? "true"
                              : "false"}
                          </Text>
                        </ListItem>
                      )
                    )}
                  </List>
                </Box>
              </GridItem>
            </React.Fragment>
          ))}
        </Grid>
      </Box>
    </Center>
  );
};

export default GroupStatus;
