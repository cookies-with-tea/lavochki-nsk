import { ElementType, Suspense } from 'react'

export const SLoadable = (Component: ElementType): any => {
  return () => (props: any) => {
    <Suspense
      fallback={ <div>Loading</div> }
      >
        <Component {...props} />
      </Suspense>
  }
}