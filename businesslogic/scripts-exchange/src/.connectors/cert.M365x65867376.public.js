const fs = require("fs")
const path = require("path")
var privatecertificate = `-----BEGIN CERTIFICATE-----
MIICoTCCAYkCAgPoMA0GCSqGSIb3DQEBBQUAMBQxEjAQBgNVBAMMCUNMSS1Mb2dp
bjAiGA8yMDIzMDMzMTExMjExNVoYDzIwMjQwMzMxMTEyMTE3WjAUMRIwEAYDVQQD
DAlDTEktTG9naW4wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC5JOFX
6DbGlg4neo679bsUDgDBWxLMrxsK60V5fAUQ+5Caaya/0FVatxzy3Pf5e0W9sBgS
1Nl5FN/Vfk0sV8QpxcGCBHwDaDHEpq2/zwrvhIiBIVmVnEhEC4VaWllAiW5wDzSG
d1aYqu8+flBdRS0W192DQQ4eVXyyoE7CF4oE9ALTPMItNAOp7HZmWr7f5sFiJcvD
Qoe5QIxJLdYpA8MoXvo6JR3aeKSz+ObPVGe7mIveNlPca45U5fLzZ1Mchb/4WTdB
gEHeFQcZdTo6E0Lg9dBfwR+RFLqzAx6wD7PSVqO8gZ2AtB2Pl9VrUetsV+9DZrLC
QhLTxLqHLoi2ZMsZAgMBAAEwDQYJKoZIhvcNAQEFBQADggEBAIxobUJGBk1y4WYq
LR0sbqs0OVI3FUROUyb4+sjQ+gzxNfn51doC4ZNwX77FikLDoczpAcGSI4+ivakn
ZkGSwu9ecXcxfSum3oLe5hFcGaWXZaSkayp9LzwzB5qtq8FdFaH20eWfvvhBN86u
k3N3yPNGWD1UTR3fr9fezrGzrjsvFYnjxjpVa1/7KIThfvsXzLhSoo7QxxbtDK8W
MIk184wIkktWqMBD/jmdMd7/BgovZVrSToF7oYuq61MxFR3fpXInNTSIL4pouQ2B
oJAnh6J8nBuSrNQ+h4rVNUaPYZfuFckeVhA2ImJsimMyEHVudEnaimLe6tviF9eA
zamTYvE=
-----END CERTIFICATE-----`
const BEGIN = "-----BEGIN CERTIFICATE-----"
const END = "-----END CERTIFICATE-----"
if (privatecertificate.indexOf(BEGIN) ===-1) {
    console.error("Private key is not valid")
    process.exit(1)
}

if (privatecertificate.indexOf(END) ===-1) {
    console.error("Private key is not valid")
    process.exit(1)
}
var certificate = privatecertificate.replace(BEGIN,"").replace(END,"").replace(/(?:\r\n| |\r|\n)/g, '')
console.log(certificate)
const filepath = path.join(__dirname, "M365x65867376.pfx");
fs.writeFileSync(filepath, certificate, { encoding: "base64" });