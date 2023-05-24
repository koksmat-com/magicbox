import Redis from "ioredis";
export default class KV {
  private _redis: Redis;
  constructor() {
    this._redis = new Redis();
  }
  public static getInstace() {}
}
