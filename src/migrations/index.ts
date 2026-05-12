import * as migration_20260508_140555_initial_schema from './20260508_140555_initial_schema';
import * as migration_20260511_000000_add_media_prefix from './20260511_000000_add_media_prefix';
import * as migration_20260512_000000_notification_fields from './20260512_000000_notification_fields';

export const migrations = [
  {
    up: migration_20260508_140555_initial_schema.up,
    down: migration_20260508_140555_initial_schema.down,
    name: '20260508_140555_initial_schema'
  },
  {
    up: migration_20260511_000000_add_media_prefix.up,
    down: migration_20260511_000000_add_media_prefix.down,
    name: '20260511_000000_add_media_prefix'
  },
  {
    up: migration_20260512_000000_notification_fields.up,
    down: migration_20260512_000000_notification_fields.down,
    name: '20260512_000000_notification_fields'
  },
];
