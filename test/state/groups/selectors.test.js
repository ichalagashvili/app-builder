
import {
  LIST_GROUPS_OK,
  GROUPS_NORMALIZED,
} from 'test/mocks/groups';

import {
  getGroups,
  getGroupsIdList,
  getGroupsMap,
  getGroupsList,
} from 'state/groups/selectors';

describe('state/groups/selectors', () => {
  it('getGroups(state) returns the groups object', () => {
    const selected = getGroups(GROUPS_NORMALIZED);
    expect(selected).toBe(GROUPS_NORMALIZED.groups);
  });

  it('verify getGroupsIdList selector', () => {
    expect(getGroupsIdList(GROUPS_NORMALIZED)).toEqual(GROUPS_NORMALIZED.groups.list);
  });

  it('verify getGroupsMap selector', () => {
    expect(getGroupsMap(GROUPS_NORMALIZED)).toEqual(GROUPS_NORMALIZED.groups.map);
  });

  it('verify getGroupsList selector', () => {
    expect(getGroupsList(GROUPS_NORMALIZED)).toEqual(LIST_GROUPS_OK);
  });
});