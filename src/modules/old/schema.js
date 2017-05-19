import { schema } from 'normalizr';

const entity = {
  artist: new schema.Entity('artists'),
  track: new schema.Entity('tracks'),
  album: new schema.Entity('albums'),
};

const section = {
  artist: new schema.Object({
    selected: entity.artist,
    relatedArtists: [entity.artist],
    albums: [entity.album],
    topTracks: [entity.track],
  }),
};

export default { section, entity };
