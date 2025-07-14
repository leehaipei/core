import React, { useEffect, useRef } from 'react';

/**
 * DragToTarget组件
 * @param {Object} props - 组件属性
 * @param {Object} props.elementRef - 可拖动元素的ref对象
 * @param {Object} props.targetRef - 目标元素的ref对象
 * @param {Function} props.onMoveStart - 拖动开始时调用的回调函数
 * @param {Function} props.onMoveOk - 拖动进入目标元素松开时调用的回调函数
 * @param {Function} props.onMoveCancel - 拖动松开时间未在目标元素调用的回调函数
 * @returns {null} - 渲染的组件元素
 */

export default function DragToTarget({ elementRef, targetRef, onMoveStart, onMoveOk, onMoveCancel }) {
    const isDragging = useRef(false);

    useEffect(() => {
        const element = elementRef.current;
        const target = targetRef.current;

        if (!element || !target) return;

        let startX = 0;
        let startY = 0;

        const getTouchOrMouse = (e) => {
            return e.touches ? e.touches[0] : e;
        };

        const onStart = (e) => {
            const point = getTouchOrMouse(e);
            startX = point.clientX;
            startY = point.clientY;
            isDragging.current = true;
            onMoveStart?.();
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onEnd);
            document.addEventListener('touchmove', onMove, { passive: false });
            document.addEventListener('touchend', onEnd);
        };

        const onMove = (e) => {
            if (!isDragging.current) return;
            const point = getTouchOrMouse(e);
            const dx = point.clientX - startX;
            const dy = point.clientY - startY;
            element.style.transform = `translate(${dx}px, ${dy}px)`;
        };

        const onEnd = (e) => {
            if (!isDragging.current) return;
            isDragging.current = false;
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onEnd);
            document.removeEventListener('touchmove', onMove);
            document.removeEventListener('touchend', onEnd);

            const elementRect = element.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();

            const inTarget = !(
                elementRect.right < targetRect.left ||
                elementRect.left > targetRect.right ||
                elementRect.bottom < targetRect.top ||
                elementRect.top > targetRect.bottom
            );

            if (inTarget) {
                onMoveOk?.();
            } else {
                onMoveCancel?.();
                // Reset transform
                element.style.transform = '';
            }
        };

        element.addEventListener('mousedown', onStart);
        element.addEventListener('touchstart', onStart);

        return () => {
            element.removeEventListener('mousedown', onStart);
            element.removeEventListener('touchstart', onStart);
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onEnd);
            document.removeEventListener('touchmove', onMove);
            document.removeEventListener('touchend', onEnd);
        };
    }, [elementRef, targetRef, onMoveStart, onMoveOk, onMoveCancel]);

    return null;
}
