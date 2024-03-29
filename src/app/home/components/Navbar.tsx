import { auth } from '@/auth/auth';
import NavbarContainer from './navbar/NavbarContainer';
import ProfileDropdown from './navbar/ProfileDropdown';

export default async function Navbar() {
  const session = await auth();

  return (
    <NavbarContainer>
      <ProfileDropdown session={session!} />
    </NavbarContainer>
  );
}
