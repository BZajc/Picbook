"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { isUserOnline } from "@/lib/isUserOnline";

export async function getOnlineContacts() {
  const session = await auth();
  if (!session?.user?.id) return [];

  const userId = session.user.id;

  // Pobierz kontakty zaakceptowane przez obie strony
  const contacts = await prisma.contact.findMany({
    where: {
      OR: [
        { senderId: userId, status: "accepted" },
        { receiverId: userId, status: "accepted" },
      ],
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          hashtag: true,
          avatarPhoto: true,
          lastSeenAt: true,
        },
      },
      receiver: {
        select: {
          id: true,
          name: true,
          hashtag: true,
          avatarPhoto: true,
          lastSeenAt: true,
        },
      },
    },
  });

  // Wyciągnij drugą stronę relacji
  const onlineContacts = contacts
    .map((c) => (c.senderId === userId ? c.receiver : c.sender))
    .filter((user) => isUserOnline(user.lastSeenAt));

  return onlineContacts;
}
