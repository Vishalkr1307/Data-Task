import logo from './logo.svg';
import './App.css';
import AllRoutes from './page/AllRoutes';
import Navbar from './component/Navbar';
import { HStack, Stack } from '@chakra-ui/react';

function App() {
  return (
    <Stack justifyContent={'space-between'} maxH={'100vh'} maxW={'100vw'}>
      <HStack>

      <Navbar/>
      </HStack>
      <HStack>

        <AllRoutes/>
      </HStack>
      
    </Stack>
  );
}

export default App;
