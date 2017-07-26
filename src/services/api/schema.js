import { schema } from 'normalizr';

// Utils
const withAlbum = albumId => tracks =>
  tracks.items.map(t => ({ ...t, album: albumId }));

// Entities
export const trackSchema = new schema.Entity('tracks', {}, {
  processStrategy: ({ id, name, artists, album }) =>
    ({ id, name, artists, album }),
});

export const artistSchema = new schema.Entity('artists', {}, {
  mergeStrategy: (entityA, entityB) => ({
    ...entityA,
    ...entityB,
    images: entityA.images || entityB.images || [],
  }),
  processStrategy: ({ id, name, images, followers: { total: followers } }) =>
    ({ id, name, images, followers: followers.toLocaleString() }),
});

export const albumSchema = new schema.Entity('albums', {}, {
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

// Sections
export default {
  ALBUM_SECTION: {
    id: albumSchema,
  },
  ARTIST_SECTION: {
    id: artistSchema,
    albums: [albumSchema],
    topTracks: [trackSchema],
    relatedArtists: [artistSchema],
  },
  SEARCH_SECTION: {
    tracks: [trackSchema],
    // searchInput: '',
    // offset: 0,
    // selectedTracks: [trackSchema],
  },
};
