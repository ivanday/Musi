import { FormControl, Button, Input, Stack, Heading, StackDivider } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { useState } from 'react'
import { UserComment } from 'components'

declare interface CommentData {
  userId: number,
  text: string,
  date: string,
  users: {
  name: string,
  },
}

export const CommentSection = ({ comments, postId }:any) => {


  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const postCommentHandler = () => {
    setSubmitting(true)
    let data = {
      'postId': postId,
      'text': comment
    }
    console.log(data)
    fetch('/api/createComment', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then((response) => {
        console.log(response)
        setSubmitting(false)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
      <Card w='40rem'>
        <CardHeader>
          <Heading size='md'>Comments</Heading>
        </CardHeader>
        <CardBody mt='-1.5rem'>
          <Stack divider={<StackDivider/>} spacing='3'>
            {comments?.map((comment:CommentData, index:number) => {
              return <UserComment user={comment.userId} text={comment.text} date={comment.date} key={index} name={comment.users.name}/>
            })}
            <StackDivider/>
          </Stack>
        </CardBody>

        <CardFooter mt='-2rem'>
          <FormControl>
            <Input onChange={(e) => setComment(e.target.value)} placeholder='Post a new comment!'></Input>
          </FormControl>
          <Button onClick={postCommentHandler} isLoading={submitting} alignSelf='flex-end'> Submit </Button>
        </CardFooter>
      </Card>
  )
}