import { Router, Response, Request } from 'express';
import { albums } from '../../data';
import { AlbumRepository } from '../../repositories/';

const repo = new AlbumRepository(albums);
const router = Router();

router
  .route('/')
  .get((req: Request, res: Response) => res.send(repo.getAlbums()));

router
  .route('/:id')
  .get((req: Request, res: Response) =>
    res.send(repo.getAlbum(Number(req.params.id)))
  );

router.route('/').post((req: Request, res: Response) => {
  const album = req.body;
  repo.createAlbum(album);
  res.status(201).send(repo.getAlbum(album.id));
});

router.route('/:id').put((req: Request, res: Response) => {
  const album = req.body;
  repo.updateAlbum(Number(req.params.id), album);
  res.status(200).send(repo.getAlbum(Number(req.params.id)));
});

router.route('/:id').delete((req: Request, res: Response) => {
  repo.deleteAlbum(Number(req.params.id));
  res.status(200).send('Item deleted');
});

export = router;
