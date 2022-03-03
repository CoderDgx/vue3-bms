/* eslint-disable @typescript-eslint/no-explicit-any */
class LocalStorage {
  setValue(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  getValue(key: string) {
    const value = window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }
  deleteValue(key: string) {
    {
      window.localStorage.removeItem(key);
    }
  }

  clearStorage() {
    window.localStorage.clear();
  }
}

export default new LocalStorage();
