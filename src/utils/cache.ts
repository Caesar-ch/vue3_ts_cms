class LocalCache {
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  deleateCache(key: string) {
    window.localStorage.removeItem(key)
  }
  clearCache() {
    window.localStorage.clear()
  }
}
//用类封装思想更好
export default new LocalCache()
