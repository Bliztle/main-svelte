export const isTouchEvent = (e: Event): e is TouchEvent => {
    return e.type.startsWith('touch');
};