
import Header from "./Header"
import Footer from "./Footer"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div style={{width:"100vw"}}>
      
      <main>{children}</main>
      <Footer />
    </div>
  )
}