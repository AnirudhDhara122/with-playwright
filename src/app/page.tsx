"use client"
import Link from "next/link";
import { useState } from "react";

export default function Page() {
    const [done, setIsDone] = useState<boolean>(false)
    const doSomething = () => {
        setIsDone(true)
    }
    return (
        <div>
            <h1>Hello, Next.js!</h1>
            <button onClick={doSomething}>
                Do Something
            </button>
            <p>
                {done && `Something was done`}
            </p>
            <Link href="/about">about</Link>
        </div>
    )
}