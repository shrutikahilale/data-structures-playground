import ArrayPlayground from "./all_playgrounds/array_playground";
import StackPlayground from "./all_playgrounds/stack_playground";
import QueuePlayground from "./all_playgrounds/queue_playground";
import LinkedListPlayground from "./all_playgrounds/ll_playground";
import BinaryTreePlayground from "./all_playgrounds/binary_tree_playground";

const Playground = ({ ds, goBackToHome }) => {
  const renderPlayground = () => {
    switch (ds) {
      case "array":
        return <ArrayPlayground />;
      case "stack":
        return <StackPlayground />;
      case "queue":
        return <QueuePlayground />;
      case "linkedList":
        return <LinkedListPlayground />;
      case "binaryTree":
        return <BinaryTreePlayground />;
      default:
        return <div>Select a data structure to start with.</div>;
    }
  };

  return (
    <>
      {renderPlayground()}
      <button onClick={goBackToHome}>Back To Homepage</button>
    </>
  );
};

export default Playground;
