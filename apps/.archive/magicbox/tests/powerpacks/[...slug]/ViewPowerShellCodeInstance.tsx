import { Facade, PowerPackMethods } from "@koksmat/facade";
import { ViewSourceCode } from "@koksmat/react-components";

// @ts-expect-error
export async function ViewPowerShellCodeInstance({ method, path }: { method: PowerPackMethods; path: string; }): any {

  function sleep(ms: number): Promise<string> {
    return new Promise(resolve => setTimeout(() => { resolve("done") }, ms));
  }

  const facade = Facade.getInstance();
  const endPoint = facade.router.matchRoute(method, path);
  const payload = endPoint?.testCases[0]?.data as object;

  if (!payload) {
    return "No test cases found for this endpoint";
  }
  const result = await facade.processMessage(method, path, payload, true);

  return (
    <div id="ViewPowerShellCodeInstance">
      <div className="text-2xl pb-2">Resulting PowerShell code</div>
      <div id="ViewPowerShellCodeInstanceResult">
      {result.hasError && <div className="bg-red-600 text-white p-10">{result.errorMessage}</div>}
      {!result.hasError && <div className="bg-green-600 text-white p-10">Success</div>}

      </div>
      <ViewSourceCode language="powershell" code={result.data as string} />
    </div>
  );
}
