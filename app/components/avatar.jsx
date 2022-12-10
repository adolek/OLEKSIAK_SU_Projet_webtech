import md5 from 'md5'

const BASE_URL = "https://www.gravatar.com/gravatar"

export default function Avatar({email})
{
    const hash = md5(email.trim().toLowerCase())
    console.log(hash)
    return(<img className="rounded-full" src={'${BASE_URL}/${hash}'}/>)
}
