import { IAlbum } from '../../Models/Album';
import { IArtist } from '../../Models/Artist';

export interface IArtistRepository {
  getArtists: () => IArtist[];
  getArtist: (id: number) => any;
  createArtist: (artist: IArtist) => void;
  updateArtist: (id: number, Artist: IArtist) => void;
  deleteArtist: (id: number) => void;
  addAlbumToArtist: (artistId: number, album: IAlbum) => void;
  getArtistAlbums: (id: number) => IAlbum[] | string;
}
