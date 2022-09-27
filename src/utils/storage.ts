'use strict'

import crypto from '@utils/crypto'

interface ProxyStorage {
    getItem(key: string): any
    setItem(key: string, value: any): void
    removeItem(key: string): void
    clear(): void
}

class sessionStorageProxy implements ProxyStorage {
    protected storage: ProxyStorage
    constructor(storageModel: ProxyStorage) {
        this.storage = storageModel
    }
    public getItem(key: string) {
        let storage = this.storage.getItem(crypto.encrypto(key))
        if (storage) {
            storage = JSON.parse(crypto.decrypto(storage))
            if (storage.expires === null) return storage.data
            if (Date.now() - storage.time > storage.expires) {
                this.storage.removeItem(key)
                return null
            }
            return storage.data
        }
        return null
    }
    public setItem(key: string, value: any, expires: number | null = null) {
        const storage = {
            data: value, //存储值
            time: Date.now(), //存值时间戳
            expires: expires ? expires * 86_400_000 : null, //过期时间
        }
        this.storage.setItem(crypto.encrypto(key), crypto.encrypto(JSON.stringify(storage)))
    }
    public removeItem(key: string) {
        this.storage.removeItem(crypto.encrypto(key))
    }
    public clear() {
        this.storage.clear()
    }
}

class localStorageProxy extends sessionStorageProxy implements ProxyStorage {
    constructor(localStorage: ProxyStorage) {
        super(localStorage)
    }
}

export const storageSession = new sessionStorageProxy(sessionStorage)
export const storageLocal = new localStorageProxy(localStorage)
