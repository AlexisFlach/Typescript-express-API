import { IAlbum } from '../../Models/Album';
import { IArtist } from '../../Models/Artist';

export interface IAlbumRepository {
  getAlbums: () => IAlbum[];
  getAlbum: (id: number) => IAlbum;
  createAlbum: (album: IAlbum, artis: IArtist) => void;
  updateAlbum: (id: number, album: IAlbum) => void;
  deleteAlbum: (id: number) => void;
}
