// 函数防抖：仅在频繁触发结束后执行一次
interface DebouncedFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): void;
  cancel: () => void;
}

function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  immediate: boolean = false
): DebouncedFunction<T> {
  let timer: number | undefined = undefined;
  const debounced = function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this;
    const callNow = immediate && timer === undefined;

    if (callNow) {
      fn.apply(context, args);
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
      if (!immediate) {
        fn.apply(context, args);
      }
      timer = undefined;
    }, delay);
  };

  debounced.cancel = function () {
    clearTimeout(timer);
    timer = undefined;
  };

  return debounced;
}

export default debounce;
