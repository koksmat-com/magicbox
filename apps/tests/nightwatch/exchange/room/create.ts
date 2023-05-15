
/* eslint-disable turbo/no-undeclared-env-vars */
import test1 from "../../../testcomponents/testpage"

const url = process.env.ENDPOINT + "tests/exchange/room:post"
const home =  test1(url)

export default home;
