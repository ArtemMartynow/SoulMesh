import { notify } from '@kyvg/vue3-notification'

export function $notify (type, response) {
  notify({ type: type, text: response, duration: 5000 })
}