
import { Facade } from "@koksmat/facade"
import Link from "next/link"
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  const facade = Facade.getInstance()

  return (
    <div>




      <div className='flex p-10'>
        <Link className='p-3' href={"/"}>Home</Link>
        <Link className='p-3' href={"/tests"}>Tests</Link>
      </div>




      <div className="flex">

        <div className="p-4">
         
          <div>        <Link href="/tests/powerpacks">PowerPacks</Link>
          </div>
          <div>        <Link href="/tests/components/storage">Storage</Link>
          </div>
        </div>

        <div className="mx-auto w-max" >{children}</div>
      </div>
    </div>
  )
}
