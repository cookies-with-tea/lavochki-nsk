'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
export const useControlled = ({ controlled, default: defaultProp, name, state = 'value' }) => {
   // isControlled is ignored in the hook dependency lists as it should never change.
   const { current: isControlled } = useRef(controlled !== undefined)
   const [valueState, setValue] = useState(defaultProp)
   const value = isControlled ? controlled : valueState

   if (process.env.NODE_ENV !== 'production') {
     // eslint-disable-next-line react-hooks/rules-of-hooks
     useEffect(() => {
       if (isControlled !== (controlled !== undefined)) {
         console.error('Error')
       }
     }, [state, name, controlled])

     // eslint-disable-next-line react-hooks/rules-of-hooks
     const { current: defaultValue } = useRef(defaultProp)

     // eslint-disable-next-line react-hooks/rules-of-hooks
     useEffect(() => {
       if (!isControlled && defaultValue !== defaultProp) {
         console.error('Error' )
       }
     }, [JSON.stringify(defaultProp)])
   }

   const setValueIfUncontrolled = useCallback((newValue) => {
     if (!isControlled) {
       setValue(newValue)
     }
   }, [])

   return [value, setValueIfUncontrolled]
}
