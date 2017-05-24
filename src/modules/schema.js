import { schema } from 'normalizr';

// entities
const entity = {}; // TODO

entity.artist = new schema.Entity('artists');

entity.album = new schema.Entity('albums', {
  artists: [entity.artist],
  tracks: [entity.track],
});

entity.track = new schema.Entity('tracks', {
  album: entity.album,
  artists: [entity.artist],
});

entity.artistSection = new schema.Entity('artistSection', {
  relatedArtists: [entity.artist],
  albums: [entity.album],
  topTracks: [entity.track],
});

// sections
const section = {
  artist: {
    id: entity.artist,
    relatedArtists: [entity.artist],
    albums: [entity.album],
    topTracks: [entity.track],
  },
  album: {
    id: entity.album,
    tracks: [entity.track],
    artists: [entity.artist],
  },
  search: {
    // searchInput: '',
    tracks: [entity.track],
    // offset: 0,
    // selectedTracks: [entity.track],
  },
};

export default { section, entity };
