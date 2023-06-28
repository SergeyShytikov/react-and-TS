import { IdValue } from '../../api/types';

export function isChecked(checkedIds: IdValue[], idValue: IdValue) {
  return checkedIds.includes(idValue);
}
