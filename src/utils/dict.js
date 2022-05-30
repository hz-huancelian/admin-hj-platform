import { getDicKey } from '@/api/dict'

export default function getDictArray(obj, code) {
  getDicKey(code).then(result => {
    if (result.code === 200) {
      obj = result.result
    }
  }).catch(() => {})
}
