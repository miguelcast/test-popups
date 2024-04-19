import {
  usePopupsActions,
  usePopupsBaseContainers,
} from '../../../hooks/usePopups';
import { Button } from '../../Button';

function BoardHeader() {
  const { addContainer } = usePopupsActions();
  const { baseContainer } = usePopupsBaseContainers();

  return (
    <div className="bg-gray-700 rounded-full h-full px-4 flex items-center gap-4">
      {baseContainer?.map((containerBase) => (
        <Button
          key={containerBase.id}
          onClick={() => addContainer(containerBase)}
        >
          Add {containerBase.name}
        </Button>
      ))}
    </div>
  );
}

export default BoardHeader;
