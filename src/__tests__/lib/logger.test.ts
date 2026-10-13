import { describe, it, expect, vi, beforeEach } from 'vitest'
import { logger } from '@/lib/logger'

describe('logger', () => {
  beforeEach(() => {
    // Restore console mocks from setup, re-spy fresh for these tests
    vi.restoreAllMocks()
  })

  it('exports info, warn, error, debug methods', () => {
    expect(typeof logger.info).toBe('function')
    expect(typeof logger.warn).toBe('function')
    expect(typeof logger.error).toBe('function')
    expect(typeof logger.debug).toBe('function')
  })

  it('logs without throwing', () => {
    expect(() => logger.info('test message')).not.toThrow()
    expect(() => logger.warn('test warning')).not.toThrow()
    expect(() => logger.error('test error')).not.toThrow()
    expect(() => logger.debug('test debug')).not.toThrow()
  })

  it('accepts metadata object', () => {
    expect(() => logger.info('with meta', { userId: '123', route: '/test' })).not.toThrow()
  })

  it('logs to console.log for info level in non-prod', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {})
    logger.info('test info message')
    expect(spy).toHaveBeenCalled()
  })

  it('logs to console.warn for warn level in non-prod', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    logger.warn('test warn message')
    expect(spy).toHaveBeenCalled()
  })

  it('logs to console.error for error level in non-prod', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    logger.error('test error message')
    expect(spy).toHaveBeenCalled()
  })
})
