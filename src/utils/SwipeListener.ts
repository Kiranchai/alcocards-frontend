let xDown: number | null = null;
let yDown: number | null = null;

function getTouches(evt: React.TouchEvent) {
  return evt.touches;
}

export function handleTouchStart(evt: React.TouchEvent) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

export function handleTouchMove(
  evt: React.TouchEvent,
  rightSwipe: () => void,
  leftSwipe: () => void
) {
  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      /* right swipe */
      rightSwipe();
    } else {
      /* left swipe */
      leftSwipe();
    }
  }
  xDown = null;
  yDown = null;
}
