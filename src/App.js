import React from "react";
import { ChakraProvider, Box, Heading, Center } from "@chakra-ui/react";
import GroupForm from "./components/GroupForm";
import GroupStatus from "./components/GroupStatus";
import { Provider } from "react-redux";
import store from "./redux/store";
import GroupFormAndStatus from "./components/GroupFormAndStatus";

const App = () => {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <Box p={4}>
          {/* <Center>
            <Heading mb={4}>Group Status Viewer</Heading>
          </Center>
          <GroupForm /> */}
          {/* <GroupStatus /> */}
          <GroupFormAndStatus />
        </Box>
      </Provider>
    </ChakraProvider>
  );
};

export default App;
