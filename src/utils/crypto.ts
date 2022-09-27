'use strict'

import CryptoJS from 'crypto-js'
const AesKey = '7R4MlwBuQoo3b94bxeg01HBCagJOe2CedjQIZ4Y+8Dw='
const iv = '14GCvgn9erXwrrHj'

export default {
    Encrypt(data: string) {
        const sha256Key = CryptoJS.SHA256(AesKey)
        const ivHex = CryptoJS.enc.Utf8.parse(iv)
        const encrypted = CryptoJS.AES.encrypt(data, sha256Key, {
            iv: ivHex,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        })
        return encrypted.toString().replace(/\+/g, '-').replace(/\//g, '_')
    },
    Decrypt(data: string) {
        const sha256Key = CryptoJS.SHA256(AesKey)
        const ivHex = CryptoJS.enc.Utf8.parse(iv)
        const decrypt = CryptoJS.AES.decrypt(data.replace(/-/g, '+').replace(/_/g, '/'), sha256Key, {
            iv: ivHex,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        })
        return decrypt.toString(CryptoJS.enc.Utf8).toString()
    },
}
