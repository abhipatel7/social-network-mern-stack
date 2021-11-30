import { FC } from 'react';
import Link from 'next/link';

const NavBar: FC = () => {
  return (
    <nav
      className="nav d-flex justify-content-between"
      style={{ backgroundColor: 'blue' }}
    >
      <Link href="/">
        <a className="nav-link text-light logo">Home</a>
      </Link>
      <Link href="/login">
        <a className="nav-link text-light logo">Login</a>
      </Link>
      <Link href="/register">
        <a className="nav-link text-light logo">Register</a>
      </Link>
    </nav>
  );
};

export default NavBar;
