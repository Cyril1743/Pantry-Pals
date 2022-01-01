// ghost appears while user is dragging
// ingredients array state updates on drop event
    // added index and removed index defined on drop event.
export const setDragging = (e, i, item) => {    
    var dragging = {index: i, item: item};
    console.log(dragging);
    return dragging;
};

export const draggedOver = (e) => {
    e.preventDefault();
    var itemDraggedOver = parseInt(e.target.getAttribute('index'));
    console.log(itemDraggedOver);
    return itemDraggedOver;
}

export const compare = (e, arr, dragging, itemDraggedOver) => {
    e.preventDefault();
    arr.splice(dragging.index, 1);
    arr.splice(itemDraggedOver, 0, dragging.item);
    console.log(dragging, itemDraggedOver, arr);
    return arr;
}