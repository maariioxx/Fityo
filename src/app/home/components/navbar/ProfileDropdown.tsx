import { Dropdown, DropdownHeader, DropdownItem } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import { Session } from 'next-auth';
import LogOut from './LogOut';
import { getUser } from '@/lib/utils';

export default async function ProfileDropdown({
  session,
}: {
  session: Session;
}) {
  const user = await getUser();
  console.log(user);
  return (
    <Dropdown
      label={
        typeof session.user?.image !== 'undefined' ? (
          <Image
            src={session?.user?.image!}
            alt="User logo"
            width={48}
            height={48}
            className="rounded-xl"
          />
        ) : (
          <h2 className="text-xl text-white">{user?.username}</h2>
        )
      }
      inline
      arrowIcon={false}
      dismissOnClick={false}
      className="transitiona-all ease-in-out"
    >
      <DropdownHeader className="flex flex-col transition-all ease-in-out">
        <span>{session?.user?.name}</span>
        <span>{session?.user?.email}</span>
      </DropdownHeader>
      <DropdownItem>
        <Link href="/profile">Profile</Link>
      </DropdownItem>
      <DropdownItem className="hover:bg-red-300 focus:bg-red-300">
        <LogOut />
      </DropdownItem>
    </Dropdown>
  );
}
