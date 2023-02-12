import { StorageKeys } from "../../constants";

export interface IStorageService {
    contains(key: StorageKeys): boolean;

    getBoolean(key: StorageKeys): boolean | undefined;
    getNumber(key: StorageKeys): number | undefined;
    getString(key: StorageKeys): string | undefined;

    remove(key: StorageKeys): void;
    removeAll(): void;

    set(key: StorageKeys, value: string | number | boolean): void;
    update(key: StorageKeys, value: string | number | boolean): void;
}
