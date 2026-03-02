export const actionOnKeyDown = (
  ev: React.KeyboardEvent<HTMLInputElement>,
  keyName: string,
  action: () => void,
) => {
  if (ev.key === keyName) {
    console.log(`Nome alterado`);
    action();
  }
};
