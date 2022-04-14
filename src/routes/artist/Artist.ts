import { Router, Response, Request, NextFunction } from 'express';
import { artists } from '../../data';
import { IArtist } from '../../Models/Artist';
import { ArtistRepository } from '../../repositories/';

const repo = new ArtistRepository(artists);
const router = Router();

router
  .route('/')
  .get((req: Request, res: Response) => res.send(repo.getArtists()));

router
  .route('/:id')
  .get((req: Request, res: Response) =>
    res.send(repo.getArtist(Number(req.params.id)))
  );

const verifyData = function (req: Request, res: Response, next: NextFunction) {
  if (!req.body.name) {
    res.status(500).send({ message: 'error occured when creating artist' });
  } else {
    next();
  }
};

router.route('/').post(verifyData, (req: Request, res: Response) => {
  const artist: IArtist = req.body;
  try {
    repo.createArtist(artist);
    res.status(201).send(repo.getArtist(artist.id));
  } catch (error) {
    res.status(500).send({ message: 'error occured when creating artist' });
  }
});

router.route('/:id').put((req: Request, res: Response) => {
  const artist = req.body;
  repo.updateArtist(Number(req.params.id), artist);
  res.status(200).send(repo.getArtist(Number(req.params.id)));
});

router.route('/:id').delete((req: Request, res: Response) => {
  repo.deleteArtist(Number(req.params.id));
  res.status(200).send('Item deleted');
});
router.route('/:id/albums').post((req: Request, res: Response) => {
  repo.addAlbumToArtist(Number(req.params.id), req.body);
  res.status(200).send('Item Added');
});

export = router;
