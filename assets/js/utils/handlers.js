 function deleteHandler({ target }) {
  target.remove();
}

function imageLoadHandler (e) {
  const {target , target : { dataset: {id}}} = e;
  document.getElementById(`wrapper${id}`).append(target);
}