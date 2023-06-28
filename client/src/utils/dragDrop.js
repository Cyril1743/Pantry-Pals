export const setDragging = (e, i, item) => {    
    var dragging = {index: i, item: item};
    return dragging;
};

export const setDraggedOver = (e) => {
    e.preventDefault();
    var itemDraggedOver = parseInt(e.target.getAttribute('index'));
    return itemDraggedOver;
}

export const compare = (e, arr, dragging, itemDraggedOver) => {
    e.preventDefault();
    arr.splice(dragging.index, 1);
    arr.splice(itemDraggedOver, 0, dragging.item);
    return arr;
}