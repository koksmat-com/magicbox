
import { Facade } from "@koksmat/facade"





export default async function Page({ params }: { params: { slug: string[] } }) {


  const facade = Facade.getInstance()
  const mongo = facade.mongoDB.client
  if (!mongo){

    return <div>

      No mongo instance configured
    </div>
  }
  const db = await mongo.db("admin").admin().listDatabases()

  
  return (
    <div className="container mx-auto px-4">
        <div className="text-3xl">Databases</div>
        {db.databases.map((db,index)=>{
          return <div key={index}>
            {db.name}
          </div>

        })}
    </div>
  )
}
