import { schema } from 'normalizr';

// utils
const withAlbum = albumId => tracks =>
  tracks.items.map(t => ({ ...t, album: albumId }));

// entities
const trackSchema = new schema.Entity('tracks', {}, {
  processStrategy: ({ id, name, artists, album }) =>
    ({ id, name, artists, album }),
});

const artistSchema = new schema.Entity('artists', {}, {
  mergeStrategy: (entityA, entityB) => ({
    ...entityA,
    ...entityB,
    images: entityA.images || entityB.images || [],
  }),
  processStrategy: ({ id, name, images }) =>
    ({ id, name, images }),
});

const albumSchema = new schema.Entity('albums', {}, {
  processStrategy: ({ id, name, label, images, artists, tracks }) => {
    if (tracks) return { id, name, label, images, artists, tracks: withAlbum(id)(tracks) };
    return { id, name, label, images, artists };
  },
});

trackSchema.define({
  album: albumSchema,
  artists: [artistSchema],
});
albumSchema.define({
  artists: [artistSchema],
  tracks: [trackSchema],
});

// sections
const section = {
  artist: {
    id: artistSchema,
    albums: [albumSchema],
    topTracks: [trackSchema],
    relatedArtists: [artistSchema],
  },
  album: {
    id: albumSchema,
  },
  search: {
    // searchInput: '',
    tracks: [trackSchema],
    // offset: 0,
    // selectedTracks: [trackSchema],
  },
};

export default {
  section,
  entity: {
    artist: artistSchema,
    album: albumSchema,
    track: trackSchema,
  },
};
