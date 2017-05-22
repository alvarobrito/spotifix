import { schema } from 'normalizr';

// entities
const entity = {}; // TODO

entity.artist = new schema.Entity('artists');

entity.album = new schema.Entity('albums', {
  artists: [entity.artist],
});

entity.track = new schema.Entity('tracks', {
  album: entity.album,
  artists: [entity.artist],
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
  search: new schema.Object({
    // searchInput: '',
    tracks: [entity.track],
    // offset: 0,
    // selectedTracks: [entity.track],
  }),
};

export default { section, entity };
