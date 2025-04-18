"use client";

import { useEffect, useState } from "react";
import { getOnlineContacts } from "@/app/api/actions/contacts/getOnlineContacts";
import Image from "next/image";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";

interface OnlineUser {
  id: string;
  name: string;
  hashtag: string | null;
  avatarPhoto: string | null;
  lastSeenAt: Date | null;
}

export default function OnlineUsers() {
  const [users, setUsers] = useState<OnlineUser[]>([]);

  const router = useRouter()

  useEffect(() => {
    async function fetchOnlineUsers() {
      const data = await getOnlineContacts();
      setUsers(data);
    }

    fetchOnlineUsers();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {users.length === 0 ? (
        <p className="text-sm text-sky-900">No contacts online</p>
      ) : (
        users.map((user) => (
          <div
            key={user.id}
            onClick={() => router.push(`/contacts/${user.name}/${user.hashtag}`)}
            className="flex items-center gap-4 p-2 rounded-xl hover:bg-sky-100 transition-all cursor-pointer"
          >
            <div className="relative w-[50px] h-[50px]">
              {user.avatarPhoto ? (
                <Image
                  src={user.avatarPhoto}
                  alt="avatar"
                  width={50}
                  height={50}
                  className="rounded-full object-cover w-full h-full border-2 border-green-400"
                />
              ) : (
                <div className="w-[50px] h-[50px] rounded-full bg-gray-300 flex items-center justify-center border-2 border-green-400">
                  <User className="text-gray-500 w-6 h-6" />
                </div>
              )}
            </div>
            <p className="text-sky-900 font-medium text-sm">
              {user.name}
              {user.hashtag && `#${user.hashtag}`}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
