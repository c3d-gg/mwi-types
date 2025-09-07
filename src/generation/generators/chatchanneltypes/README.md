# ChatChannelTypes Generator

## Overview

Generates type definitions for chat channel types in the game. Chat channels provide different communication contexts for players.

## Source Data

- **Source Key**: `chatChannelTypeDetailMap`
- **Entity Count**: 21 chat channel types
- **Dependencies**: None

## Structure

### Entity Properties

- `hrid`: Unique identifier (ChatChannelTypeHrid)
- `name`: Display name (localized)
- `isPrivate`: Whether channel is private
- `sortIndex`: Display order

### Categories

- **Public Channels**: Global, Trade, etc. (isPrivate: false)
- **Private Channels**: Language-specific and restricted channels (isPrivate: true)

## Generated Files

- `types.ts`: ChatChannelType interface and ChatChannelTypeHrid type
- `constants.ts`: CHAT_CHANNEL_TYPE_HRIDS, PUBLIC_CHAT_CHANNEL_TYPE_HRIDS, PRIVATE_CHAT_CHANNEL_TYPE_HRIDS
- `data.ts`: Lazy-loaded chat channel type records
- `lookups.ts`: Static lookup tables
- `utils.ts`: Utility functions for filtering and sorting

## Usage Examples

```typescript
import { PUBLIC_CHAT_CHANNEL_TYPE_HRIDS } from '@c3d.gg/mwi-types/chatchanneltypes/constants'
import { getChatChannelType } from '@c3d.gg/mwi-types/chatchanneltypes/utils'

// Get a specific channel type
const globalChannel = getChatChannelType('/chat_channel_types/global')

// Get all public channels
const publicChannels = getChatChannelTypesByPrivacy(false)

// Get sorted channels
const sortedChannels = getChatChannelTypesSortedBySortIndex()
```
