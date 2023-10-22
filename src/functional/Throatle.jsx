export const Throatle = (callback, delayTime) => {
  let timerId;
  return () => {
    if (timerId) return;
    timerId = setTimeout(() => {
      callback();
    }, delayTime);
  };
};
