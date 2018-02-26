import 'test/enzyme-init';

import { mapDispatchToProps } from 'ui/fragments/FragmentFormContainer';

describe('ui/fragments/FragmentFormContainer', () => {
  it('verify that  onSubmit is defined by mapDispatchToProps', () => {
    const dispatchMock = jest.fn();
    const result = mapDispatchToProps(dispatchMock);
    expect(result.onSubmit).toBeDefined();
  });
});
