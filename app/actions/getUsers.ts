import prisma from '@/app/libs/prismadb'
import getSession from './getSession'

const getUser = async () => {
  const session = await getSession()

  if (!session?.user?.email) {
    return []
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    })

    return users
  } catch (err: any) {
    return []
  }
}

export default getUser
