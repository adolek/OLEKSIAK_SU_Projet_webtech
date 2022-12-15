/* import md5 from 'md5'

const BASE_URL = "http://www.gravatar.com/avatar"

export default function Avatar({email})
{
    const hash = md5(email.trim().toLowerCase())
    console.log(hash)
    return(<div><img className="rounded-full" src={'${BASE_URL}/${hash}?d=identicon'}/>
    {hash}</div>)
}*/

import gravatar from 'gravatar';

export default function Avatar({email}) {
  const avatarUrl = gravatar.url(email, {
    s: '200',  
    d: 'identicon'    
  });

  return (
    <img src={avatarUrl} alt="Gravatar" className="rounded-full"/>
  );
}