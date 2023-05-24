import Layout from "@/components-highlevel/Layout";
import { ShowTable } from "./table";
import { Facade } from "@koksmat/facade";
import ImageUpload from "./components/ImageUpload";

//TODO: Add booking functionality - @karlomrak
export default async function Booking() {
  const facade = Facade.getInstance();
  const mongo = facade.mongoDB.client;
  if (!mongo) {
    return <div>No mongo instance configured</div>;
  }
  const databases = await mongo.db("admin").admin().listDatabases();
  return (
    <div>
      <Layout>
        <ImageUpload />
      </Layout>
    </div>
  );
}
