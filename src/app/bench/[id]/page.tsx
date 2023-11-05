import { Metadata } from 'next'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
export async function generateMetadata({ params }: Props): Promise<Promise<Metadata> | any> {
  const id = params.id

    return {
    id,
  }
}

// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata
// ): Promise<Promise<Metadata> | any> {
//   // read route params
//   const id = params.id
//
//   // // fetch data
//   // const product = await fetch(`https://.../${id}`).then((res) => res.json())
//   //
//   // // optionally access and extend (rather than replace) parent metadata
//   // const previousImages = (await parent).openGraph?.images || []
//   //
//   // return {
//   //   title: product.title,
//   //   openGraph: {
//   //     images: ['/some-specific-page-image.jpg', ...previousImages],
//   //   },
//   // }
//
//   return {
//     id,
//   }
// }
export default function DetailBench({ params }: Props) {
  return (
    <h1>Bench №{params.id}</h1>
  )
}
