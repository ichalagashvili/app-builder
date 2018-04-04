import 'test/enzyme-init';
import { mapStateToProps, mapDispatchToProps } from 'ui/activity-stream/NotificationListContainer';

jest.unmock('ui/activity-stream/NotificationListContainer');

const TEST_NOTIFICATIONS = [
  {
    id: 3,
    author: {
      username: 'Admin',
      fullName: 'Gianni Moi',
    },
  },
];
const TEST_STATE = {
  activityStream: {
    notifications: TEST_NOTIFICATIONS,
  },

};

describe('NotificationListContainer', () => {
  it('maps notifcations property with state.activityStream.notifications', () => {
    expect(mapStateToProps(TEST_STATE)).toEqual({ notifications: TEST_NOTIFICATIONS });
  });

  it('verify that onClickUsername is defined by mapDispatchToProps', () => {
    const dispatchMock = jest.fn();
    const result = mapDispatchToProps(dispatchMock);
    expect(result.onClickUsername).toBeDefined();
    result.onClickUsername(3);
    expect(dispatchMock).toHaveBeenCalled();
  });

  it('verify that onClickTargetName is defined by mapDispatchToProps', () => {
    const dispatchMock = jest.fn();
    const result = mapDispatchToProps(dispatchMock);
    expect(result.onClickTargetName).toBeDefined();
    result.onClickTargetName(3);
    expect(dispatchMock).toHaveBeenCalled();
  });

  it('verify that onClickLike is defined by mapDispatchToProps', () => {
    const dispatchMock = jest.fn();
    const result = mapDispatchToProps(dispatchMock);
    expect(result.onClickLike).toBeDefined();
    expect(result.onClickLike(3)).toEqual(3);
  });
});