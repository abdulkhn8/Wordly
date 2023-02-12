import { useRef } from 'react'
import { MMKV } from 'react-native-mmkv'
import { StorageKeys } from '../../constants';
import { IStorageService } from './types';

function useStorageService(): IStorageService {

    const storage = useRef(new MMKV({
        id: `basic-storage`,
        // path: `${USER_DIRECTORY}/storage`,
        encryptionKey: 'basic-storage'
    }));

    //#region Primary Operations
    const set = (key: StorageKeys, value: string | number | boolean) => {
        storage.current.set(key, value);
    }
    const getString = (key: StorageKeys) => {
        return storage.current.getString(key);
    }
    const getBoolean = (key: StorageKeys) => {
        return storage.current.getBoolean(key);
    }
    const getNumber = (key: StorageKeys) => {
        return storage.current.getNumber(key);
    }
    const update = (key: StorageKeys, value: string | number | boolean) => {
        storage.current.delete(key);
        set(key, value);
    }
    const remove = (key: StorageKeys) => {
        storage.current.delete(key);
    }
    const contains = (key: StorageKeys) => {
        return storage.current.contains(key);
    }
    const removeAll = () => {
        storage.current.clearAll();
    }
    //#endregion

    return (
        {
            set,
            getBoolean,
            getNumber,
            getString,
            update,
            contains,
            remove,
            removeAll
        }
    )
}
export { useStorageService };
export * from './types';
