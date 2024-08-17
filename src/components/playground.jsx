const Playground = ({ ds, goBackToHome }) => {
  return (
    <>
      <h2>PLAYGROUND!!</h2>
      <h5>{ds}</h5>
      <button onClick={goBackToHome}>Back To Homepage</button>
    </>
  );
};
export default Playground;
