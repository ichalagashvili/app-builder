import 'test/enzyme-init';

import { mapDispatchToProps } from 'ui/fragments/add/AddFormContainer';

describe('AddFormContainer', () => {
  it('verify that  onSubmit is defined by mapDispatchToProps', () => {
    const dispatchMock = jest.fn();
    const result = mapDispatchToProps(dispatchMock, {});
    expect(result.onSubmit).toBeDefined();
  });
});
