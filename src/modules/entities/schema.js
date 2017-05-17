import { schema } from 'normalizr';

// artists
const artists = new schema.Entity('artists');

// albums
const albums = new schema.Entity('albums');

// album
const album = new schema.Entity('album');

// artist
const artist = new schema.Entity('artist', {
  albums,
  related: artists,
});

export default {
  artists,
  albums,
  artist,
  album,
};
