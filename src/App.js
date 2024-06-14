import React from "react";
import { ChakraProvider, Box, Heading, Center } from "@chakra-ui/react";
import GroupForm from "./components/GroupForm";
import GroupStatus from "./components/GroupStatus";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = () => {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <Box p={4}>
          <Center>
            <Heading mb={4}>Todo List Status Viewer</Heading>
          </Center>
          <GroupForm />
          <GroupStatus />
        </Box>
      </Provider>
    </ChakraProvider>
  );
};

export default App;
