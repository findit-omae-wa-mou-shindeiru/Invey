import { useRouter } from 'next/router'

const FillFormDetail = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <h1>Fill Form Detail</h1>
      <h2>ID: {id}</h2>
    </div>
  );
}

export default FillFormDetail;