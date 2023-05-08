import crypto from "crypto"

/**
 * Function using in Eval
 * @param s string to calculate Hash of
 * @returns 
 */
export function hash(s:string){
    var shasum = crypto.createHash('sha1')
  shasum.update(s)
  return shasum.digest('hex') // => "0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33"
  }