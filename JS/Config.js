// Shared helpers: $ (querySelector) and R (format as Rand).
const $ = (s) => document.querySelector(s),
    R = (n) => 'R' + n.toFixed(0).replace(/\B(?=(\d{3})+$)/g, ' ');