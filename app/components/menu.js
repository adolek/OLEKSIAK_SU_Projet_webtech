import Link from 'next/link'


function Menu() {
  return (
<nav class="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg">
  <div class="container-fluid w-full flex flex-wrap items-center justify-between px-6">
    <div class="container-fluid">
      <a class="text-xl text-black" href="/">Home</a>
    </div>
    <div class="container-fluid">
      <a class="text-xl text-black" href="/about">About</a>
    </div>
    <div class="container-fluid">
      <a class="text-xl text-black" href="/articles">Articles</a>
    </div>
    <div class="container-fluid">
      <a class="text-xl text-black" href="/contacts">Contacts</a>
    </div>
  </div>
</nav>
    
  )
}

export default Menu;
  