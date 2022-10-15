import Link from 'next/link'


function Menu() {
  return (
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/about">
          <a>About</a>
        </Link>
      </li>
      <li>
        <Link href="/articles">
          <a>Articles</a>
        </Link>
      </li>
      <li>
        <Link href="/contacts">
          <a>Contacts</a>
        </Link>
      </li>
    </ul>
  )
}

export default Menu;
  