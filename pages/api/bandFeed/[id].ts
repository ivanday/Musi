import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/Prisma'

type Comment = {
  name: string
  profile_picture: string
  text: string
  date: string
}

type Post = {
  name: string
  text: string
  audio: string
  pdf: string
  date: string
  comments: Comment[]
}

type Member = {
  id: number
  bandId: number
  userId: number
  name: string
  role: string
}

type Band = {
  id: number
  name: string
  image: string
  description: string
  posts: Post[]
  roles: Member[]
}

type WrongRequest = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Band | WrongRequest>
) {
  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Only GET requests allowed!' })
    res.end()
  } else {
    //this request will take in a band name, query db for the band id, then query for posts and users related to that band id
    const bandData = await prisma.bands.findUnique({
      where: {
        id: parseInt(req.query.id)
      },
      include: {
        roles: {
          include: {
            users: {
              select: {
                picture: true
              }
            }
          }
        },
        posts: {
          orderBy: { id: 'desc' },
          include: {
            comments: {
              include: {
                users: {
                  select: {
                    name: true,
                    picture: true
                  }
                }
              }
            }
          }
        }
      }
    })

    ;(BigInt.prototype as any).toJSON = function () {
      return Number(this)
    }
    if (bandData) {
      res.send(bandData)
      res.end()
    }
    return res.status(404).end()
  }
}
