export const getGreeting = (t: (key: string) => string) => {
  const currentHour = new Date().getHours()
  if (currentHour < 12) {
    return t('good-morning')
  }
  if (currentHour < 18) {
    return t('good-afternoon')
  }
  return t('good-evening')
}

/**
 * Generate card number from user ID (4 groups of 4 digits)
 *
 * Algorithm:
 * 1. Use a simple hash function to convert string to numbers
 * 2. Generate 4 groups of 4 digits from the hash value
 * 3. Each group is modulo 10000 to ensure 4 digits
 */
export function generateCardNumber(userId: string): string[] {
  // Simple hash function to convert string to number
  let hash = 0
  for (let i = 0; i < userId.length; i++) {
    const char = userId.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }

  // Generate 4 groups of 4 digits
  const num1 = Math.abs(hash % 10000)
    .toString()
    .padStart(4, '0')
  const num2 = Math.abs((hash * 31) % 10000)
    .toString()
    .padStart(4, '0')
  const num3 = Math.abs((hash * 61) % 10000)
    .toString()
    .padStart(4, '0')
  const num4 = Math.abs((hash * 97) % 10000)
    .toString()
    .padStart(4, '0')

  return [num1, num2, num3, num4]
}
