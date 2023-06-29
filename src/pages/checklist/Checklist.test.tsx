import { render } from 'vitest';
import { Checklist } from './Checklist';
test('should render correct list items when data specified', () => {
  render(
    <Checklist
      data={[{ id: 1, name: 'Lucy', role: 'Manager' }]}
      id="id"
      primary="name"
      secondary="role"
    />,
  );
});
