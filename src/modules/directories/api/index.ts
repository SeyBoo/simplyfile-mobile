import {Directory} from "../../../common/types/directory.interface";

const DIRECTORIES_API_BACKEND_MODULE = 'dummy';

export interface DirectoriesBackend {
  fetchDirectories() : Promise<Directory[]>;

  createDirectory(name: string): Promise<Directory>;

  updateDirectory(uuid: string, name: string): Promise<Directory[]>;

  removeDirectory(uuid: string): Promise<Directory[]>;
}

let authBackendInstance: DirectoriesBackend | undefined = undefined;

export async function getDirectoriesBackend(): Promise<DirectoriesBackend> {
  if (authBackendInstance === undefined) {
    const mod = await import ('./backends/' + DIRECTORIES_API_BACKEND_MODULE);
    authBackendInstance = new mod.default() as DirectoriesBackend;
  }
  return authBackendInstance;
}