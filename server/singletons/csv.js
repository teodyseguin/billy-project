let csv = null;

function getCSV() {
  return csv;
}

function setCSV(data) {
  csv = data;
}

module.exports = {
  getCSV,
  setCSV
};
