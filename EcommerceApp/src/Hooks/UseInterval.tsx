import { useEffect, useRef } from "react";
import { useIsomorphicLayoutEffect } from "usehooks-ts"

export function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback)
    useIsomorphicLayoutEffect(() => {
        savedCallback.current = callback
    }, [callback])
    useEffect (() => {
        if(delay === null){
            return
        } 
        const id = setInterval(() => {
            savedCallback.current()
        }, delay)
        return () => {
            clearInterval
        }
    }, [delay])
}