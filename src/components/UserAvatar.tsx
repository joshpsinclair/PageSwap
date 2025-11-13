import { useState, useEffect } from 'react'
import * as Avatar from '@radix-ui/react-avatar'
import { ImageRepository } from '../data/ImageRepository'
import styles from './UserAvatar.module.css'

interface UserAvatarProps {
  avatarId: string
  firstName?: string
  lastName?: string
  size?: number
}

/**
 * UserAvatar - Displays user avatar with loading and fallback states
 *
 * Uses Radix Avatar primitive and ImageRepository to load images.
 * Handles missing/invalid avatar IDs gracefully with initials fallback.
 *
 * TODO for candidates:
 * - Add proper styling
 * - Consider caching strategies
 * - Add error retry mechanism
 */
export function UserAvatar({ avatarId, firstName, lastName, size = 40 }: UserAvatarProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!avatarId) {
      setLoading(false)
      return
    }

    let cancelled = false

    const loadImage = async () => {
      try {
        const url = await ImageRepository.getImage(avatarId)
        if (!cancelled) {
          setImageUrl(url)
        }
      } catch (err) {
        // Error loading image - will show fallback initials
        console.warn('Failed to load avatar:', err)
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadImage()

    return () => {
      cancelled = true
    }
  }, [avatarId])

  // Generate initials for fallback
  const initials = [firstName, lastName]
    .filter(Boolean)
    .map(name => name?.[0]?.toUpperCase())
    .join('')
    .slice(0, 2) || '?'

  return (
    <Avatar.Root
      className={`${styles.root} ${loading ? styles.loading : ''}`}
      style={{
        width: size,
        height: size,
      }}
    >
      {loading ? (
        <div className={styles.loadingText}>...</div>
      ) : (
        <>
          <Avatar.Image
            src={imageUrl || undefined}
            alt={`${firstName || ''} ${lastName || ''}`.trim() || 'User'}
            className={styles.image}
          />
          <Avatar.Fallback
            className={styles.fallback}
            style={{
              fontSize: size * 0.4,
            }}
            delayMs={600}
          >
            {initials}
          </Avatar.Fallback>
        </>
      )}
    </Avatar.Root>
  )
}
