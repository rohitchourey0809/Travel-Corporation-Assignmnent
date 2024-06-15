import React from "react";
import { ChakraProvider, Box, Heading, Center } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./redux/store";
import GroupFormAndStatus from "./components/GroupFormAndStatus";

const App = () => {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <Box p={4}>
          <Center>
            <Heading>Group Status</Heading>
          </Center>
          <GroupFormAndStatus />
        </Box>
      </Provider>
    </ChakraProvider>
  );
};

export default App;
