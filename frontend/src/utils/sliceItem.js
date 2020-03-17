import _ from "lodash";

export function sliceItem(item, currentItem, limits) {
  const currentIndex = currentItem * limits;

  return _(item)
    .slice(currentIndex)
    .take(limits)
    .value();
}
