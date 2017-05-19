import { schema } from 'normalizr';

// entities
const entity = {};

entity.artist = new schema.Entity('artists');

entity.album = new schema.Entity('albums', {
  artists: [entity.artist],
});

entity.track = new schema.Entity('tracks', {
  albums: [entity.album],
});

// sections
const section = {
  artist: new schema.Object({
    selected: entity.artist,
    relatedArtists: [entity.artist],
    albums: [entity.album],
    topTracks: [entity.track],
  }),
  album: new schema.Object({
    selected: entity.album,
    tracks: [entity.track],
  }),
};

export default { section, entity };
