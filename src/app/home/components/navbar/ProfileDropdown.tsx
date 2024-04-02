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
  return (
    <Dropdown
      label={<h2 className="text-xl text-white">{user?.username}</h2>}
      inline
      arrowIcon={false}
      dismissOnClick={false}
      className="transitiona-all ease-in-out"
    >
      <DropdownHeader className="flex flex-col transition-all ease-in-out">
        <span>{session?.user?.name}</span>
        <span>{session?.user?.email}</span>
      </DropdownHeader>
      <Link href="/home/editprofile">
        <DropdownItem>Profile</DropdownItem>
      </Link>
      <DropdownItem className="hover:bg-red-300 focus:bg-red-300 dark:hover:bg-red-900 dark:focus:bg-red-900">
        <LogOut />
      </DropdownItem>
    </Dropdown>
  );
}
