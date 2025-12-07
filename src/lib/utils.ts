/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function getFriendlyErrorMessage(error: any, defaultMessage: string): string {
  if (error.message) {
    if (error.message.includes('API')) {
      return 'API service error. Please check your credentials and try again.';
    }
    if (error.message.includes('network')) {
      return 'Network error. Please check your connection and try again.';
    }
    return error.message;
  }
  return defaultMessage;
}
