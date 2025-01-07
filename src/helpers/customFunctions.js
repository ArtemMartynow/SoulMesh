export function fullName(store) {
  return `${store.first_name} ${store.last_name}`;
}

export function formatPostDate(date) {
  let postDate = new Date(date)
  let nowDate = new Date()
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  if (
    nowDate.getFullYear() === postDate.getFullYear() && 
    nowDate.getMonth() === postDate.getMonth() && 
    nowDate.getDate() === postDate.getDate()
  ) {
    return 'today'
  } else if(
    nowDate.getFullYear() === postDate.getFullYear() && 
    nowDate.getMonth() === postDate.getMonth() ||
    nowDate.getMonth() !== postDate.getMonth()
  ) {
    return  postDate.getDate() + ' ' + monthNames[postDate.getMonth()]
  } else {
    return postDate.getFullYear() + ' ' + postDate.getDate() + ' ' + monthNames[postDate.getMonth()]
  }
}

export function formatTimeDate(date) {
  let postDate = new Date(date)
  return postDate.getHours() + ':' + String(postDate.getMinutes()).padStart(2, '0');
}