import {View} from 'react-native';
import {DraxDragWithReceiverEventData, DraxView} from 'react-native-drax';

type ViewContainerProps = {
  children: React.ReactNode;
  id: number;
  draggable: boolean;
  onDragDrop: (e: DraxDragWithReceiverEventData) => void;
};
const ViewContainer = ({
  children,
  id,
  draggable,
  onDragDrop,
}: ViewContainerProps) => {
  if (draggable) {
    return (
      <DraxView
        key={id}
        receiverPayload={id}
        dragPayload={id}
        onDragDrop={onDragDrop}>
        {children}
      </DraxView>
    );
  }
  return <View key={id}>{children}</View>;
};

export default ViewContainer;
