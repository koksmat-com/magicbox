import { Tab, TabList } from "@fluentui/react-components"
import { useSession } from "next-auth/react"
import * as react from "react"
import { useState } from "react"
import Layout from "./Layout"
import { api } from "@/utils/api"

export  function HomePage () {
    const [tab, setTab] = useState("")
    const { data: sessionData } = useSession();

    const { data: message } = api.example.hello.useQuery(
    {text: "World"}
 
    );

    return <Layout>
      <>
      <TabList onTabSelect={(e, data) => setTab(data.value as string)} defaultSelectedValue="buttons">
            <Tab value="buttons">Buttons</Tab>
            <Tab value="cards">Cards</Tab>
            <Tab value="inputs">Inputs</Tab>
          </TabList>
{message?.greeting}</>
{JSON.stringify(sessionData,null,2)}
          </Layout>
     
    
}