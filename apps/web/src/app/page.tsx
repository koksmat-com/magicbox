import Image from 'next/image'
import { Inter } from 'next/font/google'
import { TopBar } from '@/components-lowlevel/TopBar'
import nexiEurope from "./NexiEurope.svg"
import { NavigationNode, NexiNavConfig } from '@/components-lowlevel/helpers'
import { ITopNavigation, TopNavigation } from '@/components-lowlevel/components/Topnav'
import Link from 'next/link'
import Logo from '@/components-lowlevel/components/Logo'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const nav: NavigationNode[] = []
  const hubConfig: NexiNavConfig = {
    enabled: false,
    parents: [],
    clarityId: '',
    matomoId: '',
    showSearch: false,
    hideHome: false,
    homeUrl: '',
    showSiteTitle: false,
    siteUrl: '',
    siteTitle: ''
  }


  const left: NavigationNode[] = [
    {
      Title: "Home",
      Url: "/",
      Children: [],
      onOver: (node: NavigationNode) => {
        console.log("Mouse over home")
      },
      onOut: (node: NavigationNode) => {
        console.log("Mouse out home")
      }
    },

  ]
  const topNavigationProps: ITopNavigation = {

    left: nav,
    right: nav,

    hubConfig,
    homeUrl: "/"

  }
  return (
    <div className="container  text-center bg-[url('/NexiEurope.svg')] bg-repeat-space h-screen bg-contain bg-center">
      <div className='absolute left-8 top-4'>
      <Logo homeUrl='/' />
      </div>
      {/* <TopNavigation {...topNavigationProps} /> */}
      <div className='grid h-screen place-items-center'>
        <div className=' w-screen p-10 bg-[#FFFFFFAA]'>
          <div className='pb-4 text-2xl'>Welcome to Nexi Group</div>
          <div>
          <button  className="rounded-full text-white bg-[#2D32A9] p-2 px-10 hover:from-pink-500 hover:to-yellow-500 from-green-400 to-blue-500"> <Link href="/welcome">Click to get started</Link></button>
            
           </div>
        </div>

      </div>

    </div>
  )
}