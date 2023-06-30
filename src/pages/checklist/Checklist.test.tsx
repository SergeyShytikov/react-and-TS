import { render, test } from 'vitest';
import { CheckList } from './CheckList';
test('should render correct list items when data specified', () => {
  render(
    <CheckList
      data={[{ id: 1, name: 'Lucy', role: 'Manager' }]}
      id="id"
      primary="name"
      secondary="role"
    />,
  );
});
