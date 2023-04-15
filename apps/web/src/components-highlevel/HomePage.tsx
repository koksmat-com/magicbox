import { Tab, TabList } from "@fluentui/react-components"
import * as react from "react"
import { useState } from "react"
import Layout from "./Layout"
export  function HomePage () {
    const [tab, setTab] = useState("")

    return <Layout>
      <TabList onTabSelect={(e, data) => setTab(data.value as string)} defaultSelectedValue="buttons">
            <Tab value="buttons">Buttons</Tab>
            <Tab value="cards">Cards</Tab>
            <Tab value="inputs">Inputs</Tab>
          </TabList>

          <div>
            {tab}
          </div>
          </Layout>
     
    
}