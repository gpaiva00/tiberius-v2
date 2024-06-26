import { atomWithStorage } from "jotai/utils";

import { placeholders } from "@/shared/constants";
import { getRandomString } from "@/shared/utils/getRandomString";

import { ListItem } from "@/shared/types";

const emptyItems = Array.from({ length: 5 }, (_, index) => ({
  id: index,
  text: '',
  completed: false,
  placeholder: getRandomString(placeholders),
}))

const tasksAtom = atomWithStorage<ListItem[]>('@tiberius/items', emptyItems)

export { tasksAtom };

