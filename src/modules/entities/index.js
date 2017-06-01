import merge from 'lodash/fp/merge';
import { schema } from 'normalizr';

// Utils
const withAlbum = albumId => tracks =>
  tracks.items.map(t => ({ ...t, album: albumId }));

// Initial State
const INIT_STATE = {
  artists: {},
  albums: {},
  tracks: {},
};

// Schema
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
  processStrategy: ({ id, name, images }) =>
    ({ id, name, images }),
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

// Reducer
export default function entities(state = INIT_STATE, action) {
  if (action.entities) {
    return merge(state, action.entities);
  }
  return state;
}
