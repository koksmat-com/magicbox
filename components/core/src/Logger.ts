export type LogLevel = 'log' | 'error' | 'warn' | 'debug' | 'verbose';
export interface ILoggerService {
    /**
     * Write a 'log' level log.
     */
    log(message: any, ...optionalParams: any[]): any;
  
    /**
     * Write an 'error' level log.
     */
    error(message: any, ...optionalParams: any[]): any;
  
    /**
     * Write a 'warn' level log.
     */
    warn(message: any, ...optionalParams: any[]): any;
  
    /**
     * Write a 'debug' level log.
     */
    debug?(message: any, ...optionalParams: any[]): any;
  
    /**
     * Write a 'verbose' level log.
     */
    verbose?(message: any, ...optionalParams: any[]): any;
  
    /**
     * Set log levels.
     * @param levels log levels
     */
    setLogLevels?(levels: LogLevel[]): any;
  }

export class Logger implements ILoggerService {
    private _name : string
     constructor (name :string) {
        this._name = name
    
    }
    log(message: any, ...optionalParams: any[]) {
        throw new Error("Method not implemented.");
    }
    error(message: any, ...optionalParams: any[]) {
        throw new Error("Method not implemented.");
    }
    warn(message: any, ...optionalParams: any[]) {
        throw new Error("Method not implemented.");
    }
    debug?(message: any, ...optionalParams: any[]) {
        throw new Error("Method not implemented.");
    }
    verbose?(message: any, ...optionalParams: any[]) {
        throw new Error("Method not implemented.");
    }
    setLogLevels?(levels: LogLevel[]) {
        throw new Error("Method not implemented.");
    }
}