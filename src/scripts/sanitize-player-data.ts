#!/usr/bin/env bun
/**
 * Sanitizes player data by replacing all identifiable information with dummy data
 * while preserving the structure and data types for type generation
 */

import { readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

// Get paths
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..', '..')

// Function to generate consistent dummy names
function getDummyName(type: string, index: number): string {
  const names: Record<string, string[]> = {
    character: [
      'TestPlayer',
      'DummyUser',
      'ExampleChar',
      'SampleHero',
      'MockPlayer',
    ],
    guild: [
      'TestGuild',
      'ExampleClan',
      'DummyGroup',
      'SampleTeam',
      'MockGuild',
    ],
    message: [
      'Hello world',
      'Test message',
      'Example chat',
      'Sample text',
      'Mock message',
    ],
  }

  const nameList = names[type] || names.character
  if (!nameList || nameList.length === 0) {
    return `Dummy${type}${index}`
  }
  return (
    nameList[index % nameList.length] +
    (index > nameList.length - 1 ? String(index) : '')
  )
}

// Function to generate dummy email
function getDummyEmail(index: number): string {
  return `user${index}@example.com`
}

// Function to generate dummy Steam ID
function getDummySteamId(index: number): string {
  return `7656119800000${String(index).padStart(4, '0')}`
}

// Counter for consistent ID generation
let idCounter = 1000
const idMap = new Map<number, number>()

function getDummyId(originalId: number): number {
  if (!idMap.has(originalId)) {
    idMap.set(originalId, idCounter++)
  }
  return idMap.get(originalId)!
}

// Main sanitization function
function sanitizePlayerData(data: any): any {
  const sanitized = { ...data }

  // Sanitize user data
  if (sanitized.user) {
    sanitized.user.id = getDummyId(sanitized.user.id)
  }

  // Sanitize email
  if (sanitized.email) {
    sanitized.email = getDummyEmail(1)
  }

  // Sanitize Steam ID
  if (sanitized.steamUserId) {
    sanitized.steamUserId = getDummySteamId(1)
  }

  // Sanitize userInfo
  if (sanitized.userInfo) {
    sanitized.userInfo.userID =
      sanitized.user?.id || getDummyId(sanitized.userInfo.userID)
  }

  // Sanitize character
  if (sanitized.character) {
    sanitized.character.id = getDummyId(sanitized.character.id)
    sanitized.character.userID =
      sanitized.user?.id || getDummyId(sanitized.character.userID)
    sanitized.character.name = getDummyName('character', 0)
    sanitized.character.previousName = ''
  }

  // Sanitize characterInfo
  if (sanitized.characterInfo) {
    sanitized.characterInfo.characterID =
      sanitized.character?.id || getDummyId(sanitized.characterInfo.characterID)
  }

  // Sanitize characterSetting
  if (sanitized.characterSetting) {
    sanitized.characterSetting.characterID =
      sanitized.character?.id ||
      getDummyId(sanitized.characterSetting.characterID)
  }

  // Sanitize character actions
  if (sanitized.characterActions && Array.isArray(sanitized.characterActions)) {
    sanitized.characterActions = sanitized.characterActions.map(
      (action: any) => ({
        ...action,
        id: getDummyId(action.id),
        characterID: sanitized.character?.id || getDummyId(action.characterID),
        partyID: action.partyID ? getDummyId(action.partyID) : action.partyID,
        characterLoadoutID: action.characterLoadoutID
          ? getDummyId(action.characterLoadoutID)
          : action.characterLoadoutID,
      })
    )
  }

  // Sanitize character quests
  if (sanitized.characterQuests && Array.isArray(sanitized.characterQuests)) {
    sanitized.characterQuests = sanitized.characterQuests.map((quest: any) => ({
      ...quest,
      id: getDummyId(quest.id),
      characterID: sanitized.character?.id || getDummyId(quest.characterID),
    }))
  }

  // Sanitize character skills
  if (sanitized.characterSkills && Array.isArray(sanitized.characterSkills)) {
    sanitized.characterSkills = sanitized.characterSkills.map((skill: any) => ({
      ...skill,
      characterID: sanitized.character?.id || getDummyId(skill.characterID),
    }))
  }

  // Sanitize character abilities
  if (
    sanitized.characterAbilities &&
    Array.isArray(sanitized.characterAbilities)
  ) {
    sanitized.characterAbilities = sanitized.characterAbilities.map(
      (ability: any) => ({
        ...ability,
        characterID: sanitized.character?.id || getDummyId(ability.characterID),
      })
    )
  }

  // Sanitize character items
  if (sanitized.characterItems && Array.isArray(sanitized.characterItems)) {
    sanitized.characterItems = sanitized.characterItems.map((item: any) => ({
      ...item,
      id: getDummyId(item.id),
      characterID: sanitized.character?.id || getDummyId(item.characterID),
    }))
  }

  // Sanitize offline items
  if (sanitized.offlineItems && Array.isArray(sanitized.offlineItems)) {
    sanitized.offlineItems = sanitized.offlineItems.map((item: any) => ({
      ...item,
      id: getDummyId(item.id),
      characterID: sanitized.character?.id || getDummyId(item.characterID),
    }))
  }

  // Sanitize offline skills
  if (sanitized.offlineSkills && Array.isArray(sanitized.offlineSkills)) {
    sanitized.offlineSkills = sanitized.offlineSkills.map((skill: any) => ({
      ...skill,
      characterID: sanitized.character?.id || getDummyId(skill.characterID),
    }))
  }

  // Sanitize character loadout map
  if (sanitized.characterLoadoutMap) {
    const newLoadoutMap: any = {}
    for (const [key, loadout] of Object.entries(
      sanitized.characterLoadoutMap as any
    )) {
      const loadoutObj = loadout as any
      const newLoadout = {
        ...loadoutObj,
        id: getDummyId(loadoutObj.id),
        characterID:
          sanitized.character?.id || getDummyId(loadoutObj.characterID),
        name: `Loadout ${key}`,
      }
      newLoadoutMap[key] = newLoadout
    }
    sanitized.characterLoadoutMap = newLoadoutMap
  }

  // Sanitize combat unit
  if (sanitized.combatUnit && sanitized.combatUnit.character) {
    sanitized.combatUnit.character = {
      ...sanitized.combatUnit.character,
      id:
        sanitized.character?.id ||
        getDummyId(sanitized.combatUnit.character.id),
      userID:
        sanitized.user?.id || getDummyId(sanitized.combatUnit.character.userID),
      name: getDummyName('character', 0),
    }
    sanitized.combatUnit.name = getDummyName('character', 0)
  }

  // Sanitize market listings
  if (sanitized.myMarketListings && Array.isArray(sanitized.myMarketListings)) {
    sanitized.myMarketListings = sanitized.myMarketListings.map(
      (listing: any, index: number) => ({
        ...listing,
        id: getDummyId(listing.id),
        characterID: sanitized.character?.id || getDummyId(listing.characterID),
        characterName: getDummyName('character', index),
      })
    )
  }

  // Sanitize chat messages
  const sanitizeChatMessages = (messages: any[]) => {
    return messages.map((msg: any, index: number) => ({
      ...msg,
      id: getDummyId(msg.id),
      cId: msg.cId ? getDummyId(msg.cId) : msg.cId,
      cName: msg.cName ? getDummyName('character', index) : msg.cName,
      m: msg.m ? getDummyName('message', index) : msg.m,
      rId: msg.rId ? getDummyId(msg.rId) : msg.rId,
      rName: msg.rName ? getDummyName('character', index + 1) : msg.rName,
    }))
  }

  // Sanitize all chat histories
  if (sanitized.chatHistoryByChannelMap) {
    const newChatMap: any = {}
    for (const [channel, messages] of Object.entries(
      sanitized.chatHistoryByChannelMap as any
    )) {
      if (Array.isArray(messages)) {
        newChatMap[channel] = sanitizeChatMessages(messages)
      }
    }
    sanitized.chatHistoryByChannelMap = newChatMap
  }

  if (sanitized.guildChatHistory && Array.isArray(sanitized.guildChatHistory)) {
    sanitized.guildChatHistory = sanitizeChatMessages(
      sanitized.guildChatHistory
    )
  }

  if (sanitized.partyChatHistory && Array.isArray(sanitized.partyChatHistory)) {
    sanitized.partyChatHistory = sanitizeChatMessages(
      sanitized.partyChatHistory
    )
  }

  if (
    sanitized.whisperChatHistory &&
    Array.isArray(sanitized.whisperChatHistory)
  ) {
    sanitized.whisperChatHistory = sanitizeChatMessages(
      sanitized.whisperChatHistory
    )
  }

  if (
    sanitized.moderatorChatHistory &&
    Array.isArray(sanitized.moderatorChatHistory)
  ) {
    sanitized.moderatorChatHistory = sanitizeChatMessages(
      sanitized.moderatorChatHistory
    )
  }

  // Sanitize friend character map
  if (sanitized.friendCharacterMap) {
    const newFriendMap: any = {}
    let friendIndex = 0
    for (const [key, friend] of Object.entries(
      sanitized.friendCharacterMap as any
    )) {
      const friendObj = friend as any
      newFriendMap[key] = {
        ...friendObj,
        name: getDummyName('character', ++friendIndex),
      }
    }
    sanitized.friendCharacterMap = newFriendMap
  }

  // Sanitize guild
  if (sanitized.guild) {
    sanitized.guild = {
      ...sanitized.guild,
      id: getDummyId(sanitized.guild.id),
      name: getDummyName('guild', 0),
      noticeMessage: 'Welcome to our test guild!',
    }
  }

  // Sanitize guild character map
  if (sanitized.guildCharacterMap) {
    const newGuildCharMap: any = {}
    for (const [key, member] of Object.entries(
      sanitized.guildCharacterMap as any
    )) {
      const memberObj = member as any
      newGuildCharMap[key] = {
        ...memberObj,
        guildID: sanitized.guild?.id || getDummyId(memberObj.guildID),
        characterID: getDummyId(memberObj.characterID),
        inviterCharacterID: getDummyId(memberObj.inviterCharacterID),
      }
    }
    sanitized.guildCharacterMap = newGuildCharMap
  }

  // Sanitize guild sharable character map
  if (sanitized.guildSharableCharacterMap) {
    const newGuildShareMap: any = {}
    let memberIndex = 0
    for (const [key, member] of Object.entries(
      sanitized.guildSharableCharacterMap as any
    )) {
      const memberObj = member as any
      newGuildShareMap[key] = {
        ...memberObj,
        name: getDummyName('character', ++memberIndex),
      }
    }
    sanitized.guildSharableCharacterMap = newGuildShareMap
  }

  // Sanitize guild invites
  if (sanitized.guildInviteMap) {
    const newInviteMap: any = {}
    for (const [key, invite] of Object.entries(
      sanitized.guildInviteMap as any
    )) {
      const inviteObj = invite as any
      newInviteMap[key] = {
        ...inviteObj,
        id: getDummyId(inviteObj.id),
        guildID: sanitized.guild?.id || getDummyId(inviteObj.guildID),
        inviterCharacterID: getDummyId(inviteObj.inviterCharacterID),
        invitedCharacterID: getDummyId(inviteObj.invitedCharacterID),
      }
    }
    sanitized.guildInviteMap = newInviteMap
  }

  // Sanitize guild inviter sharable character map
  if (sanitized.guildInviterSharableCharacterMap) {
    const newInviterMap: any = {}
    let inviterIndex = 0
    for (const [key, inviter] of Object.entries(
      sanitized.guildInviterSharableCharacterMap as any
    )) {
      const inviterObj = inviter as any
      newInviterMap[key] = {
        ...inviterObj,
        name: getDummyName('character', ++inviterIndex),
      }
    }
    sanitized.guildInviterSharableCharacterMap = newInviterMap
  }

  // Sanitize guild invite guild name map
  if (sanitized.guildInviteGuildNameMap) {
    const newGuildNameMap: any = {}
    let guildIndex = 0
    for (const key of Object.keys(sanitized.guildInviteGuildNameMap)) {
      newGuildNameMap[key] = getDummyName('guild', ++guildIndex)
    }
    sanitized.guildInviteGuildNameMap = newGuildNameMap
  }

  // Sanitize party info
  if (sanitized.partyInfo) {
    if (sanitized.partyInfo.party) {
      sanitized.partyInfo.party = {
        ...sanitized.partyInfo.party,
        id: getDummyId(sanitized.partyInfo.party.id),
        entryCode: 'TEST123',
      }
    }

    if (sanitized.partyInfo.partySlotMap) {
      const newSlotMap: any = {}
      for (const [key, slot] of Object.entries(
        sanitized.partyInfo.partySlotMap as any
      )) {
        const slotObj = slot as any
        newSlotMap[key] = {
          ...slotObj,
          id: getDummyId(slotObj.id),
          partyID:
            sanitized.partyInfo.party?.id || getDummyId(slotObj.partyID),
          characterID: slotObj.characterID
            ? getDummyId(slotObj.characterID)
            : null,
          characterLoadoutID: getDummyId(slotObj.characterLoadoutID),
        }
      }
      sanitized.partyInfo.partySlotMap = newSlotMap
    }

    if (sanitized.partyInfo.sharableCharacterMap) {
      const newShareMap: any = {}
      let partyMemberIndex = 0
      for (const [key, member] of Object.entries(
        sanitized.partyInfo.sharableCharacterMap as any
      )) {
        const memberObj = member as any
        newShareMap[key] = {
          ...memberObj,
          name: getDummyName('character', ++partyMemberIndex),
        }
      }
      sanitized.partyInfo.sharableCharacterMap = newShareMap
    }
  }

  // Sanitize announcement message
  if (sanitized.announcementMessage) {
    sanitized.announcementMessage = 'Test announcement message'
  }

  return sanitized
}

// Main execution
console.log('🔒 Sanitizing player data...')

const inputPath = join(projectRoot, 'src', 'sources', 'player_data.json')
const outputPath = join(
  projectRoot,
  'src',
  'sources',
  'player_data_sanitized.json'
)

try {
  // Read original data
  const originalData = JSON.parse(readFileSync(inputPath, 'utf-8'))

  // Sanitize the data
  const sanitizedData = sanitizePlayerData(originalData)

  // Write sanitized data
  writeFileSync(outputPath, JSON.stringify(sanitizedData, null, '\t'))

  // Also overwrite the original file with sanitized data
  writeFileSync(inputPath, JSON.stringify(sanitizedData, null, '\t'))

  console.log('✅ Player data sanitized successfully!')
  console.log(`   Original backed up to: ${outputPath}`)
  console.log(`   Sanitized data written to: ${inputPath}`)
} catch (error) {
  console.error('❌ Error sanitizing player data:', error)
  process.exit(1)
}
