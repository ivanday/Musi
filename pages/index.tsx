import Head from 'next/head'
import { Inter } from '@next/font/google'
import { Container, Box, Text } from '@chakra-ui/react'
import { NavBar } from '../components/NavBar'

const inter = Inter({ subsets: ['latin'] })

const innerBoxStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    boxSize: 'full',
    color: 'white',
    textShadow: '0 0 20px black',
    fontWeight: 'bold',
    fontSize: '20px',
  }


export default function Home() {

  return (
    <>
      <Head>
        <title>Blue-Ocean</title>
      </Head>

      <Box
        height="100vh"
        backgroundImage="url('animatedBackground.svg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        >
        <Container>
          <NavBar/>
        </Container>
        <Box
          height="50%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Container
            border="1px"
            width="200px"
            height="200px"
            bgColor="transparent"
          >
          </Container>
          <Container border="1px" textStyle="center">
            <Text textAlign="center">Possible Slogan</Text>
          </Container>


        </Box>

      </Box>
    </>
  )
}
