

import Layout from "@/components-highlevel/Layout"
import createClient from "openapi-fetch";
import { paths } from "./data/schemas/magicbox.nets-intranets"; // (generated from openapi-typescript)
import IntranetCountry from "./showcountry";



export default async function Intranet() {


    const { get } = createClient<paths>({
        baseUrl: "https://magicbox.nets-intranets.com",
        // headers: {
        //   Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
        // },
    });

    const { data, error } = await get("/v1/business/countries", { cache: "no-cache"});


    if (error) {

        return <div>{error.code}</div>
    }
    return <div>


        <Layout>
            Hello world
            {data?.countries?.map((country, id) => {
                return <IntranetCountry  key={id} name={country.Name} code="cc" />
            })}
        </Layout>

    </div>
}
