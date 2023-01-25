import { Flex, Heading, Stack } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { BandModal, DarkMode, HomeButton, Login, MailBox, RecordingModal, SignOut } from 'components'

declare interface NavBarProps {
  color?: string
}

export const NavBar = ({ color }: NavBarProps) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  // user is not logged in
  if (status === 'unauthenticated' || !session) {
    return (
      <Flex
        w="100vw"
        justifyContent="space-between"
        p={5}
        bg="#5e5e5e33"
        backdropFilter="auto"
        backdropBlur="6px"
        marginTop="0px"
      >
        <Heading color={color}>
          <Link href="/">Musi</Link>
        </Heading>
        <Stack direction="row">
          <Login />
          <DarkMode />
        </Stack>
      </Flex>
    )
  }

  return (
    <Flex
      justifyContent="space-between"
      p={5}
      bg="#5e5e5e33"
      backdropFilter="auto"
      backdropBlur="6px"
    >
      <Heading color={color}>
        <Link href="/">Musi</Link>
      </Heading>
      <Stack direction="row">
        <HomeButton />
        <BandModal />
        <RecordingModal />
        <SignOut />
        <DarkMode />
        {router.pathname === '/personal' && <MailBox />}
      </Stack>
    </Flex>
  )
}
