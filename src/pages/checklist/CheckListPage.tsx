import { CheckList } from './CheckList';

export function CheckListPage() {
  return (
    <div>
      <CheckList
        data={[
          { id: 1, name: 'Lucy', role: 'Manager' },
          { id: 2, name: 'Bob', role: 'Developer' },
        ]}
        id="id"
        primary="name"
        secondary="role"
      />
    </div>
  );
}
