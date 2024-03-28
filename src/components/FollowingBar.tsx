"use client";

import { DetailUser } from "@/model/user";
import useSWR from "swr";
import PropagateLoader from "react-spinners/PropagateLoader";
import Link from "next/link";
import Avatar from "./Avatar";
import ScrollableBar from "./ui/ScrollaBar";

export default function FollowingBar() {
  const { data, isLoading: loading, error } = useSWR<DetailUser>("/api/me");
  console.log(data?.following);
  const users = data?.following && [
    ...data?.following,
    ...data?.following,
    ...data?.following,
  ];
  return (
    <section className="w-full flex justify-center items-center p-4 shadow-sm shadow-neutral-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto">
      {loading ? (
        <PropagateLoader size={8} color="red" />
      ) : (
        (!users || users.length === 0) && <p>{`You don't have following`}</p>
      )}
      {users && users.length > 0 && (
        <ScrollableBar>
          {users.map(({ image, username }) => (
            <Link
              key={username}
              className="flex flex-col items-center w-20"
              href={`/user/${username}`}
            >
              <Avatar image={image} highlight />
              <p className="w-full text-center text-sm text-ellipsis overflow-hidden">
                {username}
              </p>
            </Link>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
}
