/** Props shared by `Draggable` and `Droppable`. */
export interface DragElementProps {
  as?: string;
  class?: string;
  data?: Record<string, unknown>;
  disabled?: boolean;
  id: string | number;
}
