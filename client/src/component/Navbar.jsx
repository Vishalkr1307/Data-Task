import { AddIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Box,Text, Image,Flex, HStack, IconButton, useColorModeValue, useDisclosure, Stack, Input, FormControl, Button, Menu, MenuButton, Avatar, MenuItem, MenuList, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody } from '@chakra-ui/react'
import React from 'react'
import SideBar from './SideBar'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Searchbar from './Searchbar'

const NavLink=({children})=>{
    return (
        <Box as='a'  px={2} py={4} rounded={'md'} _hover={{
            textDecor:'none',
            bg:useColorModeValue("gray.200",'gray.700')
        }} href={`/task/${children}`}>{children}</Box>
    )

}

const Navbar = () => {
    const bgColor=useColorModeValue("gray.50","gray.900")
    const {isOpen,onClose,onOpen}=useDisclosure()
    const {isAuth,user}=useSelector((store)=>store.auth)
    const navigate=useNavigate()
    const location=useLocation()
    

    const handleLogin=(val)=>{
        if(val=="login"){
            navigate("/auth/login",{replace:true,state:{from:location}})
        }
        else if(val=="register"){
            navigate("/auth/register",{replace:true,state:{from:location}})

        }

    }
    

  return (
    <Box minH={'10vh'} minW={'100vw'} maxW={'100vw'} display={'flex'} flexDirection={'column'} justifyContent={'center'} bg={bgColor} rounded={'xl'} >
        <Flex justifyContent={'space-between'} align={'center'} px={8} h={16}>
            <IconButton size={'md'} icon={isOpen?<CloseIcon/>:<HamburgerIcon/>} onClick={isOpen?onClose:onOpen} display={{md:'none'}}/>
            <HStack>
                <Link to={'/'}>
                <Image boxSize={'100px'} alt='Update.com'  src={"https://img.freepik.com/free-vector/colorful-letter-gradient-logo-design_474888-2309.jpg?size=626&ext=jpg"}/>
                </Link>
                <HStack spacing={4} display={{base:"none",md:"flex"}}>
                    <NavLink>addTask</NavLink>
                    <NavLink>getTask</NavLink>
                </HStack>
            </HStack>
            <Stack width={{base:"40vw",md:"40vw"}} >
               
                    <Searchbar/>
               
            </Stack>
            <HStack>
                {isAuth?null:<Button variant={'solid'} display={{base:"none",md:"flex"}} colorScheme='teal' onClick={()=>handleLogin("login")}>Login</Button>}
                {isAuth?null:<Button variant={'solid'} display={{base:"none",md:"flex"}} colorScheme='teal' size={'md'} mr={4} onClick={()=>handleLogin("register")} leftIcon={<AddIcon/>}>SignUp</Button>}
                {isAuth?<Stack display={{base:"block"}}>

                <Menu >
                    <MenuButton as={Button} size={'xl'} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}><Avatar size={'md'}/></MenuButton>
                    <MenuList>
                        <MenuItem>{user?.name ||""}</MenuItem>
                        <MenuItem>{user?.email ||""}</MenuItem>
                        <MenuItem onClick={()=>{
                            localStorage.clear("token")
                            localStorage.clear("user")
                            navigate("/auth/login",{replace:true,state:{from:location}})
                        }}>Logout</MenuItem>
                    </MenuList>
                </Menu>
                </Stack>:null}

            </HStack>

        </Flex>
        <Stack>

        {isOpen?<Box>
            <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerHeader borderBottomWidth={'1px'}>Task value</DrawerHeader>
                    <DrawerBody display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
                        <Stack>
                            <Button colorScheme='teal'><NavLink>addTask</NavLink></Button>
                            <Button colorScheme='teal'><NavLink>getTask</NavLink></Button>
                            <SideBar/>
                        </Stack>
                        {/* <Stack>
                            <Button colorScheme='teal'>LogOut</Button>
                        </Stack> */}
                    </DrawerBody>
                </DrawerContent>

            {/* <Stack display={{md:"none" ,base:"flex"}} direction={'column'} maxW={'20vw'}>
                <NavLink>addTask</NavLink>
                <NavLink>getTask</NavLink>
                <NavLink>getTask</NavLink>
                <NavLink>getTask</NavLink>
            </Stack> */}
            </Drawer>
        </Box>:null}
        </Stack>
    </Box>
  )
}

export default Navbar
