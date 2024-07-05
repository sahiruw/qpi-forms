function dynamicSort(property, order = 'asc') {
  return function (a, b) {
    let comparison = 0;
    if (typeof a[property] === 'string' && typeof b[property] === 'string') {
      comparison = a[property].localeCompare(b[property]);
    } else {
      comparison = a[property] - b[property];
    }
    return order === 'desc' ? -comparison : comparison;
  };
}


  
export { dynamicSort}