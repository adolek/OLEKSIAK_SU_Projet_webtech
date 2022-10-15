import { useRouter } from 'next/router'
import data from '../data'


const Article = () => {
  const router = useRouter()
  const { aid } = router.query

  return (
        <p>id : {aid}</p>
  );
}

export default Article