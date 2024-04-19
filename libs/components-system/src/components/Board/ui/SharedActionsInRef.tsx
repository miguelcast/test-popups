import { BoardActions } from '../../../store/board.store';
import { forwardRef, useImperativeHandle } from 'react';
import { usePopupsActions } from '../../../hooks/usePopups';

export type BoardRefActions = {
  removeAllContainers: BoardActions['clearContainers'];
};

export const SharedActionsInRef = forwardRef((_, ref) => {
  const { clearContainers } = usePopupsActions();
  useImperativeHandle(ref, () => ({
    removeAllContainers: clearContainers,
  }));

  return null;
});
