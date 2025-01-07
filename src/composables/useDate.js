class useDate {
  static $formatDate = (date) => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
  
    return `${day}/${month}/${year}`
  }

  static calcUserYears(birthdayUser) {
    if (!birthdayUser) return null;
    let nowDate = new Date();
    let birthday = new Date(birthdayUser);
    let age = nowDate.getFullYear() - birthday.getFullYear();
    let month = nowDate.getMonth() - birthday.getMonth();
    if (month < 0 || (month === 0 && nowDate.getDate() < birthday.getDate())) {
        age--
    }
    return age
  }
}

export default useDate